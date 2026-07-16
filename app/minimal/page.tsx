import type { Metadata } from "next";
import { headers } from "next/headers";
import "./minimal.css";

const work = [
  {
    year: "2026 —",
    title: "openRuyi Linux",
    role: "发行版开发 / 中国科学院软件研究所",
    body: "面向 RISC-V 生态进行软件包重构、CVE 补丁回移、编译与回归测试，并参与发行版自动化工具的设计与维护。",
    stack: "RISC-V · Linux · Packaging · Security",
  },
  {
    year: "2025",
    title: "乘影 GPGPU LLVM",
    role: "工具链开发 / 中国科学院软件研究所",
    body: "支持 RISC-V 自定义指令扩展，为 LLVM 工具链补充向量 half 类型，并处理 CodeGen 阶段的兼容性与生成正确性。",
    stack: "LLVM · C++ · CodeGen · GPGPU",
  },
  {
    year: "2025",
    title: "RISC-V Performance CI",
    role: "自动化测试与性能分析",
    body: "构建基于 Jenkins 的测试流程，持续追踪 OpenCV 在 RVV 场景中的性能变化，并将结果转化为可比较的报告。",
    stack: "Jenkins · OpenCV · RVV · Automation",
  },
];

const projects = [
  {
    no: "01",
    title: "Project Trans",
    role: "前端 · CI · Bot · Review",
    href: "https://github.com/project-trans",
  },
  {
    no: "02",
    title: "开往 / Travellings",
    role: "Bot · 前端 · 文档",
    href: "https://github.com/travellings-link/travellings",
  },
  {
    no: "03",
    title: "GitHelper",
    role: "Creator · Electron",
    href: "https://github.com/Leetfs/GitHelper",
  },
];

const writing = [
  {
    date: "2026.03",
    title: "RISCV 64 glibc + systemd LFS 通关攻略",
    type: "SYSTEMS",
    href: "https://leetfs.com/tips/system/linux/riscv-lfs",
  },
  {
    date: "2025.07",
    title: "Triton 使用体验与性能分析",
    type: "GPGPU",
    href: "https://leetfs.com/tips/gpgpu/trition-report",
  },
  {
    date: "2025.12",
    title: "2025 年度总结",
    type: "OPEN SOURCE",
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
  const url = `${origin}/minimal`;
  const image = `${origin}/minimal-og.png`;
  const title = "Lee — Open Source & Systems";
  const description = "Lee 的极简个人主页：基础软件、开源协作与技术写作。";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, width: 1732, height: 908, alt: title }],
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

export default function MinimalPage() {
  return (
    <main className="minimal" id="minimal-top">
      <a className="minimal-skip" href="#minimal-content">
        跳到主要内容
      </a>

      <header className="minimal-header">
        <a className="minimal-logo" href="#minimal-top" aria-label="Lee 极简主页顶部">
          L<span>.</span>
        </a>
        <nav aria-label="极简主页导航">
          <a href="#work">工作</a>
          <a href="#open-source">开源</a>
          <a href="#writing">文章</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="minimal-back" href="/">
          原版 <Arrow />
        </a>
      </header>

      <section className="minimal-hero" id="minimal-content" aria-labelledby="minimal-title">
        <div className="minimal-hero-main">
          <p className="minimal-kicker">
            <span /> LEE / LEETFS — OPEN SOURCE ENGINEER
          </p>
          <h1 id="minimal-title">把复杂的东西，<br />做得简单、可靠、<br />可继续。</h1>
        </div>
        <aside className="minimal-hero-side" aria-label="个人简介">
          <p>
            我是 Lee，一名计算机科学与技术专业本科生，目前在中国科学院软件研究所实习。
          </p>
          <p>
            我关注 RISC-V、Linux、LLVM 与自动化基础设施，也参与维护让知识和个人表达自由流动的开源项目。
          </p>
          <div className="minimal-hero-links">
            <a href="https://leetfs.com" target="_blank" rel="noreferrer">
              Blog <Arrow />
            </a>
            <a href="https://github.com/Leetfs" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
        </aside>
        <div className="minimal-facts">
          <div><span>FOCUS</span><strong>RISC-V / Linux</strong></div>
          <div><span>NOW</span><strong>openRuyi</strong></div>
          <div><span>BASED</span><strong>China · UTC+8</strong></div>
          <div><span>EMAIL</span><a href="mailto:lee@mtftm.com">lee@mtftm.com</a></div>
        </div>
      </section>

      <section className="minimal-section minimal-work" id="work" aria-labelledby="minimal-work-title">
        <div className="minimal-section-head">
          <p>01</p>
          <h2 id="minimal-work-title">工作经历</h2>
          <span>Selected experience</span>
        </div>
        <div className="minimal-work-list">
          {work.map((item) => (
            <article className="minimal-work-row" key={item.title}>
              <time>{item.year}</time>
              <div className="minimal-work-title">
                <h3>{item.title}</h3>
                <p>{item.role}</p>
              </div>
              <div className="minimal-work-copy">
                <p>{item.body}</p>
                <span>{item.stack}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="minimal-section minimal-open" id="open-source" aria-labelledby="minimal-open-title">
        <div className="minimal-section-head">
          <p>02</p>
          <h2 id="minimal-open-title">开源协作</h2>
          <span>Communities & tools</span>
        </div>
        <p className="minimal-open-intro">
          开源不仅是发布代码。它也是共同维护文档、流程、工具与信任的方式。
        </p>
        <div className="minimal-project-list">
          {projects.map((project) => (
            <a href={project.href} target="_blank" rel="noreferrer" key={project.title}>
              <span>{project.no}</span>
              <h3>{project.title}</h3>
              <p>{project.role}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="minimal-section minimal-writing" id="writing" aria-labelledby="minimal-writing-title">
        <div className="minimal-section-head">
          <p>03</p>
          <h2 id="minimal-writing-title">最近写作</h2>
          <a href="https://leetfs.com" target="_blank" rel="noreferrer">
            全部文章 <Arrow />
          </a>
        </div>
        <div className="minimal-writing-list">
          {writing.map((article) => (
            <a href={article.href} target="_blank" rel="noreferrer" key={article.title}>
              <time>{article.date}</time>
              <h3>{article.title}</h3>
              <span>{article.type}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <footer className="minimal-footer" id="contact">
        <div className="minimal-footer-main">
          <p>有项目、想法，或者只是一个好问题？</p>
          <a href="mailto:lee@mtftm.com">和我聊聊。</a>
        </div>
        <div className="minimal-footer-bottom">
          <span>LEE © 2026</span>
          <nav aria-label="社交链接">
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
