"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type RenderItem = {
  slug: string;
  title: string;
  material: string;
  motion: string;
};

type RenderShowcaseCopy = {
  eyebrow: string;
  title: string;
  body: string;
  play: string;
  pause: string;
  items: readonly RenderItem[];
};

// One looping Blender render. Plays only while on screen, and never
// autoplays for visitors who ask for reduced motion (they can press play).
function RenderCard({ item, play, pause }: { item: RenderItem; play: string; pause: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced || userPaused) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced, userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <figure className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
      <div className="relative aspect-square">
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          src={`/assets/renders/${item.slug}.mp4`}
          poster={`/assets/renders/${item.slug}.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={item.title}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? pause : play}: ${item.title}`}
          className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-[#3d8bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
        </button>
      </div>
      <figcaption className="p-6 md:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3d8bff]">{item.material}</p>
        <h3 className="mt-3 text-2xl font-medium leading-[1] tracking-[-0.04em] md:text-3xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">{item.motion}</p>
      </figcaption>
    </figure>
  );
}

export function RenderShowcase({ t }: { t: RenderShowcaseCopy }) {
  return (
    <div>
      <div className="mb-14 max-w-2xl">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.title}</h2>
        <p className="mt-6 text-lg leading-8 text-white/60">{t.body}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {t.items.map((item) => (
          <RenderCard key={item.slug} item={item} play={t.play} pause={t.pause} />
        ))}
      </div>
    </div>
  );
}
