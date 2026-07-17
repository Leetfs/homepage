import type { Metadata } from "next";
import Link from "next/link";
import PrintResume from "../components/print-resume";

export const metadata: Metadata = {
  title: "Resume — Lee",
  description: "Lee 的个人简历：Linux、RISC-V、LLVM、前端与开源实践。",
};

const skills = [
  ["LANGUAGES", "C / C++ / TypeScript / Python"],
  ["SYSTEMS", "Linux / RISC-V / systemd / glibc"],
  ["COMPILER", "LLVM / CodeGen / CMake"],
  ["WEB", "React / Vue / Electron"],
  ["INFRA", "Jenkins / GitHub Actions / Docker / Nginx"],
];

const experience = [
  {
    period: "2026.03 — NOW",
    role: "openRuyi Linux 发行版开发",
    organization: "中国科学院软件研究所",
    points: [
      "完成 Amazon SageMaker SDK 在 RISC-V 生态的重构与适配，处理复杂的 Namespace 冲突。",
      "追踪上游 CVE，通过补丁回移、编译与回归测试完成 RISC-V 环境下的安全修复。",
      "参与发行版创新工具的设计与维护，为基础设施引入自动化与 AI 能力。",
    ],
  },
  {
    period: "2025.05 — 2025.07",
    role: "乘影 GPGPU LLVM 工具链开发",
    organization: "中国科学院软件研究所",
    points: [
      "参与面向 RISC-V 自定义指令扩展的开源工具链建设。",
      "为 LLVM 工具链补充向量 half 类型支持。",
      "解决 CodeGen 阶段的指令兼容性与代码生成正确性问题。",
    ],
  },
  {
    period: "2025.02 — 2025.05",
    role: "RISC-V 自动化测试与性能分析平台",
    organization: "中国科学院软件研究所",
    points: [
      "建设基于 Jenkins 的 RISC-V 自动化测试和性能分析流程。",
      "实现多版本性能对比与 HTML 报告生成。",
      "持续追踪 OpenCV 在 RVV 场景中的 PR 与 commit 性能变化。",
    ],
  },
];

const communities = [
  ["openRuyi", "Contributor · Linux / Packaging / Security", "https://github.com/openRuyi"],
  ["Project Trans", "成员 · 前端 / CI / Bot / Review", "https://github.com/project-trans"],
  ["开往 Travellings", "成员 · Bot / 前端 / 文档", "https://github.com/travellings-link/travellings"],
];

export default function ResumePage() {
  return (
    <main className="resume-page" id="resume-top">
      <a className="skip-link" href="#resume-content">跳到简历正文</a>
      <header className="site-header resume-header">
        <Link className="wordmark" href="/" aria-label="返回 Lee 主页">
          <span>LEE</span><sup>/03</sup>
        </Link>
        <nav aria-label="简历导航">
          <Link href="/">主页</Link>
          <Link href="/blog">Blog</Link>
          <a href="#resume-content">经历</a>
          <a href="mailto:lee@mtftm.com">联系</a>
        </nav>
        <PrintResume />
      </header>

      <section className="resume-hero" aria-labelledby="resume-name">
        <div>
          <p className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPEN-SOURCE COLLABORATION</p>
          <h1 id="resume-name">LEE<span>.</span></h1>
          <p className="resume-role">OPEN-SOURCE / SYSTEMS / WEB</p>
        </div>
        <aside>
          <span>PROFILE / 2026</span>
          <p>
            计算机科学与技术专业本科生，具备前端开发、CI/CD 系统与 Linux
            发行版开发经验，深度参与 RISC-V 生态建设。
          </p>
          <div>
            <a href="mailto:lee@mtftm.com">lee@mtftm.com ↗</a>
            <a href="https://github.com/Leetfs" target="_blank" rel="noreferrer">github.com/Leetfs ↗</a>
          </div>
        </aside>
      </section>

      <div className="resume-marquee">
        <span>RISC-V</span><i>✦</i><span>LINUX</span><i>✦</i><span>LLVM</span><i>✦</i>
        <span>OPEN SOURCE</span><i>✦</i><span>REACT / VUE</span><i>✦</i><span>CI / CD</span>
      </div>

      <div className="resume-content" id="resume-content">
        <section className="resume-block resume-skills" aria-labelledby="skills-title">
          <div className="resume-block-title">
            <span>01</span><h2 id="skills-title">能力矩阵</h2><small>SKILL MATRIX</small>
          </div>
          <div className="skill-matrix">
            {skills.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
        </section>

        <section className="resume-block" aria-labelledby="experience-title">
          <div className="resume-block-title">
            <span>02</span><h2 id="experience-title">项目经历</h2><small>EXPERIENCE</small>
          </div>
          <div className="resume-timeline">
            {experience.map((item, index) => (
              <article key={item.role}>
                <span className="resume-item-index">0{index + 1}</span>
                <div className="resume-item-main">
                  <div><time>{item.period}</time><span>{item.organization}</span></div>
                  <h3>{item.role}</h3>
                  <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-block" aria-labelledby="community-title">
          <div className="resume-block-title">
            <span>03</span><h2 id="community-title">开源社区</h2><small>COMMUNITY</small>
          </div>
          <div className="resume-community">
            {communities.map(([name, role, href], index) => (
              <a href={href} target="_blank" rel="noreferrer" key={name}>
                <span>0{index + 1}</span><h3>{name}</h3><p>{role}</p><b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className="resume-block resume-education" aria-labelledby="education-title">
          <div className="resume-block-title">
            <span>04</span><h2 id="education-title">教育背景</h2><small>EDUCATION</small>
          </div>
          <div>
            <p>COMPUTER SCIENCE &amp; TECHNOLOGY</p>
            <h3>计算机科学与技术</h3>
            <span>本科在读</span>
          </div>
        </section>
      </div>

      <footer className="resume-footer">
        <p>REFERENCES, CODE SAMPLES &amp; MORE DETAILS AVAILABLE ON REQUEST.</p>
        <a href="mailto:lee@mtftm.com">LET&apos;S<br />TALK<span>.</span></a>
        <div><span>LEE / 2026</span><Link href="/">HOME ↗</Link><Link href="/blog">BLOG ↗</Link></div>
      </footer>
    </main>
  );
}
