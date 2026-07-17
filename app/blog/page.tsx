import type { Metadata } from "next";
import Link from "next/link";
import BlogArchive from "../components/blog-archive";
import blogIndex from "../generated/blog-index.json";

export const metadata: Metadata = {
  title: "Field Notes — Lee's Blog",
  description: "Lee 关于 Linux、RISC-V、编译器、工程实践与生活的持续记录。",
};

const channels = [
  { label: "GITHUB", href: "https://github.com/Leetfs" },
  { label: "SOURCE", href: "https://leetfs.com" },
];

export default function BlogPage() {
  const newest = blogIndex.articles[0];
  const generatedDate = blogIndex.generatedAt.slice(0, 10).replaceAll("-", ".");

  return (
    <main className="blog-page" id="blog-top">
      <a className="skip-link" href="#blog-archive">跳到文章索引</a>

      <header className="site-header blog-header">
        <Link className="wordmark" href="/" aria-label="返回 Lee 主页">
          <span>LEE</span>
          <sup>/02</sup>
        </Link>
        <nav aria-label="Blog 导航">
          <Link href="/">主页</Link>
          <a href="#blog-archive">文章</a>
          <a href="https://leetfs.com/about/" target="_blank" rel="noreferrer">关于</a>
        </nav>
        <a className="header-contact" href="#blog-archive">
          INDEX / {String(blogIndex.total).padStart(2, "0")} <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="blog-hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> NOTES FROM THE FIELD · SINCE 2024
          </p>
          <h1 id="blog-title">
            FIELD<br />
            <em>NOTES.</em>
          </h1>
          <div className="blog-hero-intro">
            <p>
              偶尔的废话和些许经验。<br />
              记录系统如何工作，也记录<strong>人在系统中如何生活。</strong>
            </p>
            <div className="blog-stats" aria-label="Blog 统计">
              <span><b>{String(blogIndex.total).padStart(2, "0")}</b> ARTICLES</span>
              <span><b>{String(blogIndex.sectionCounts["技术"] ?? 0).padStart(2, "0")}</b> TECH</span>
              <span><b>{String(blogIndex.sectionCounts["生活"] ?? 0).padStart(2, "0")}</b> LIFE</span>
            </div>
          </div>
        </div>

        <aside className="blog-latest" aria-label="最新文章">
          <div className="blog-latest-topline">
            <span>LATEST ENTRY / {newest.number}</span>
            <span className="panel-ping">SYNCED</span>
          </div>
          <div className="blog-latest-number" aria-hidden="true">01</div>
          <div className="blog-latest-copy">
            <p>{newest.category}</p>
            <h2>{newest.title}</h2>
            <span>{newest.description}</span>
          </div>
          <a href={newest.href} target="_blank" rel="noreferrer">
            阅读最新文章 <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </section>

      <div className="blog-ledger" aria-label="内容同步状态">
        <span>LIVE CONTENT INDEX</span>
        <span>BUILD / {generatedDate}</span>
        <span>SOURCE / LEETFS.COM</span>
      </div>

      <BlogArchive
        articles={blogIndex.articles}
        generatedAt={blogIndex.generatedAt}
      />

      <footer className="blog-footer">
        <div>
          <p>END OF INDEX / KEEP EXPLORING</p>
          <Link href="/">BACK TO<br /><em>HOME.</em></Link>
        </div>
        <nav aria-label="其他链接">
          <Link href="/">HOME <span aria-hidden="true">↗</span></Link>
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
            >
              {channel.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
