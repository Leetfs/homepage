import { mkdir, readFile, writeFile } from "node:fs/promises";

const SITEMAP_URL = "https://leetfs.com/sitemap.xml";
const RAW_BASE = "https://raw.githubusercontent.com/Leetfs/blog/main/docs";
const OUTPUT = new URL("../app/generated/latest-articles.json", import.meta.url);

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "Leetfs-homepage-build/1.0" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} while fetching ${url}`);
  }

  return response.text();
}

function readSitemap(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((match) => {
      const location = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
      const modified = match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
      return location && modified
        ? { location: decodeEntities(location), modified }
        : null;
    })
    .filter(Boolean)
    .filter(({ location }) => {
      const { pathname } = new URL(location);
      return (
        (pathname.startsWith("/tips/") || pathname.startsWith("/life/")) &&
        !pathname.startsWith("/en/") &&
        !pathname.startsWith("/ja/") &&
        !pathname.endsWith("/")
      );
    })
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified));
}

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
    : `围绕「${title}」整理的一篇技术实践记录。`;
}

function makeCategory(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "life") return "LIFE / NOTES";
  return parts.slice(1, 3).join(" / ").replaceAll("-", " ").toUpperCase();
}

function formatDate(value) {
  const date = new Date(value);
  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, "0")))
    .join(".");
}

async function hydrate(entry) {
  const url = new URL(entry.location);
  const markdown = await fetchText(`${RAW_BASE}${url.pathname}.md`);
  const { title, body } = parseFrontmatter(markdown);
  if (!title) return null;

  const characterCount = plainText(body).replace(/\s/g, "").length;
  return {
    category: makeCategory(url.pathname),
    title,
    description: makeDescription(title, body),
    href: `${entry.location}.html`,
    updatedAt: entry.modified,
    displayDate: formatDate(entry.modified),
    readingMinutes: Math.max(1, Math.ceil(characterCount / 420)),
  };
}

async function sync() {
  const sitemap = await fetchText(SITEMAP_URL);
  const candidates = readSitemap(sitemap).slice(0, 12);
  const hydrated = await Promise.allSettled(candidates.map(hydrate));
  const articles = hydrated
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value)
    .slice(0, 3)
    .map((article, index) => ({
      number: `A${String(index + 1).padStart(2, "0")}`,
      ...article,
    }));

  if (articles.length !== 3) {
    throw new Error(`Expected 3 articles, received ${articles.length}`);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: SITEMAP_URL,
    articles,
  };

  await mkdir(new URL("../app/generated/", import.meta.url), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`[blog-sync] ${articles.map(({ title }) => title).join(" / ")}`);
}

try {
  await sync();
} catch (error) {
  try {
    const cached = JSON.parse(await readFile(OUTPUT, "utf8"));
    if (cached.articles?.length === 3) {
      console.warn(`[blog-sync] using cached articles: ${error.message}`);
    } else {
      throw error;
    }
  } catch {
    throw error;
  }
}
