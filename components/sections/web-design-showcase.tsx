"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Copy = Dictionary["studio"]["webDesign"];
type Template = Copy["templates"][number];

const ROTATE_MS = 5000;
const SERIF = "var(--font-fraunces), Georgia, serif";

/** Shifts a layer with the mouse (CSS vars --mx/--my in [-1, 1] set on the screen). */
function parallax(depth: number, extra = ""): CSSProperties {
  return { transform: `translate(calc(var(--mx, 0) * ${depth}cqw), calc(var(--my, 0) * ${depth * 0.7}cqw)) ${extra}` };
}

function Marquee({ items, sep, className, style, duration = 14 }: { items: string[]; sep: string; className?: string; style?: CSSProperties; duration?: number }) {
  const run = items.map((item) => `${item} ${sep} `).join("");
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`} style={style}>
      <div className="flex w-max" style={{ animation: `wd-marquee ${duration}s linear infinite` }}>
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  );
}

function SpinBadge({ text, size, color, bg, className, style, children }: { text: string; size: string; color: string; bg?: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`absolute ${className ?? ""}`} style={{ width: size, height: size, ...style }}>
      {bg && <div className="absolute inset-0 rounded-full shadow-[0_0.8cqw_1.6cqw_-0.6cqw_rgba(0,0,0,.3)]" style={{ background: bg }} />}
      <svg viewBox="0 0 100 100" className="relative size-full" style={{ animation: "wd-spin 14s linear infinite" }}>
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        {/* Circle path is ~239 units long; shrink the type so any badge text fits exactly once around. */}
        <text fill={color} style={{ fontSize: Math.min(10.5, 232 / (text.length * 0.78)), fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

function Nav({ t, color, font }: { t: Template; color: string; font?: string }) {
  return (
    <div className="relative z-10 flex items-center justify-between px-[3.5cqw] py-[2.2cqw]" style={{ color }}>
      <span className="text-[2.2cqw] font-bold tracking-tight" style={{ fontFamily: font }}>{t.brand}</span>
      <div className="flex items-center gap-[2.4cqw] text-[1.35cqw] font-medium uppercase tracking-[0.08em]">
        {t.nav.map((item) => <span key={item}>{item}</span>)}
        <span className="grid size-[3cqw] place-items-center rounded-full border" style={{ borderColor: color }}>
          <span className="block h-[0.18cqw] w-[1.3cqw]" style={{ background: color, boxShadow: `0 0.45cqw 0 ${color}` }} />
        </span>
      </div>
    </div>
  );
}

/* ——— Restaurant: giant italic serif, spinning plate, terracotta ticker ——— */
function Restaurant({ t }: { t: Template }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#f3ead8] text-[#2b1d14]">
      <Nav t={t} color="#2b1d14" font={SERIF} />
      <p className="absolute left-[3.5cqw] top-[9cqw] z-10 max-w-[30cqw] text-[1.7cqw] leading-[1.3]">{t.tagline}</p>
      <span className="absolute left-[3.5cqw] top-[16.5cqw] z-10 rounded-full bg-[#2b1d14] px-[2.2cqw] py-[1cqw] text-[1.35cqw] font-semibold text-[#f3ead8]">{t.button} →</span>

      {/* plate */}
      <div className="absolute right-[6cqw] top-[6.5cqw] size-[30cqw]" style={parallax(1.6)}>
        <div
          className="size-full rounded-full shadow-[0_2cqw_4cqw_-1cqw_rgba(43,29,20,.45)]"
          style={{
            animation: "wd-spin 26s linear infinite",
            background:
              "radial-gradient(circle at 34% 30%, #6f8f3a 0 4%, transparent 4.5%), radial-gradient(circle at 64% 40%, #6f8f3a 0 3%, transparent 3.5%), radial-gradient(circle at 46% 66%, #f7e7b4 0 6%, transparent 6.5%), radial-gradient(circle at 60% 58%, #c2401f 0 9%, transparent 9.5%), radial-gradient(circle at 38% 48%, #d8562f 0 11%, transparent 11.5%), radial-gradient(circle, #e9b16a 0 52%, #fffaf0 53% 70%, #e7dcc6 71% 100%)",
          }}
        />
      </div>
      <SpinBadge text={t.badge} size="12cqw" color="#b8442a" bg="#f3ead8" className="right-[31cqw] top-[24cqw] z-10" style={parallax(2.6)}>
        <span className="text-[2.6cqw] text-[#b8442a]">✺</span>
      </SpinBadge>

      {/* giant word */}
      <p
        className="absolute bottom-[4.2cqw] left-[2.5cqw] z-[5] text-[23cqw] font-semibold italic leading-[0.8] tracking-[-0.06em]"
        style={{ fontFamily: SERIF, ...parallax(-0.8) }}
      >
        {t.headline}
      </p>
      <span className="absolute bottom-[7cqw] right-[3.5cqw] z-10 text-[1.3cqw] uppercase tracking-[0.2em]">{t.meta}</span>

      <Marquee items={t.ticker} sep="✺" className="absolute inset-x-0 bottom-0 z-10 bg-[#b8442a] py-[0.9cqw] text-[1.6cqw] font-semibold uppercase tracking-[0.06em] text-[#f3ead8]" />
    </div>
  );
}

/* ——— Gym: outlined glitch type, heartbeat line, diagonal tape ——— */
function Gym({ t }: { t: Template }) {
  return (
    <div
      className="relative h-full overflow-hidden bg-[#0b0b0c] text-white"
      style={{ backgroundImage: "linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px)", backgroundSize: "5cqw 5cqw" }}
    >
      <Nav t={t} color="#ffffff" />
      <div className="absolute left-[3.5cqw] top-[9cqw] z-10 flex items-center gap-[1cqw] text-[1.4cqw] font-bold uppercase tracking-[0.14em] text-[#c6ff3d]">
        <span className="size-[1cqw] rounded-full bg-[#c6ff3d]" style={{ animation: "wd-blink 1s steps(2) infinite" }} />
        {t.meta}
      </div>

      {/* giant outlined + filled layers */}
      <div className="absolute left-[3cqw] top-[12cqw] z-[2]" style={parallax(-1.2)}>
        <p className="text-[21cqw] font-black italic leading-[0.85] tracking-[-0.05em] text-transparent [-webkit-text-stroke:0.25cqw_#c6ff3d]">{t.headline}</p>
        <p
          className="absolute inset-0 text-[21cqw] font-black italic leading-[0.85] tracking-[-0.05em] text-[#c6ff3d] mix-blend-screen [clip-path:inset(52%_0_0_0)]"
          style={{ animation: "wd-glitch 3.2s steps(1) infinite" }}
        >
          {t.headline}
        </p>
      </div>

      {/* heartbeat */}
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="absolute inset-x-0 top-[22cqw] z-[3] h-[9cqw] w-full" style={parallax(0.8)}>
        <path
          d="M0 30 H110 L120 30 L128 8 L138 52 L148 18 L156 30 H300"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeDasharray="300 300"
          style={{ animation: "wd-beat 1.8s linear infinite" }}
        />
      </svg>

      <div className="absolute bottom-[12cqw] right-[3.5cqw] z-10 max-w-[30cqw] text-right">
        <p className="text-[2.6cqw] font-black uppercase italic leading-[0.95]">{t.tagline}</p>
        <span className="mt-[1.6cqw] inline-block bg-[#c6ff3d] px-[2.2cqw] py-[1cqw] text-[1.35cqw] font-black uppercase text-black">{t.button} ↗</span>
      </div>

      <Marquee
        items={t.ticker}
        sep="✚"
        duration={8}
        className="absolute -left-[5%] bottom-[3.5cqw] z-10 w-[110%] -rotate-[3deg] bg-[#c6ff3d] py-[0.9cqw] text-[1.8cqw] font-black uppercase italic text-black"
      />
    </div>
  );
}

/* ——— Boutique: floating arches, blended editorial type ——— */
function Boutique({ t }: { t: Template }) {
  const arches = [
    { left: "34cqw", top: "9cqw", w: "15cqw", h: "27cqw", bg: "linear-gradient(170deg,#e9c9b4,#c98a9b)", delay: "0s", depth: 1.2 },
    { left: "52cqw", top: "5cqw", w: "18cqw", h: "34cqw", bg: "linear-gradient(170deg,#d7b9a0,#8e5f52)", delay: "-2s", depth: 2.2 },
    { left: "73cqw", top: "13cqw", w: "14cqw", h: "24cqw", bg: "linear-gradient(170deg,#f1dfd2,#b7a08f)", delay: "-4s", depth: 1.6 },
  ];
  return (
    <div className="relative h-full overflow-hidden bg-[#f4ece6] text-[#1d1a1a]">
      <Nav t={t} color="#1d1a1a" font={SERIF} />
      {arches.map((a) => (
        <div key={a.left} className="absolute" style={{ left: a.left, top: a.top, width: a.w, height: a.h, ...parallax(a.depth) }}>
          <div className="size-full rounded-t-full shadow-[0_1.5cqw_3cqw_-1cqw_rgba(29,26,26,.35)]" style={{ background: a.bg, animation: `wd-float 6s ease-in-out ${a.delay} infinite` }} />
        </div>
      ))}

      <p
        className="absolute bottom-[5.5cqw] left-[3cqw] z-[5] text-[25cqw] font-light italic leading-[0.8] tracking-[-0.07em] text-white mix-blend-difference"
        style={{ fontFamily: SERIF, ...parallax(-1) }}
      >
        {t.headline}
      </p>

      <p className="absolute left-[3.5cqw] top-[9cqw] z-10 max-w-[24cqw] text-[2.4cqw] italic leading-[1.05]" style={{ fontFamily: SERIF }}>{t.tagline}</p>
      <span className="absolute left-[3.5cqw] top-[17cqw] z-10 border-b border-[#1d1a1a] pb-[0.3cqw] text-[1.35cqw] font-semibold uppercase tracking-[0.14em]">{t.button}</span>
      <span className="absolute right-[1.6cqw] top-[16cqw] z-10 origin-right -rotate-90 text-[1.2cqw] uppercase tracking-[0.3em]">{t.meta}</span>

      <SpinBadge text={t.badge} size="11cqw" color="#1d1a1a" className="bottom-[8cqw] right-[5cqw] z-10" style={parallax(2.8)}>
        <span className="text-[2.4cqw]" style={{ fontFamily: SERIF }}>N</span>
      </SpinBadge>

      <Marquee items={t.ticker} sep="—" duration={20} className="absolute inset-x-0 bottom-0 z-10 border-t border-[#1d1a1a]/20 py-[0.9cqw] text-[1.4cqw] italic" style={{ fontFamily: SERIF }} />
    </div>
  );
}

/* ——— Startup: morphing gradient orb, glass UI card ——— */
function Startup({ t }: { t: Template }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#07070d] text-white">
      <Nav t={t} color="#ffffff" />
      <div className="absolute left-1/2 top-1/2 size-[34cqw] -translate-x-1/2 -translate-y-1/2" style={parallax(1.8)}>
        <div
          className="size-full blur-[1.2cqw]"
          style={{
            background: "conic-gradient(from 0deg, #3d8bff, #8b5cf6, #ec4899, #22d3ee, #3d8bff)",
            animation: "wd-spin 10s linear infinite, wd-blob 8s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 size-[44cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3d8bff] opacity-20 blur-[6cqw]" />

      <p className="absolute inset-x-0 top-[13cqw] z-[5] text-center text-[19cqw] font-semibold leading-[0.8] tracking-[-0.07em] mix-blend-overlay" style={parallax(-0.6)}>
        {t.headline}
      </p>

      {/* glass card */}
      <div
        className="absolute bottom-[8cqw] right-[4cqw] z-10 w-[24cqw] rounded-[1.4cqw] border border-white/20 bg-white/10 p-[1.6cqw] backdrop-blur-md"
        style={parallax(2.6)}
      >
        <div className="mb-[1.2cqw] flex items-center justify-between text-[1.2cqw] text-white/70">
          <span>{t.meta}</span>
          <span className="size-[0.9cqw] rounded-full bg-[#22d3ee]" style={{ animation: "wd-blink 1.4s steps(2) infinite" }} />
        </div>
        {[78, 52, 91].map((w, i) => (
          <div key={w} className="mb-[0.9cqw] h-[0.9cqw] rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-[#3d8bff] to-[#ec4899]" style={{ width: `${w}%`, animation: `wd-float ${3 + i}s ease-in-out infinite` }} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-[8cqw] left-[3.5cqw] z-10 max-w-[30cqw]">
        <p className="text-[2.4cqw] font-semibold leading-[1.05] tracking-[-0.02em]">{t.tagline}</p>
        <span className="mt-[1.4cqw] inline-block rounded-full bg-white px-[2.2cqw] py-[1cqw] text-[1.35cqw] font-semibold text-black">{t.button} →</span>
      </div>

      <Marquee items={t.ticker} sep="→" duration={16} className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 py-[0.9cqw] text-[1.3cqw] uppercase tracking-[0.2em] text-white/60" />
    </div>
  );
}

const LAYOUTS: Record<string, (props: { t: Template }) => ReactNode> = {
  restaurant: Restaurant,
  fitness: Gym,
  boutique: Boutique,
  startup: Startup,
};

function DesktopMockup({ templates, active }: { templates: Template[]; active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const my = ((e.clientY - r.top) / r.height) * 2 - 1;
    ref.current.style.setProperty("--mx", mx.toFixed(3));
    ref.current.style.setProperty("--my", my.toFixed(3));
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <div className="mx-auto w-full max-w-[780px] [perspective:1600px]" aria-hidden>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="transition-transform duration-300 ease-out"
        style={{ transform: "rotateY(calc(var(--mx, 0) * 5deg)) rotateX(calc(var(--my, 0) * -4deg))" } as CSSProperties}
      >
        {/* monitor */}
        <div className="rounded-[1.4rem] bg-[#1a1a1c] p-[1.6%] shadow-[0_50px_90px_-35px_rgba(0,0,0,0.55)] ring-1 ring-black/10">
          <div className="overflow-hidden rounded-[0.6rem] bg-white [container-type:inline-size]">
            {/* browser bar */}
            <div className="flex items-center gap-[1.2cqw] border-b border-black/10 bg-[#f1f1f3] px-[2cqw] py-[1.3cqw]">
              <span className="size-[1.3cqw] rounded-full bg-[#ff5f57]" />
              <span className="size-[1.3cqw] rounded-full bg-[#febc2e]" />
              <span className="size-[1.3cqw] rounded-full bg-[#28c840]" />
              <span className="ml-[2cqw] flex-1 rounded-full bg-white px-[2cqw] py-[0.6cqw] text-center text-[1.4cqw] text-black/45">
                {templates[active].url}
              </span>
            </div>
            <div className="relative aspect-[16/9] [&_*]:[transition:transform_.35s_cubic-bezier(.22,1,.36,1)]">
              {/* All templates stay mounted and stacked. The active one fades in on top;
                  the previous one waits until it's covered, so the screen is never blank. */}
              {templates.map((item, i) => {
                const Layout = LAYOUTS[item.id] ?? Restaurant;
                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
                    transition={{ opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i === active ? 0 : 0.6 }, zIndex: { duration: 0 } }}
                  >
                    <Layout t={item} />
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="h-[0.9rem]" />
        </div>
        {/* stand */}
        <div className="mx-auto h-16 w-[18%] bg-gradient-to-b from-[#c9c9cd] to-[#a9a9ae] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
        <div className="mx-auto h-2.5 w-[34%] rounded-full bg-[#b9b9be] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.4)]" />
      </div>
    </div>
  );
}

export function WebDesignShowcase({ t, ctaHref }: { t: Copy; ctaHref: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % t.templates.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, t.templates.length]);

  const template = t.templates[active];

  return (
    <div className="grid items-center gap-16 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.title}</h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-black/60">{t.body}</p>
        <ul className="mt-8 grid gap-3">
          {t.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-base text-black/75">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-[#3d8bff]" />
              {point}
            </li>
          ))}
        </ul>
        <a
          href={ctaHref}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#090909] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d8bff]"
        >
          {t.cta}
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
        </a>
      </div>

      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <DesktopMockup templates={t.templates} active={active} />
        <div role="tablist" aria-label={t.templatesLabel} className="mt-8 flex flex-wrap justify-center gap-2">
          {t.templates.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                i === active ? "border-black bg-black text-white" : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{`${template.label}: ${template.brand} — ${template.tagline}`}</p>
      </div>
    </div>
  );
}
