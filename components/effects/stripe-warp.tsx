"use client";

import { useEffect, useRef } from "react";

// A field of thin vertical stripes that ripple and shift color around the
// cursor — like light rippling across silk. Sits absolutely behind a
// section's content; no-ops on touch devices and reduced-motion.
export function StripeWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });

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

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    const spacing = 7;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      const { x: mx, y: my, active } = mouse.current;
      const targetIntensity = active ? 1 : 0;
      const fisheyeRadius = 220;

      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        // Each stripe gets its own phase so they don't all sway in lockstep
        // — reads as loose fronds drifting in a current rather than a
        // uniform wobble.
        const phase = x * 0.013;
        for (let y = 0; y <= height; y += 8) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const falloff = Math.exp(-dist / 180) * targetIntensity;
          const ripple = Math.sin(dist * 0.06 - t * 3) * 14 * falloff;

          // Fisheye: a lens-like bulge that pushes the stripe radially away
          // from the cursor, strongest a little outside the very center.
          const fisheyeFalloff = Math.exp(-dist / fisheyeRadius) * targetIntensity;
          const dxNorm = dist > 0.001 ? dx / dist : 0;
          const fisheye = dxNorm * fisheyeFalloff * 46;

          // Always-on ambient sway — slow, layered sines at different
          // frequencies per point, like a sea plant swaying in current.
          const sway =
            Math.sin(y * 0.01 + t * 0.7 + phase) * 7 +
            Math.sin(y * 0.023 - t * 0.4 + phase * 1.7) * 3.5;

          const px = x + ripple + fisheye + sway;
          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        const hueMix = Math.sin(x * 0.01 + t * 0.5) * 0.5 + 0.5;
        const r = Math.round(61 + hueMix * 40);
        const g = Math.round(139 + hueMix * 60);
        const b = 255;
        const baseAlpha = 0.09;
        const nearMouse = Math.exp(-Math.abs(x - mx) / 220) * targetIntensity;
        ctx.strokeStyle = `rgba(${r},${g},${b},${baseAlpha + nearMouse * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
