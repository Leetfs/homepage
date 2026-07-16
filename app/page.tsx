import ArticleDeck from "./components/article-deck";
import latestArticles from "./generated/latest-articles.json";

const socials = [
  { label: "GitHub", short: "GH", href: "https://github.com/Leetfs" },
  { label: "X", short: "X", href: "https://x.com/leetfs1" },
  { label: "Telegram", short: "TG", href: "https://t.me/leetfs" },
];

const primaryLinks = [
  { label: "Blog", detail: "Notes & Writing", href: "https://leetfs.com", tone: "acid", external: true },
  { label: "GitHub", detail: "Code & Contributions", href: "https://github.com/Leetfs", tone: "blue", external: true },
  { label: "X", detail: "@leetfs1", href: "https://x.com/leetfs1", tone: "coral", external: true },
  { label: "Telegram", detail: "@leetfs", href: "https://t.me/leetfs", tone: "dark", external: true },
  { label: "Email", detail: "lee@mtftm.com", href: "mailto:lee@mtftm.com", tone: "paper", external: false },
];

const experience = [
  {
    index: "01",
    period: "2026 — NOW",
    title: "openRuyi Linux",
    organization: "中国科学院软件研究所",
    subtitle: "发行版开发",
    description:
      "面向 RISC-V 生态进行软件包重构、CVE 补丁回移与回归测试，并探索将自动化与 AI 能力带入发行版基础设施。",
    tags: ["RISC-V", "Linux", "Packaging", "Security"],
  },
  {
    index: "02",
    period: "2025",
    title: "GPGPU × LLVM",
    organization: "中国科学院软件研究所",
    subtitle: "乘影工具链 · 编译器与代码生成",
    description:
      "为 RISC-V 自定义指令扩展完善 LLVM 工具链，补充向量 half 类型支持，处理 CodeGen 阶段的兼容性与生成正确性。",
    tags: ["LLVM", "C++", "CodeGen", "GPGPU"],
  },
  {
    index: "03",
    period: "2025",
    title: "Performance CI",
    organization: "中国科学院软件研究所",
    subtitle: "RISC-V 自动化测试与性能分析",
    description:
      "构建基于 Jenkins 的自动化测试流，持续追踪 OpenCV 在 RVV 场景中的性能变化，并将结果转化为可比较的报告。",
    tags: ["Jenkins", "OpenCV", "RVV", "Automation"],
  },
];

