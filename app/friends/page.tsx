import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Friends — Lee",
  description: "Lee 的友情链接：独立站点、朋友与仍在生长的个人表达。",
};

const friends = [
  {
    index: "F01",
    name: "猫卷",
    description: "善良的猫卷，纯洁的猫卷，乖孩子猫卷。",
    href: "https://github.com/lumigj",
    host: "github.com/lumigj",
    avatar: "/friends/lumi.PNG",
    tone: "acid",
  },
  {
    index: "F02",
    name: "玲雨兰夜",
    description: "诶嘿嘿……欢迎来到玲雨兰夜的个人站点。",
    href: "http://nhui.top/",
    host: "nhui.top",
    avatar: "/friends/nhui.jpg",
    tone: "paper",
  },
  {
    index: "F03",
    name: "香菜",
    description: "香菜的博客，分享技术、生活和个人记录。",
    href: "https://mdzz.pro/",
    host: "mdzz.pro",
    avatar: "https://avatars.githubusercontent.com/u/85744569",
    tone: "blue",
  },
  {
    index: "F04",
    name: "DokiDoki·大黄猫",
    description: "黄猫杂货店，一间有趣且持续更新的网络小店。",
    href: "https://www.iacg.moe/",
    host: "iacg.moe",
    avatar: "https://www.iacg.moe/upload/cat.png",
    tone: "coral",
  },
];

export default function FriendsPage() {
  return (
    <main className="friends-page" id="friends-top">
      <a className="skip-link" href="#friends-list">跳到友链列表</a>
      <header className="site-header friends-header">
        <Link className="wordmark" href="/" aria-label="返回 Lee 主页">
          <span>LEE</span><sup>/04</sup>
        </Link>
        <nav aria-label="友链页导航">
          <Link href="/">主页</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resume">简历</Link>
          <a href="#friends-list">友链</a>
        </nav>
        <a className="header-contact" href="mailto:lee@mtftm.com?subject=交换友链">
          SAY HELLO <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="friends-hero" aria-labelledby="friends-title">
        <div className="friends-hero-main">
          <p className="eyebrow"><span className="status-dot" /> INDEPENDENT WEB / HUMAN CONNECTIONS</p>
          <h1 id="friends-title">GOOD SITES.<br /><em>GOOD PEOPLE.</em></h1>
          <p>互联网不只由平台构成，也由一个个有名字、有性格的小站组成。</p>
        </div>
        <aside>
          <span>FRIEND NETWORK / {String(friends.length).padStart(2, "0")}</span>
          <div className="friends-nodes" aria-hidden="true">
            {friends.map((friend) => <i key={friend.index} />)}
            <b>LEE</b>
          </div>
          <p>这里收录朋友们的个人空间。沿着链接出发，去看看别人的互联网。</p>
        </aside>
      </section>

      <section className="friends-section" id="friends-list" aria-labelledby="friends-list-title">
        <div className="friends-heading">
          <p className="section-index">01 / FRIEND DIRECTORY</p>
          <h2 id="friends-list-title">朋友们的<br />网络坐标。</h2>
          <p>每个链接都会在新窗口打开。排序不分先后，连接保持自由。</p>
        </div>
        <div className="friends-grid">
          {friends.map((friend) => (
            <a
              className={`friend-card ${friend.tone}`}
              href={friend.href}
              target="_blank"
              rel="noreferrer"
              key={friend.name}
            >
              <div className="friend-card-topline"><span>{friend.index}</span><span>VISIT ↗</span></div>
              <div className="friend-avatar">
                <img src={friend.avatar} alt={`${friend.name} 的头像`} width="240" height="240" />
              </div>
              <div className="friend-copy">
                <span>{friend.host}</span>
                <h3>{friend.name}</h3>
                <p>{friend.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="friends-invite" aria-labelledby="friends-invite-title">
        <div>
          <p className="section-index">02 / OPEN INVITATION</p>
          <h2 id="friends-invite-title">想交换友链？</h2>
        </div>
        <div>
          <p>如果你也在维护一个真诚、持续更新的个人站点，欢迎发来网址、名称、简介和头像。</p>
          <a href="mailto:lee@mtftm.com?subject=交换友链">发送友链信息 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="friends-footer">
        <p>KEEP THE INDEPENDENT WEB ALIVE.</p>
        <Link href="/">BACK TO<br /><em>HOME.</em></Link>
        <div><span>LEE / FRIENDS / 2026</span><Link href="/blog">BLOG ↗</Link><Link href="/resume">RESUME ↗</Link></div>
      </footer>
    </main>
  );
}
