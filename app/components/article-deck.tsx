"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

export type Article = {
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
  updatedAt: string;
  displayDate: string;
  readingMinutes: number;
};

type ArticleDeckProps = {
  articles: Article[];
  generatedAt: string;
};

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export default function ArticleDeck({ articles, generatedAt }: ArticleDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const active = articles[activeIndex];

  const activate = useCallback((index: number) => {
    if (index === activeIndex) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionDocument = document as TransitionDocument;

    if (!reduceMotion && transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(() => setActiveIndex(index));
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell || event.pointerType === "touch") return;
    const { clientX, clientY } = event;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = shell.getBoundingClientRect();
      shell.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      shell.style.setProperty("--spot-y", `${clientY - rect.top}px`);
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? articles.length - 1
        : (index + (event.key === "ArrowDown" ? 1 : -1) + articles.length) % articles.length;

    activate(next);
    linksRef.current[next]?.focus();
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      className="article-deck"
      ref={shellRef}
      onPointerMove={handlePointerMove}
      style={{ "--spot-x": "70%", "--spot-y": "30%" } as CSSProperties}
    >
      <aside className="article-signal" aria-label="当前文章预览">
        <div className="signal-topline">
          <span>BUILD-TIME FEED</span>
          <span className="signal-live"><i /> SYNCED</span>
        </div>
        <p className="signal-number">{active.number}</p>
        <div className="signal-copy">
          <p className="signal-category">{active.category}</p>
          <h3 style={{ viewTransitionName: "article-preview-title" }}>{active.title}</h3>
          <p>{active.description}</p>
        </div>
        <div className="signal-meta">
          <span>UPDATED {active.displayDate}</span>
          <span>{active.readingMinutes} MIN READ</span>
        </div>
        <div className="signal-wave" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
        </div>
      </aside>

      <div className="article-list" aria-label="Blog 最新三篇文章">
        <p className="article-sync-note">
          <span>LIVE INDEX / 03</span>
          <time dateTime={generatedAt}>BUILD {generatedAt.slice(0, 10).replaceAll("-", ".")}</time>
        </p>
        {articles.map((article, index) => (
          <a
            className="article-row"
            data-active={activeIndex === index}
            href={article.href}
            key={article.href}
            ref={(node) => { linksRef.current[index] = node; }}
            onPointerEnter={() => activate(index)}
            onFocus={() => activate(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            aria-label={`${article.title}，更新于 ${article.displayDate}，约 ${article.readingMinutes} 分钟阅读`}
          >
            <span className="article-number">{article.number}</span>
            <span className="article-category">{article.category}</span>
            <div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span className="article-mobile-meta">{article.displayDate} · {article.readingMinutes} MIN</span>
            </div>
            <span className="article-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
