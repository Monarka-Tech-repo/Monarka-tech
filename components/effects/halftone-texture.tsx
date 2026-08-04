"use client";

import { useEffect, useRef } from "react";

// A halftone dot-grid texture — dot size/opacity follows a slow-drifting
// soft field (layered sines standing in for noise), like a print halftone
// of a soft cloudy gradient. Sits absolutely behind a section's content.
export function HalftoneTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spacing = 13;
    const maxRadius = spacing * 0.42;
    let raf = 0;
    let t = 0;

    const field = (x: number, y: number) => {
      const v =
        Math.sin(x * 0.006 + t * 0.15) * Math.cos(y * 0.007 - t * 0.12) +
        Math.sin(x * 0.014 - y * 0.01 + t * 0.2) * 0.6 +
        Math.sin((x + y) * 0.004 + t * 0.08) * 0.5;
      return (v + 2.1) / 4.2; // normalize roughly to 0..1
    };

    const draw = () => {
      t += 0.35;
      ctx.clearRect(0, 0, width, height);

      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const v = Math.min(Math.max(field(x, y), 0), 1);
          const radius = v * maxRadius;
          if (radius < 0.4) continue;

          // Blend from near-white (soft/light tonal areas) to a deeper
          // blue (dense/dark tonal areas), matching a print halftone's
          // range from highlight to shadow.
          const light = v < 0.5 ? v * 2 : 1;
          const dark = v >= 0.5 ? (v - 0.5) * 2 : 0;
          const r = Math.round(255 - dark * 214);
          const g = Math.round(255 - dark * 186);
          const b = 255;
          const alpha = 0.12 + light * 0.18 + dark * 0.35;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
