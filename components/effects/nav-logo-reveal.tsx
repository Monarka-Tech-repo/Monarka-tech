"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DreamBigBurst } from "@/components/effects/dream-big-burst";

// The nav bar's Dream Big mark stays out of the way at the very top of the
// page (right where the loading screen's big version was just sitting),
// then hops into place in the nav once the visitor starts scrolling down —
// a light echo of the intro animation rather than being there from frame one.
export function NavLogoReveal({ size = 34 }: { size?: number }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setRevealed(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ width: size * 1.5, height: size * 1.5 }} className="flex items-center justify-center">
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ y: -36, opacity: 0, scale: 0.4 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 14 }}
          >
            <DreamBigBurst size={size} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
