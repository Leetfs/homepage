"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from "react";

type BlogArticle = {
  number: string;
  category: string;
  section: string;
  topics: string[];
  title: string;
  description: string;
  href: string;
  slug: string;
  updatedAt: string;
  displayDate: string;
  readingMinutes: number;
};

type BlogArchiveProps = {
  articles: BlogArticle[];
  generatedAt: string;
};

const filters = ["全部", "技术", "生活"];

export default function BlogArchive({ articles, generatedAt }: BlogArchiveProps) {
  const [section, setSection] = useState("全部");
  const [query, setQuery] = useState("");
  const [activeHref, setActiveHref] = useState(articles[0]?.href ?? "");
  const deferredQuery = useDeferredValue(query);
  const searchRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const visibleArticles = useMemo(() => {
    const normalized = deferredQuery.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const inSection = section === "全部" || article.section === section;
      const matches = !normalized || [
        article.title,
        article.description,
        article.category,
        article.section,
        ...article.topics,
      ].join(" ").toLocaleLowerCase().includes(normalized);
      return inSection && matches;
    });
  }, [articles, deferredQuery, section]);

  const activeArticle =
    visibleArticles.find((article) => article.href === activeHref) ?? visibleArticles[0];

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !shellRef.current) return;
    const { clientX, clientY } = event;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = shellRef.current?.getBoundingClientRect();
      if (!rect || !shellRef.current) return;
      shellRef.current.style.setProperty("--archive-x", `${clientX - rect.left}px`);
      shellRef.current.style.setProperty("--archive-y", `${clientY - rect.top}px`);
    });
  };

  const activate = (href: string) => setActiveHref(href);
  const handleFocus = (event: FocusEvent<HTMLAnchorElement>, href: string) => {
    activate(href);
    event.currentTarget.scrollIntoView({ block: "nearest" });
  };

  return (
    <section
      className="blog-archive"
      id="blog-archive"
      ref={shellRef}
      onPointerMove={handlePointerMove}
      style={{ "--archive-x": "70%", "--archive-y": "20%" } as CSSProperties}
      aria-labelledby="archive-title"
    >
      <div className="archive-heading">
        <p className="section-index">01 / COMPLETE INDEX</p>
        <h2 id="archive-title">检索所有<br />现场记录。</h2>
        <p>文章在每次构建时从原 Blog 自动同步，保留原始地址与发布日期。</p>
      </div>

      <div className="archive-workspace">
        <div className="archive-controls">
          <label className="archive-search">
            <span>SEARCH / 搜索文章</span>
            <span className="archive-search-box">
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                placeholder="标题、分类或关键词"
                aria-label="搜索 Blog 文章"
              />
              <kbd>⌘ K</kbd>
            </span>
          </label>
          <div className="archive-filters" aria-label="文章类型">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                aria-pressed={section === filter}
                onClick={() => setSection(filter)}
              >
                {filter}
                <span>{String(filter === "全部" ? articles.length : articles.filter((article) => article.section === filter).length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="archive-grid">
          <aside className="archive-monitor" aria-live="polite">
            {activeArticle ? (
              <>
                <div className="archive-monitor-topline">
                  <span>ACTIVE NOTE</span>
                  <span>{activeArticle.number}</span>
                </div>
                <div className="archive-monitor-glyph" aria-hidden="true">
                  <span>{activeArticle.category.split(" / ")[0].slice(0, 2)}</span>
                </div>
                <div className="archive-monitor-copy">
                  <p>{activeArticle.category}</p>
                  <h3>{activeArticle.title}</h3>
                  <span>{activeArticle.description}</span>
                </div>
                <div className="archive-monitor-meta">
                  <span>{activeArticle.displayDate}</span>
                  <span>{activeArticle.readingMinutes} MIN READ</span>
                </div>
              </>
            ) : (
              <div className="archive-empty-monitor">
                <span>NO SIGNAL</span>
                <p>没有找到匹配的文章。</p>
              </div>
            )}
          </aside>

          <div className="archive-list">
            <div className="archive-list-topline">
              <span aria-live="polite">RESULT / {String(visibleArticles.length).padStart(2, "0")}</span>
              <time dateTime={generatedAt}>SYNC / {generatedAt.slice(0, 10).replaceAll("-", ".")}</time>
            </div>
            {visibleArticles.length ? visibleArticles.map((article) => (
              <a
                className="archive-row"
                data-active={activeArticle?.href === article.href}
                href={article.href}
                target="_blank"
                rel="noreferrer"
                key={article.href}
                onPointerEnter={() => activate(article.href)}
                onFocus={(event) => handleFocus(event, article.href)}
              >
                <span className="archive-row-number">{article.number}</span>
                <div className="archive-row-copy">
                  <div>
                    <span>{article.category}</span>
                    <time dateTime={article.updatedAt}>{article.displayDate}</time>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <span className="archive-row-arrow" aria-hidden="true">↗</span>
              </a>
            )) : (
              <div className="archive-empty">
                <strong>NO MATCH / 00</strong>
                <p>换一个关键词，或清除当前分类。</p>
                <button type="button" onClick={() => { setQuery(""); setSection("全部"); }}>
                  重置检索
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
