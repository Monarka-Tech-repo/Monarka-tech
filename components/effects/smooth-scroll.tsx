"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Wraps the page in Lenis's inertia-based smooth scroll — the same effect
// used by most award-site agency portfolios. No-ops for users who prefer
// reduced motion; native scroll still works exactly the same either way.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
