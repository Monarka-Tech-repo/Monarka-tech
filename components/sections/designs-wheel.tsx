"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import type { DemoItem } from "@/components/sections/demo-gallery";
import s from "./designs-wheel.module.css";

type Copy = Dictionary["designs"]["index"];

/** The full Demo Index page and the published demos, from scripts/sync-demo-index.mjs. */
export const INDEX_HREF = "/indice/";
const demoHref = (slug: string) => `/indice/${slug}/`;
const previewSrc = (slug: string) => `/indice/_previews/${slug}.png`;

// Same order as the builder's index-library.html.
const ORDER = ["villa-orso", "interactive-dev", "portfolio", "lindehof", "fornello", "construction-timelapse", "construction", "saas"];
const YEAR = "2026";
// Height of the fixed site nav the stage sticks under (Tailwind h-20).
const NAV_H = 80;

const pad = (n: number) => String(n).padStart(2, "0");
const slotState = (i: number, active: number) => (i < active ? "prev" : i === active ? "cur" : "next");
const delay = (d: number) => ({ "--d": d }) as React.CSSProperties;

function Line({ d, className = "", children }: { d: number; className?: string; children: React.ReactNode }) {
  return (
    <span className={`${s.m} ${className}`}>
      <span style={delay(d)}>{children}</span>
    </span>
  );
}

/**
 * A glimpse of the Demo Index's wheel view: scrolling turns a wheel of polaroid
 * screenshots while the number, title and category roll over to the next demo.
 * Clicking the front card (or "View site") opens that demo as its own page;
 * "Open index" opens the full Demo Index.
 */
