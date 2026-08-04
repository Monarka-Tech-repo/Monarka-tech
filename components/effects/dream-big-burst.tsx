"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  rotate: number;
};

let particleId = 0;

// The Dream Big seal as a pressable button — each press throws a burst of
// smaller copies of itself outward, spinning and fading as they fly.
// `size` scales the button and its burst radius/particle sizes together,
// so the same effect works both small (nav bar) and large (footer).
export function DreamBigBurst({ size = 64 }: { size?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scale = size / 64;
  const stageSize = size * 1.5;

  const burst = () => {
    const count = 10 + Math.floor(Math.random() * 4);
    const next: Particle[] = Array.from({ length: count }, () => ({
      id: ++particleId,
      angle: Math.random() * Math.PI * 2,
      distance: (90 + Math.random() * 130) * scale,
      size: (16 + Math.random() * 22) * scale,
      duration: 0.7 + Math.random() * 0.5,
      rotate: (Math.random() - 0.5) * 480,
    }));
    setParticles((prev) => [...prev, ...next]);
    const t = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !next.some((n) => n.id === p.id)));
    }, 1300);
    timeouts.current.push(t);
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: stageSize, width: stageSize }}>
      {particles.map((p) => (
        <motion.img
          key={p.id}
          src="/icon.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute"
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 1,
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.button
        type="button"
        onClick={burst}
        aria-label="Monarka — Dream Big"
        whileTap={{ scale: 0.85 }}
        className="relative z-[1] rounded-full"
        style={{ height: size, width: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative pressable mark, not worth next/image's fixed-layout overhead */}
        <img src="/icon.png" alt="" className="h-full w-full" />
      </motion.button>
    </div>
  );
}
