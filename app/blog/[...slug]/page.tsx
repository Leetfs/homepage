import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogContent from "../../generated/blog-content.json";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const languageLabels = {
  zh: "简体中文",
  en: "English",
  ja: "日本語",
} as const;

function getArticle(slug: string[]) {
  const path = `/${slug.join("/")}`;
  return blogContent.articles.find((article) => article.slug === path);
}

export function generateStaticParams() {
  return blogContent.articles.map((article) => ({
    slug: article.slug.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} — Lee's Blog`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const sameLanguage = blogContent.articles.filter((item) => item.language === article.language);
  const currentIndex = sameLanguage.findIndex((item) => item.slug === article.slug);
  const newer = currentIndex > 0 ? sameLanguage[currentIndex - 1] : null;
  const older = currentIndex < sameLanguage.length - 1 ? sameLanguage[currentIndex + 1] : null;
  const language = languageLabels[article.language as keyof typeof languageLabels];

  return (
    <main className="article-page">
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#article-content">跳到文章正文</a>
      <header className="site-header article-header">
        <Link className="wordmark" href="/" aria-label="返回 Lee 主页">
          <span>LEE</span><sup>/02</sup>
        </Link>
        <nav aria-label="文章导航">
          <Link href="/">主页</Link>
          <Link href="/blog">全部文章</Link>
          <Link href="/resume">简历</Link>
        </nav>
        <Link className="header-contact" href="/blog">INDEX <span aria-hidden="true">↗</span></Link>
      </header>

      <header className="article-hero">
        <div className="article-hero-index">
          <span>{article.number}</span>
          <span>{article.category}</span>
        </div>
        <div className="article-hero-main">
          <p>{article.section} / {language}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
        <div className="article-hero-meta">
          <div><span>UPDATED</span><time dateTime={article.updatedAt}>{article.displayDate}</time></div>
          <div><span>READING TIME</span><strong>{article.readingMinutes} MIN</strong></div>
          <div><span>CONTENT</span><strong>LOCAL / OWNED</strong></div>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-toc" aria-label="文章目录">
          <div>
            <p>ON THIS PAGE</p>
            {article.toc.length ? (
              <nav>
                {article.toc.map((item) => (
                  <a
                    key={`${item.id}-${item.depth}`}
                    className={`toc-depth-${item.depth}`}
                    href={`#${item.id}`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            ) : <span>SHORT NOTE / NO SECTIONS</span>}
          </div>
          <Link href="/blog">← 返回文章索引</Link>
        </aside>

        <article
          className="article-content"
          id="article-content"
          lang={article.language === "zh" ? "zh-CN" : article.language}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </div>

      <nav className="article-pagination" aria-label="相邻文章">
        {newer ? (
          <Link href={newer.href}>
            <span>← NEWER / {newer.category}</span><strong>{newer.title}</strong>
          </Link>
        ) : <span />}
        {older ? (
          <Link href={older.href}>
            <span>OLDER / {older.category} →</span><strong>{older.title}</strong>
          </Link>
        ) : <span />}
      </nav>

      <footer className="article-footer">
        <span>LEE&apos;S FIELD NOTES / {article.displayDate}</span>
        <Link href="/blog">EXPLORE ALL {String(sameLanguage.length).padStart(2, "0")} NOTES ↗</Link>
      </footer>
    </main>
  );
}