export function DesignsWheel({
  t,
  items,
  industries,
}: {
  t: Copy;
  items: DemoItem[];
  /** Industry title per demo `type`, shown on the right like the original's category. */
  industries: Record<string, string>;
}) {
  const demos = ORDER.flatMap((slug) => items.filter((item) => item.slug === slug));
  const N = demos.length;

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const geo = useRef({ R: 0, step: 23, per: 1, trackTop: 0, cur: 0, target: 0, running: false, reduce: false });

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const goTo = useCallback(
    (i: number) => {
      const g = geo.current;
      const clamped = Math.max(0, Math.min(N - 1, i));
      window.scrollTo({ top: g.trackTop - NAV_H + clamped * g.per, behavior: g.reduce ? "auto" : "smooth" });
    },
    [N],
  );

  useEffect(() => {
    const g = geo.current;
    g.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || N === 0) return;

    function layout() {
      const W = stage!.clientWidth;
      const H = stage!.clientHeight;
      const mob = W < 768;
      const sTop = stage!.getBoundingClientRect().top;

      // Lowest point any demo's title block can reach (titles wrap differently)...
      let textBottom = 0;
      for (const box of [titleRef.current, catRef.current]) {
        if (!box) continue;
        const top = box.getBoundingClientRect().top - sTop;
        for (const child of Array.from(box.children) as HTMLElement[]) textBottom = Math.max(textBottom, top + child.offsetHeight);
      }
      // ...and the highest point of the "up next" line at the bottom.
      let nextH = 0;
      const nextBox = nextRef.current!;
      for (const child of Array.from(nextBox.children) as HTMLElement[]) nextH = Math.max(nextH, child.offsetHeight);
      const nextTop = nextBox.getBoundingClientRect().top - sTop - nextH;

      const gap = Math.max(14, H * 0.03);
      const avail = nextTop - gap - (textBottom + gap); // vertical room for the front card
      const ratio = 1.36; // polaroid: photo + thick bottom strip
      const cardW = Math.max(110, Math.min(mob ? W * 0.5 : W * 0.17, avail / ratio));
      const cardH = cardW * ratio;
      const cy = textBottom + gap + cardH / 2;
      g.R = mob ? W * 1.25 : Math.max(W * 0.8, cardW * 5.2);
      g.step = mob ? 32 : 23;

      const panel = panelRef.current!;
      panel.style.height = `${Math.max(0, cy + cardH * 0.12 - panel.offsetTop)}px`;
      const wheel = wheelRef.current!;
      wheel.style.left = `${W / 2}px`;
      wheel.style.top = `${cy + g.R}px`;
      for (const c of cardRefs.current) {
        if (!c) continue;
        c.style.width = `${cardW}px`;
        c.style.height = `${cardH}px`;
        c.style.marginLeft = `${-cardW / 2}px`;
        c.style.marginTop = `${-cardH / 2}px`;
        c.style.setProperty("--frame", `${cardW * 0.07}px`);
      }
      const dr = g.R * 0.8;
      const disc = discRef.current!;
      disc.style.width = disc.style.height = `${dr * 2}px`;
      disc.style.left = `${W / 2}px`;
      disc.style.top = `${cy + g.R}px`;
      const band = bandRef.current!;
      band.style.width = `${cardW * 1.7}px`;
      band.style.height = `${Math.max(0, H - (cy + g.R - dr) + 2)}px`;

      g.per = Math.round(window.innerHeight * 0.55);
      track!.style.height = `${(N - 1) * g.per + H}px`;
      g.trackTop = track!.getBoundingClientRect().top + window.scrollY;
    }

    function render() {
      for (let i = 0; i < N; i++) {
        const c = cardRefs.current[i];
        if (!c) continue;
        const off = i - g.cur;
        const ao = Math.abs(off);
        if (ao > 2.6) {
          c.style.visibility = "hidden";
          continue;
        }
        c.style.visibility = "";
        c.style.opacity = ao <= 1 ? "1" : String(Math.max(0, 1 - (ao - 1) * 0.55));
        c.style.transform = `rotate(${off * g.step}deg) translateY(${-g.R}px)`;
        c.style.zIndex = String(100 - Math.round(ao * 10));
      }
      if (barRef.current) barRef.current.style.width = `${N > 1 ? (g.cur / (N - 1)) * 100 : 100}%`;
      const a = Math.round(g.cur);
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
    }

    function frame() {
      g.cur += (g.target - g.cur) * (g.reduce ? 1 : 0.1);
      if (Math.abs(g.target - g.cur) < 0.0005) g.cur = g.target;
      render();
      if (g.cur !== g.target) requestAnimationFrame(frame);
      else g.running = false;
    }

    function readScroll() {
      g.target = Math.max(0, Math.min(N - 1, (window.scrollY + NAV_H - g.trackTop) / g.per));
      if (!g.running) {
        g.running = true;
        requestAnimationFrame(frame);
      }
    }

    function relayout() {
      layout();
      g.target = Math.max(0, Math.min(N - 1, (window.scrollY + NAV_H - g.trackTop) / g.per));
      g.cur = g.target;
      render();
    }

    const start = requestAnimationFrame(relayout);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", relayout);
    // Titles change height once the web font arrives, which moves the cards.
    document.fonts?.ready.then(relayout);
    return () => {
      cancelAnimationFrame(start);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", relayout);
    };
  }, [N]);

  const onCard = (i: number) => {
    if (i === activeRef.current) window.open(demoHref(demos[i].slug), "_blank", "noopener");
    else goTo(i);
  };

  if (N === 0) return null;
  const current = demos[active];

  return (
    <section ref={trackRef} aria-label={t.label} className={s.root}>
      <div ref={stageRef} className={s.stage}>
        <div className={s.top}>
          <a href={INDEX_HREF} className={s.brand}>
            <span className={s.brandMark} aria-hidden />
            <span>
              <b>Monarka</b>
              {t.label}
              <sup>®</sup>
            </span>
          </a>
          <a href={INDEX_HREF} className={s.openIndex}>
            {t.button}
            <sup>{N}</sup> ↗
          </a>
        </div>

        <div ref={panelRef} className={s.panel} />
        <div ref={discRef} className={s.disc} />
        <div ref={bandRef} className={s.band} />

        <div ref={wheelRef} className={s.wheel}>
          {demos.map((d, i) => (
            <button
              key={d.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              className={s.card}
              data-active={i === active}
              tabIndex={Math.abs(i - active) <= 1 ? 0 : -1}
              aria-label={`${pad(i + 1)} ${d.name}, ${d.category}${i === active ? ` · ${t.visit}` : ""}`}
              onClick={() => onCard(i)}
            >
              <span className={s.photo}>
                <Image src={previewSrc(d.slug)} alt="" fill sizes="(max-width: 768px) 50vw, 17vw" loading={i > 2 ? "lazy" : undefined} />
              </span>
              <span className={s.cardLabel} aria-hidden>
                {t.visit}
              </span>
            </button>
          ))}
        </div>

        <div className={`${s.slots} ${s.big} ${s.sNum}`} aria-hidden>
          {demos.map((d, i) => (
            <div key={d.slug} className={s.slot} data-s={slotState(i, active)}>
              <Line d={0}>{i + 1}</Line>
            </div>
          ))}
        </div>

        <div ref={titleRef} className={`${s.slots} ${s.big} ${s.sTitle}`}>
          {demos.map((d, i) => (
            <div key={d.slug} className={s.slot} data-s={slotState(i, active)} aria-hidden={i !== active}>
              <Line d={0}>{d.name}</Line>
              <Line d={1} className={s.q}>
                “{d.category}”
              </Line>
              <Line d={2} className={`${s.sm} ${s.gap}`}>
                <span className={s.spec}>
                  {d.highlights.map((h) => (
                    <i key={h}>({h})</i>
                  ))}
                  <a href={demoHref(d.slug)} target="_blank" rel="noopener" className={s.open} tabIndex={i === active ? 0 : -1}>
                    {t.visit}
                  </a>
                </span>
              </Line>
            </div>
          ))}
        </div>

        <div ref={catRef} className={`${s.slots} ${s.sCat}`} aria-hidden>
          {demos.map((d, i) => (
            <div key={d.slug} className={s.slot} data-s={slotState(i, active)}>
              <Line d={0}>{industries[d.type] ?? d.category}</Line>
              <Line d={1} className={`${s.sm} ${s.gapS}`}>
                <small>({YEAR})</small>
              </Line>
            </div>
          ))}
        </div>

        <div className={`${s.slots} ${s.big} ${s.sNextNum}`} aria-hidden>
          {demos.map((d, i) => (
            <div key={d.slug} className={s.slot} data-s={slotState(i, active + 1)}>
              <Line d={0}>{i + 1}</Line>
            </div>
          ))}
        </div>

        <div ref={nextRef} className={`${s.slots} ${s.big} ${s.sNext}`} aria-hidden>
          {demos.map((d, i) => (
            <div key={d.slug} className={s.slot} data-s={slotState(i, active + 1)}>
              <Line d={0}>{d.name}</Line>
              <Line d={1} className={s.q}>
                {d.category}
              </Line>
            </div>
          ))}
        </div>

        <div className={s.progress} aria-hidden>
          <i ref={barRef} />
        </div>
        <span className={`${s.corner} ${s.cornerL}`} aria-hidden>
          &apos;{YEAR.slice(2)}
        </span>
        <button type="button" className={`${s.corner} ${s.cornerR}`} onClick={() => goTo(active === N - 1 ? 0 : active + 1)}>
          {active === N - 1 ? t.top : t.scroll}
        </button>
        <p className="sr-only" aria-live="polite">
          {`${pad(active + 1)} ${t.of} ${N}: ${current.name}, ${current.category}`}
        </p>
      </div>
    </section>
  );
}
