import type { Metadata } from "next";
import { headers } from "next/headers";
import "./garden.css";

const notes = [
  {
    year: "2026 — NOW",
    title: "openRuyi Linux",
    kicker: "Distribution / RISC-V",
    body: "在发行版最接近地基的地方工作：重构软件包、回移 CVE 补丁、完成 RISC-V 环境下的编译与回归测试，也探索自动化与 AI 如何进入基础设施。",
  },
  {
    year: "2025.05 — 07",
    title: "乘影 GPGPU LLVM",
    kicker: "Compiler / CodeGen",
    body: "为 RISC-V 自定义指令扩展完善 LLVM 工具链，补充向量 half 类型支持，并处理代码生成阶段的兼容性与正确性问题。",
  },
  {
    year: "2025.02 — 05",
    title: "Performance CI",
    kicker: "Automation / RVV",
    body: "用 Jenkins 持续追踪 OpenCV 在 RISC-V 向量扩展场景中的性能变化，让一次提交带来的影响变得可见、可比较、可追溯。",
  },
];

const communities = [
  {
    title: "Project Trans",
    role: "前端 · CI · Bot · Review",
    body: "建设自由、开放且持续更新的跨性别知识平台，让可靠信息更容易抵达需要它的人。",
    href: "https://github.com/project-trans",
    glyph: "01",
  },
  {
    title: "开往 / Travellings",
    role: "Bot · 前端 · 文档",
    body: "维护中文独立博客随机跳转网络，把散落在互联网各处的个人表达重新连接起来。",
    href: "https://github.com/travellings-link/travellings",
    glyph: "02",
  },
  {
    title: "GitHelper",
    role: "Creator · Electron",
    body: "把常用 Git 操作收进轻量桌面工具，让第一次进入版本协作的人少一点犹豫。",
    href: "https://github.com/Leetfs/GitHelper",
    glyph: "03",
  },
];

