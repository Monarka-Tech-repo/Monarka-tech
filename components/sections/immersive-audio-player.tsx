"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { AUDIO_FOCUS_EVENT, type AudioFocusDetail } from "@/lib/audio-focus";

type Copy = Dictionary["studio"]["listen"];

type Graph = {
  ctx: AudioContext;
  spectrum: AnalyserNode;
  left: AnalyserNode;
  right: AnalyserNode;
};

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function rms(analyser: AnalyserNode, buf: Float32Array<ArrayBuffer>) {
  analyser.getFloatTimeDomainData(buf);
  let sum = 0;
  for (const v of buf) sum += v * v;
  return Math.sqrt(sum / buf.length);
}

const BARS = 72;

/** Draws the radial bars; `level(i)` returns 0..1 for bar i. */
function paintRing(canvas: HTMLCanvasElement, level: (i: number) => number) {
  const g = canvas.getContext("2d");
  if (!g) return;
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.clientWidth;
  if (!size) return;
  if (canvas.width !== Math.round(size * dpr)) canvas.width = canvas.height = Math.round(size * dpr);
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, size, size);
  const cx = size / 2;
  const inner = size * 0.3;
  g.lineWidth = Math.max(2, size * 0.008);
  g.lineCap = "round";
  for (let i = 0; i < BARS; i++) {
    const v = level(i);
    const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2;
    const len = 4 + v * size * 0.17;
    g.strokeStyle = `hsla(${215 + v * 70}, 100%, ${60 + v * 15}%, ${0.35 + v * 0.65})`;
    g.beginPath();
    g.moveTo(cx + Math.cos(angle) * inner, cx + Math.sin(angle) * inner);
    g.lineTo(cx + Math.cos(angle) * (inner + len), cx + Math.sin(angle) * (inner + len));
    g.stroke();
  }
}

/** Resting state: a soft, gently varying ring so the visual isn't empty before play. */
function paintIdle(canvas: HTMLCanvasElement) {
  paintRing(canvas, (i) => 0.06 + 0.05 * Math.sin(i * 0.7) ** 2);
}

export function ImmersiveAudioPlayer({ t, src }: { t: Copy; src: { m4a: string; mp3: string } }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Built on first play: browsers only allow an AudioContext after a user gesture.
  const ensureGraph = useCallback(() => {
    if (graphRef.current || !audioRef.current) return graphRef.current;
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioRef.current);
    const spectrum = ctx.createAnalyser();
    spectrum.fftSize = 256;
    spectrum.smoothingTimeConstant = 0.8;
    const splitter = ctx.createChannelSplitter(2);
    const left = ctx.createAnalyser();
    const right = ctx.createAnalyser();
    left.fftSize = right.fftSize = 1024;
    source.connect(ctx.destination);
    source.connect(spectrum);
    source.connect(splitter);
    splitter.connect(left, 0);
    splitter.connect(right, 1);
    graphRef.current = { ctx, spectrum, left, right };
    return graphRef.current;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph) return;
    const freq = new Uint8Array(graph.spectrum.frequencyBinCount);
    const timeBuf = new Float32Array(graph.left.fftSize);
    let pan = 0;

    const frame = () => {
      graph.spectrum.getByteFrequencyData(freq);
      // Bars mirrored around the circle (low frequencies at top and bottom).
      paintRing(canvas, (i) => freq[Math.floor(((i < BARS / 2 ? i : BARS - i) / (BARS / 2)) * freq.length * 0.7)] / 255);

      // Left/right balance -> dot position (shows the sound moving between ears).
      const l = rms(graph.left, timeBuf);
      const r = rms(graph.right, timeBuf);
      const target = l + r > 0.002 ? (r - l) / (r + l) : 0;
      pan += (target - pan) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.left = `${50 + pan * 46}%`;
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${1 + Math.min(1, (l + r) * 4)})`;
      }

      rafRef.current = requestAnimationFrame(frame);
    };
    cancelAnimationFrame(rafRef.current);
    frame();
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const graph = ensureGraph();
      await graph?.ctx.resume();
      try {
        await audio.play();
      } catch {
        // Playback blocked or failed; leave the UI in the paused state.
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent<AudioFocusDetail>(AUDIO_FOCUS_EVENT, { detail: { active: true } }));
      draw();
    };
    const onPause = () => {
      setPlaying(false);
      if (canvasRef.current) paintIdle(canvasRef.current);
      window.dispatchEvent(new CustomEvent<AudioFocusDetail>(AUDIO_FOCUS_EVENT, { detail: { active: false } }));
      cancelAnimationFrame(rafRef.current);
    };
    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    // Metadata may have loaded before hydration attached the listener.
    if (audio.readyState >= 1) setDuration(audio.duration);
    const repaintIdle = () => audio.paused && canvasRef.current && paintIdle(canvasRef.current);
    repaintIdle();
    window.addEventListener("resize", repaintIdle);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("resize", repaintIdle);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  useEffect(() => () => void graphRef.current?.ctx.close(), []);

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]">{t.title}</h2>
        <p className="mt-8 max-w-lg text-lg leading-8 text-white/60">{t.body}</p>
        <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80">
          <Headphones aria-hidden className="size-5 text-[#3d8bff]" />
          {t.headphones}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[520px]">
        {/* visualizer + play button */}
        <div className="relative aspect-square">
          <div
            aria-hidden
            className={`absolute inset-[22%] rounded-full bg-[#3d8bff] blur-3xl transition-opacity duration-700 ${playing ? "opacity-40" : "opacity-15"}`}
          />
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? t.pause : t.play}
            aria-pressed={playing}
            className="absolute left-1/2 top-1/2 grid size-[36%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_20px_60px_-15px_rgba(61,139,255,.8)] transition-transform hover:scale-105 active:scale-95"
          >
            {!playing && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.4s]" />}
            {playing ? <Pause aria-hidden className="size-[34%]" /> : <Play aria-hidden className="ml-[6%] size-[34%]" />}
          </button>
        </div>

        {/* stereo position */}
        <div className="mt-6" aria-hidden>
          <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
            <span>{t.left}</span>
            <span>{t.right}</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-gradient-to-r from-[#3d8bff]/40 via-white/10 to-[#ec4899]/40">
            <span
              ref={dotRef}
              className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(61,139,255,.7)] transition-[transform] duration-75"
            />
          </div>
        </div>

        {/* track + seek */}
        <div className="mt-8">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <p className="text-sm font-semibold">{t.trackTitle}</p>
            <p className="font-mono text-xs tabular-nums text-white/50">
              {formatTime(time)} / {formatTime(duration)}
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Number(e.target.value);
              setTime(Number(e.target.value));
            }}
            aria-label={t.seek}
            aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-[#3d8bff]"
            style={{ background: `linear-gradient(to right, #3d8bff ${progress}%, rgba(255,255,255,.15) ${progress}%)` }}
          />
        </div>

        <audio ref={audioRef} preload="metadata">
          <source src={src.m4a} type="audio/mp4" />
          <source src={src.mp3} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
