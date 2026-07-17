import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const CONTENT_ROOT = fileURLToPath(new URL("../content/blog/", import.meta.url));
const MIGRATION_DATES = new URL("../content/blog/migration-dates.json", import.meta.url);
const LATEST_OUTPUT = new URL("../app/generated/latest-articles.json", import.meta.url);
const INDEX_OUTPUT = new URL("../app/generated/blog-index.json", import.meta.url);
const CONTENT_OUTPUT = new URL("../app/generated/blog-content.json", import.meta.url);
const LANGUAGE_ORDER = { zh: 0, en: 1, ja: 2 };

function parseFrontmatter(markdown) {
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  const title = frontmatter?.[1]
    .match(/^title:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/^['"]|['"]$/g, "");

  return {
    title,
    body: frontmatter ? markdown.slice(frontmatter[0].length) : markdown,
  };
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|]/g, " ")
    .replace(/\\/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeDescription(title, body) {
  const proseOnly = body.replace(/```[\s\S]*?```/g, " ");
  const paragraphs = proseOnly
    .split(/\n\s*\n/)
    .map(plainText)
    .filter((text) => text.length >= 24 && !/^https?:\/\//.test(text));

  if (paragraphs[0]) {
    return paragraphs[0].length > 112
      ? `${paragraphs[0].slice(0, 109).trim()}…`
      : paragraphs[0];
  }

  const topics = [...body.matchAll(/^#{2,4}\s+(.+)$/gm)]
    .map((match) => plainText(match[1]))
    .filter(Boolean)
    .slice(0, 3);

  return topics.length
    ? `围绕「${title}」，记录${topics.join("、")}等实践细节。`
    : `围绕「${title}」整理的一篇实践记录。`;
}

function normalizeContainers(markdown) {
  return markdown.replace(
    /^:::\s*(tip|warning|danger|info|details)(?:\s+(.+))?\s*\n([\s\S]*?)\n:::\s*$/gm,
    (_, type, label, content) => {
      const heading = label || type.toUpperCase();
      const quoted = content.split("\n").map((line) => `> ${line}`).join("\n");
      return `> **${heading}**\n>\n${quoted}`;
    },
  );
}

function headingSlug(value, index) {
  const slug = plainText(value)
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `section-${index + 1}`;
}

function makeToc(markdown) {
  return [...markdown.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((match, index) => ({
    depth: match[1].length,
    title: plainText(match[2]),
    id: headingSlug(match[2], index),
  }));
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|data:)/i.test(value);
}

function resolveContentUrl(value, pageSlug, kind, articleSlugs) {
  if (!value || value.startsWith("#") || /^(mailto:|tel:|data:)/i.test(value)) return value;
  if (isExternal(value)) {
    const external = new URL(value);
    if (external.hostname !== "leetfs.com" && external.hostname !== "www.leetfs.com") return value;
    value = `${external.pathname}${external.search}${external.hash}`;
  }

  const virtualBase = new URL(pageSlug, "https://blog.local");
  const resolved = new URL(value, virtualBase);
  const normalizedPath = resolved.pathname
    .replace(/\.md$/, "")
    .replace(/\.html$/, "")
    .replace(/\/index$/, "");

  if (kind === "asset") {
    return `/blog-assets${resolved.pathname}`;
  }

  if (normalizedPath === "/about/resume") return `/resume${resolved.hash}`;
  if (normalizedPath === "/about") return `/${resolved.hash}`;
  if (articleSlugs.has(normalizedPath)) {
    return `/blog${normalizedPath}${resolved.search}${resolved.hash}`;
  }
  return `/blog${resolved.hash}`;
}

function renderMarkdown(markdown, pageSlug, articleSlugs) {
  const normalized = normalizeContainers(markdown);
  const toc = makeToc(normalized);
  let headingIndex = 0;
  let html = marked.parse(normalized, { gfm: true });

  html = html.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (_, depth, content) => {
    const item = toc[headingIndex++];
    return `<h${depth} id="${item?.id ?? `section-${headingIndex}`}">${content}</h${depth}>`;
  });

  html = html
    .replace(/src="([^"]+)"/g, (_, value) => `src="${resolveContentUrl(value, pageSlug, "asset", articleSlugs)}"`)
    .replace(/href="([^"]+)"/g, (_, value) => `href="${resolveContentUrl(value, pageSlug, "link", articleSlugs)}"`);

  return { html, toc };
}

function languageFor(parts) {
  return parts[0] === "en" || parts[0] === "ja" ? parts[0] : "zh";
}

function contentParts(parts) {
  return languageFor(parts) === "zh" ? parts : parts.slice(1);
}

function makeCategory(parts) {
  const canonical = contentParts(parts);
  if (canonical[0] === "life") return "LIFE / NOTES";
  return canonical.slice(1, 3).join(" / ").replaceAll("-", " ").toUpperCase();
}

function makeSection(parts) {
  return contentParts(parts)[0] === "life" ? "生活" : "技术";
}

function makeTopics(parts) {
  return contentParts(parts)
    .slice(1, -1)
    .map((part) => part.replaceAll("-", " ").toUpperCase());
}

function formatDate(value) {
  const date = new Date(value);
  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, "0")))
    .join(".");
}