const essays = [
  {
    date: "2026.03",
    title: "RISCV 64 glibc + systemd LFS 通关攻略",
    topic: "从工具链、rootfs 到真正启动一套自己构建的 RISC-V Linux。",
    href: "https://leetfs.com/tips/system/linux/riscv-lfs",
  },
  {
    date: "2025.07",
    title: "Triton 使用体验与性能分析",
    topic: "从一个向量加法实验观察线程块大小与 GPGPU 性能。",
    href: "https://leetfs.com/tips/gpgpu/trition-report",
  },
  {
    date: "2025.12",
    title: "2025 年度总结",
    topic: "编译器、RISC-V 与开源社区交织而成的一年。",
    href: "https://leetfs.com/life/annual-summary/2025",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "leetfs.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const url = `${origin}/garden`;
  const image = `${origin}/garden-og.png`;
  const title = "Lee — A Quiet Digital Garden";
  const description =
    "Lee 的夜色数字花园：关于 RISC-V、Linux、LLVM、开放协作与持续学习。";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, width: 1734, height: 907, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@leetfs1",
    },
  };
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function GardenPage() {
  return (
    <main className="garden" id="garden-top">
      <a className="garden-skip" href="#garden-content">
        跳到主要内容
      </a>

      <header className="garden-header">
        <a className="garden-signature" href="#garden-top" aria-label="Lee 备选主页顶部">
          Lee<span>✦</span>
        </a>
        <nav aria-label="备选主页导航">
          <a href="#journey">路径</a>
          <a href="#commons">协作</a>
          <a href="#field-notes">文章</a>
        </nav>
        <a className="garden-switch" href="/">
          查看原版 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="garden-hero" id="garden-content" aria-labelledby="garden-title">
        <div className="garden-ambient" aria-hidden="true">
          <span className="garden-halo garden-halo-one" />
          <span className="garden-halo garden-halo-two" />
          <span className="garden-star garden-star-one">✦</span>
          <span className="garden-star garden-star-two">·</span>
          <span className="garden-star garden-star-three">✧</span>
        </div>

        <div className="garden-hero-copy">
          <p className="garden-overline">OPEN SOURCE · SYSTEMS · THE HUMAN SCALE</p>
          <h1 id="garden-title">
            在系统的深处，
            <em>留下人的尺度。</em>
          </h1>
          <p className="garden-lede">
            你好，我是 Lee。<br />
            我构建基础软件、编译器与自动化设施，也参与维护让知识和个人表达自由流动的开放网络。
          </p>
          <div className="garden-actions">
            <a href="https://leetfs.com" target="_blank" rel="noreferrer">
              阅读我的 Blog <Arrow />
            </a>
            <a href="https://github.com/Leetfs" target="_blank" rel="noreferrer">
              GitHub / Leetfs <Arrow />
            </a>
          </div>
        </div>

        <aside className="garden-portrait" aria-label="Lee 的个人简介">
          <div className="garden-portrait-glow" />
          <div className="garden-portrait-image">
            <img src="/lee-avatar.png" alt="Lee 的插画头像" width="640" height="640" />
          </div>
          <div className="garden-portrait-caption">
            <span>LEE / LEETFS</span>
            <span>EST. 2019</span>
          </div>
        </aside>

        <div className="garden-current">
          <span className="garden-pulse" />
          <p>CURRENTLY</p>
          <strong>在中国科学院软件研究所参与 openRuyi Linux 发行版开发</strong>
          <span>2026 — NOW</span>
        </div>
      </section>

      <section className="garden-section garden-journey" id="journey" aria-labelledby="journey-title">
        <div className="garden-section-intro">
          <p>01 / JOURNEY</p>
          <h2 id="journey-title">我沿着一条向下的路，<br />理解计算如何发生。</h2>
        </div>
        <div className="garden-timeline">
          {notes.map((note, index) => (
            <article className="garden-note" key={note.title}>
              <div className="garden-note-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="garden-note-copy">
                <div className="garden-note-meta">
                  <span>{note.kicker}</span>
                  <span>{note.year}</span>
                </div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <blockquote className="garden-quote">
        <p>
          “可靠”不只意味着程序可以运行，
          <span>也意味着人能够理解、参与并从中受益。</span>
        </p>
        <cite>— A note to self</cite>
      </blockquote>

      <section className="garden-section garden-commons" id="commons" aria-labelledby="commons-title">
        <div className="garden-section-intro garden-section-intro-wide">
          <p>02 / THE COMMONS</p>
          <h2 id="commons-title">开源是一片公共空间。</h2>
          <span>
            我在这里学习，也在这里留下工具、文档与可继续生长的连接。
          </span>
        </div>
        <div className="garden-community-grid">
          {communities.map((community) => (
            <a
              className="garden-community"
              href={community.href}
              target="_blank"
              rel="noreferrer"
              key={community.title}
            >
              <span className="garden-community-glyph">{community.glyph}</span>
              <div>
                <p>{community.role}</p>
                <h3>{community.title}</h3>
                <span>{community.body}</span>
              </div>
              <span className="garden-community-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="garden-section garden-writing" id="field-notes" aria-labelledby="garden-writing-title">
        <div className="garden-writing-head">
          <div className="garden-section-intro">
            <p>03 / FIELD NOTES</p>
            <h2 id="garden-writing-title">把走过的路写下来。</h2>
          </div>
          <a href="https://leetfs.com" target="_blank" rel="noreferrer">
            全部文章 <Arrow />
          </a>
        </div>
        <div className="garden-essay-list">
          {essays.map((essay) => (
            <a href={essay.href} target="_blank" rel="noreferrer" key={essay.title}>
              <time>{essay.date}</time>
              <div>
                <h3>{essay.title}</h3>
                <p>{essay.topic}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="garden-footer">
        <div>
          <p>如果你也在构建开放、可靠或有一点奇怪的东西——</p>
          <a href="mailto:lee@mtftm.com">写信给我。</a>
        </div>
        <div className="garden-footer-meta">
          <span>LEE © 2026</span>
          <nav aria-label="社交媒体链接">
            <a href="https://github.com/Leetfs" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://x.com/leetfs1" target="_blank" rel="noreferrer">X</a>
            <a href="https://t.me/leetfs" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://leetfs.com/about/resume" target="_blank" rel="noreferrer">Résumé</a>
          </nav>
          <span>lee@mtftm.com</span>
        </div>
      </footer>
    </main>
  );
}
