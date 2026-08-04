"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Full-screen intro before the page reveals itself: the Dream Big seal
// (same mark used in the marquee/favicon) spins inside pulsing rings,
// then the whole overlay closes into a circle at its center and vanishes
// — an iris-wipe reveal built entirely out of circles.
export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip the intro entirely for reduced-motion users, one-time check on mount
      setLoading(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505]"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex h-36 w-36 items-center justify-center">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[#3d8bff]/40"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[#3d8bff]/30"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
            />
            <motion.img
              src="/icon.png"
              alt="Monarka"
              className="relative h-20 w-20"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
