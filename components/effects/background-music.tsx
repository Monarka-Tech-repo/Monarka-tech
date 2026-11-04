"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AUDIO_FOCUS_EVENT, type AudioFocusDetail } from "@/lib/audio-focus";

// Music starts and stops on a direct click of the toggle button — a mouse
// click is itself a valid user gesture, so it can start playing with sound
// immediately, no separate "unmute" step needed. The choice is remembered
// across visits via localStorage.
export function BackgroundMusic({ labels }: { labels: { on: string; off: string } }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Starts muted (matches server-rendered HTML, avoids a hydration
  // mismatch); synced from localStorage right after mount, client-only.
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from a client-only store (localStorage) right after mount, not a render loop
    if (localStorage.getItem("monarka-music-muted") === "false") setMuted(false);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.35;
  }, []);

  // True while a foreground player (Studio 3D audio) is playing. Doesn't touch
  // the visitor's saved preference; music resumes when the other audio stops.
  const [ducked, setDucked] = useState(false);

  useEffect(() => {
    const onFocus = (e: Event) => setDucked((e as CustomEvent<AudioFocusDetail>).detail.active);
    window.addEventListener(AUDIO_FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(AUDIO_FOCUS_EVENT, onFocus);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted || ducked) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [muted, ducked]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem("monarka-music-muted", String(next));
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/audio/espectro.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? labels.on : labels.off}
        aria-pressed={!muted}
        className="fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/80"
      >
        {muted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}
      </button>
    </>
  );
}