function stripRendered(article) {
  return Object.fromEntries(
    Object.entries(article).filter(([key]) => key !== "html" && key !== "toc"),
  );
}

async function collectMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectMarkdown(absolute);
    return entry.isFile() && entry.name.endsWith(".md") ? [absolute] : [];
  }));
  return nested.flat();
}

function isArticle(relativePath) {
  const parts = relativePath.split("/");
  const canonical = contentParts(parts);
  return (
    (canonical[0] === "tips" || canonical[0] === "life") &&
    canonical.at(-1) !== "index.md"
  );
}

async function sync() {
  const migratedDates = new Map(
    Object.entries(JSON.parse(await readFile(MIGRATION_DATES, "utf8"))),
  );
  const files = (await collectMarkdown(CONTENT_ROOT))
    .map((absolute) => ({
      absolute,
      relative: path.relative(CONTENT_ROOT, absolute).split(path.sep).join("/"),
    }))
    .filter(({ relative }) => isArticle(relative));

  const articleSlugs = new Set(
    files.map(({ relative }) => `/${relative.replace(/\.md$/, "")}`),
  );

  const hydrated = await Promise.all(files.map(async ({ absolute, relative }) => {
    const markdown = await readFile(absolute, "utf8");
    const { title, body } = parseFrontmatter(markdown);
    if (!title) return null;

    const parts = relative.replace(/\.md$/, "").split("/");
    const language = languageFor(parts);
    const slug = `/${parts.join("/")}`;
    const canonicalSlug = language === "zh" ? slug : `/${parts.slice(1).join("/")}`;
    const fileStats = await stat(absolute);
    const updatedAt = migratedDates.get(canonicalSlug) ?? fileStats.mtime.toISOString();
    const characterCount = plainText(body).replace(/\s/g, "").length;
    const rendered = renderMarkdown(body, slug, articleSlugs);

    return {
      category: makeCategory(parts),
      section: makeSection(parts),
      language,
      topics: makeTopics(parts),
      title,
      description: makeDescription(title, body),
      href: `/blog${slug}`,
      slug,
      updatedAt,
      displayDate: formatDate(updatedAt),
      readingMinutes: Math.max(1, Math.ceil(characterCount / 420)),
      html: rendered.html,
      toc: rendered.toc,
    };
  }));

  const articles = hydrated
    .filter(Boolean)
    .sort((a, b) => {
      const byDate = Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      return byDate || LANGUAGE_ORDER[a.language] - LANGUAGE_ORDER[b.language];
    });

  const numbered = articles.map((article, index) => ({
    number: `N${String(index + 1).padStart(3, "0")}`,
    ...article,
  }));
  const chineseArticles = numbered.filter((article) => article.language === "zh");
  const latestArticles = chineseArticles.slice(0, 3).map((article, index) => ({
    ...article,
    number: `A${String(index + 1).padStart(2, "0")}`,
  }));

  if (latestArticles.length !== 3) {
    throw new Error(`Expected at least 3 Chinese articles, received ${chineseArticles.length}`);
  }

  const generatedAt = new Date().toISOString();
  const metadataArticles = numbered.map(stripRendered);
  const languageCounts = Object.fromEntries(
    ["zh", "en", "ja"].map((language) => [
      language,
      numbered.filter((article) => article.language === language).length,
    ]),
  );
  const sectionCounts = chineseArticles.reduce((counts, article) => {
    counts[article.section] = (counts[article.section] ?? 0) + 1;
    return counts;
  }, {});

  await mkdir(new URL("../app/generated/", import.meta.url), { recursive: true });
  await Promise.all([
    writeFile(LATEST_OUTPUT, `${JSON.stringify({
      generatedAt,
      source: "content/blog",
      articles: latestArticles.map(stripRendered),
    }, null, 2)}\n`, "utf8"),
    writeFile(INDEX_OUTPUT, `${JSON.stringify({
      generatedAt,
      source: "content/blog",
      total: chineseArticles.length,
      allTotal: numbered.length,
      languageCounts,
      sectionCounts,
      articles: metadataArticles,
    }, null, 2)}\n`, "utf8"),
    writeFile(CONTENT_OUTPUT, `${JSON.stringify({
      generatedAt,
      source: "content/blog",
      articles: numbered,
    }, null, 2)}\n`, "utf8"),
  ]);

  console.log(
    `[blog-sync] ${numbered.length} local articles (${chineseArticles.length} zh) / latest: ${latestArticles
      .map(({ title }) => title)
      .join(" / ")}`,
  );
}

await sync();