const openSource = [
  {
    mark: "OR",
    title: "openRuyi",
    role: "Contributor · Linux / Packaging / Security",
    description:
      "参与 RISC-V 发行版的软件包适配、安全补丁回移与基础设施建设，让系统能力稳定抵达更多架构。",
    href: "https://github.com/openRuyi",
    tone: "coral",
  },
  {
    mark: "PT",
    title: "Project Trans",
    role: "成员 · 前端 / CI / Bot / Review",
    description:
      "参与建设自由、开放、持续更新的跨性别知识平台，让信息更容易抵达需要它的人。",
    href: "https://github.com/project-trans",
    tone: "acid",
  },
  {
    mark: "开往",
    title: "Travellings",
    role: "成员 · Bot / 前端 / 文档",
    description:
      "维护中文独立博客随机跳转网络，用代码把分散的个人表达连接成一条仍在生长的路径。",
    href: "https://github.com/travellings-link/travellings",
    tone: "blue",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#content">
        跳到主要内容
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Lee 主页顶部">
          <span>LEE</span>
          <sup>/01</sup>
        </a>
        <nav aria-label="主导航">
          <a href="#work">工作</a>
          <a href="#open-source">开源</a>
          <a href="#writing">写作</a>
          <a href="#about">关于</a>
        </nav>
        <a className="header-contact" href="#links">
          LINKS / 05 <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="hero" id="content" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> OPEN-SOURCE ENGINEER · SHANGHAI / BEIJING
          </p>
          <h1 id="hero-title">
            BUILD CLOSE
            <br />
            TO THE <em>SYSTEM.</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">
              你好，我是 Lee。<br />
              我在基础软件、编译器与界面之间工作，
              <strong>也相信技术应该让人更自由。</strong>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#open-source">
                查看开源项目 <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href="#writing">
                阅读最新文章 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <nav className="hero-link-dock" id="links" aria-label="主要外部链接">
            <div className="hero-link-label">
              <span>FIND ME ONLINE</span>
              <strong>05 / LINKS</strong>
            </div>
            {primaryLinks.map((link) => (
              <a
                className={`hero-link tone-${link.tone}`}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                key={link.label}
                aria-label={`${link.label}${link.external ? "（新窗口打开）" : ""}`}
              >
                <span>{link.label}</span>
                <small>{link.detail}</small>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>
        </div>

        <aside className="hero-panel" aria-label="当前工作状态">
          <div className="panel-topline">
            <span>CURRENTLY / 2026</span>
            <span className="panel-ping">LIVE</span>
          </div>
          <div className="system-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="core">RV</div>
            <span className="orbit-label label-linux">LINUX</span>
            <span className="orbit-label label-llvm">LLVM</span>
            <span className="orbit-label label-ci">CI</span>
          </div>
          <div className="panel-list">
            <div>
              <span>FOCUS</span>
              <strong>RISC-V 基础软件</strong>
            </div>
            <div>
              <span>BUILDING</span>
              <strong>openRuyi Linux</strong>
            </div>
            <div>
              <span>VALUES</span>
              <strong>Open · Equal · Useful</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className="ticker" aria-label="关注领域">
        <div>
          <span>RISC-V</span><i>✦</i><span>LINUX</span><i>✦</i><span>LLVM</span><i>✦</i>
          <span>OPEN SOURCE</span><i>✦</i><span>EQUALITY</span><i>✦</i><span>CI / CD</span>
        </div>
      </div>

      <section className="section work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-index">01 / WHAT I BUILD</p>
          <h2 id="work-title">向下理解系统，<br />向上交付体验。</h2>
          <p>
            从发行版与工具链，到性能基础设施；
            我喜欢把复杂问题拆开，再把可靠的部分重新连接起来。
          </p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row" key={item.index}>
              <span className="experience-index">{item.index}</span>
              <div className="experience-main">
                <div className="experience-titleline">
                  <h3>{item.title}</h3>
                  <span>{item.period}</span>
                </div>
                <p className="experience-organization">{item.organization}</p>
                <p className="experience-subtitle">{item.subtitle}</p>
                <p className="experience-description">{item.description}</p>
                <ul aria-label={`${item.title} 技术标签`}>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section open-section" id="open-source" aria-labelledby="open-title">
        <div className="open-heading">
          <p className="section-index">02 / OPEN SOURCE LAB</p>
          <h2 id="open-title">代码之外，<br />连接也很重要。</h2>
        </div>
        <div className="project-grid">
          {openSource.map((project) => (
            <a
              className={`project-card ${project.tone}`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.title}
            >
              <div className="project-mark">{project.mark}</div>
              <div className="project-number"><ExternalArrow /></div>
              <div className="project-content">
                <p>{project.role}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section writing-section" id="writing" aria-labelledby="writing-title">
        <div className="writing-heading">
          <div>
            <p className="section-index">03 / FIELD NOTES</p>
            <h2 id="writing-title">写下那些<br />真正踩过的坑。</h2>
          </div>
          <a className="text-link" href="https://leetfs.com" target="_blank" rel="noreferrer">
            浏览全部文章 <ExternalArrow />
          </a>
        </div>
        <ArticleDeck
          articles={latestArticles.articles}
          generatedAt={latestArticles.generatedAt}
        />
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="portrait-wrap">
          <div className="portrait-card">
            <img src="/lee-avatar.png" alt="Lee 的插画头像" width="640" height="640" />
          </div>
          <p>LEE / LEETFS <span>© 2026</span></p>
        </div>
        <div className="about-copy">
          <p className="section-index">04 / A SMALL MANIFESTO</p>
          <h2 id="about-title">
            OPEN SOURCE IS HOW
            <span>WE LEARN IN PUBLIC.</span>
          </h2>
          <div className="about-columns">
            <p>
              我是计算机科学与技术专业本科生，目前在中国科学院软件研究所实习。
              工作之外，我参与维护知识平台、独立博客网络与社区工具。
            </p>
            <p>
              我关心代码是否可靠，也关心它最终服务了谁。
              对我而言，开源不仅是开发方式，也是一种公开学习、彼此协作和扩大选择的实践。
            </p>
          </div>
          <div className="about-links">
            <a href="https://leetfs.com/about/resume" target="_blank" rel="noreferrer">
              查看完整简历 <ExternalArrow />
            </a>
            <a
              href="https://keyserver.ubuntu.com/pks/lookup?search=49DBD365E8D18E4FB84FBC3FA9977131DCD8593F&fingerprint=on&op=index"
              target="_blank"
              rel="noreferrer"
            >
              PGP 公钥 <ExternalArrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-lead">
          <p>HAVE A PROJECT, AN IDEA, OR JUST A GOOD QUESTION?</p>
          <a href="mailto:lee@mtftm.com">
            LET&apos;S TALK<span>.</span>
          </a>
        </div>
        <div className="footer-meta">
          <p>LEE — OPEN SOURCE / SYSTEMS / WEB</p>
          <div>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label} <ExternalArrow />
              </a>
            ))}
            <a href="https://leetfs.com" target="_blank" rel="noreferrer">
              Blog <ExternalArrow />
            </a>
          </div>
          <p>lee@mtftm.com</p>
        </div>
      </footer>
    </main>
  );
}
