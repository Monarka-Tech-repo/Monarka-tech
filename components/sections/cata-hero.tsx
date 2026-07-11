"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CircuitBackground } from "@/components/effects/circuit-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CataHero() {
  return (
    <section
      id="top"
      className="relative z-[1] flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 md:px-12"
    >
      <CircuitBackground accentColor="#e8633e" />

      <div className="relative z-[1] mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.4em] text-brand-teal">
            <span className="h-px w-6 bg-brand-teal" />
            App Insignia · Monarka TECH
          </p>
          <div className="mb-5">
            <Image
              src="/assets/cata/cata-logo.png"
              alt="CATA — Dining Journal"
              width={300}
              height={96}
              className="w-full max-w-[300px]"
              style={{ filter: "drop-shadow(0 0 32px rgba(232,99,62,.4))" }}
            />
          </div>
          <h1 className="mb-4 text-[clamp(1.7rem,3.2vw,2.8rem)] font-bold leading-[1.18] text-white">
            Cada platillo,
            <br />
            <span className="font-heading text-[0.88em] text-accent">
              una historia
            </span>{" "}
            por descubrir.
          </h1>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-brand-gold">
            Taste · Collect · Share
          </p>
          <p className="mb-8 max-w-[480px] text-base leading-[1.85] text-muted-foreground">
            CATA es el diario social para quienes viven la gastronomía:
            registra cada platillo que pruebas, descubre lo que se come en
            tu ciudad, crea Food Journeys de tus viajes y conecta con
            comunidades de foodies — todo desde una sola app.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#comensales"
              className={cn(
                buttonVariants(),
                "rounded font-heading text-[10px] font-bold tracking-[0.18em] uppercase shadow-[0_0_30px_rgba(232,99,62,.25)]"
              )}
            >
              Para Comensales
            </Link>
            <Link
              href="#restaurantes"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded border-border-2 font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-accent"
              )}
            >
              Para Restaurantes
            </Link>
          </div>
        </div>

        <div className="relative hidden h-[520px] md:block">
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 z-[3] w-[280px] overflow-hidden rounded-xl border border-border bg-surface-1 shadow-[0_24px_64px_rgba(0,0,0,.55)]"
          >
            <div className="relative h-[160px] w-full">
              <Image src="/assets/cata/dish-1.jpg" alt="Platillo" fill sizes="280px" className="object-cover" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red font-heading text-[9px] font-bold text-white">
                  AM
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">Ana Martínez</div>
                  <div className="text-[10px] text-muted-foreground">Ciudad de México</div>
                </div>
              </div>
              <div className="mb-1.5 text-xs text-brand-gold">★★★★★</div>
              <div className="flex gap-4 text-[10px] text-muted-foreground">
                <span>♥ 248</span>
                <span>💬 32</span>
                <span>🔖 Guardar</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0.7, -0.7, 0.7] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute bottom-[35px] left-0 z-[4] w-[225px] overflow-hidden rounded-xl border border-border bg-surface-1 shadow-[0_24px_64px_rgba(0,0,0,.55)]"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="font-heading text-[10px] font-bold tracking-[0.1em] text-accent">
                LEADERBOARD
              </span>
              <span className="text-[10px] text-muted-foreground">El Paso · Mes</span>
            </div>
            <div className="space-y-0 p-2">
              {[
                { rank: "1", initials: "AM", name: "Ana M.", count: "34", gold: true, bg: "#FAECE7", color: "#712B13" },
                { rank: "2", initials: "TÚ", name: "tú ↑", count: "12", me: true, bg: "var(--brand-red)", color: "#fff" },
                { rank: "3", initials: "CR", name: "Carlos R.", count: "11", bg: "#E1F5EE", color: "#085041" },
              ].map((row) => (
                <div
                  key={row.rank}
                  className={cn(
                    "flex items-center gap-2.5 border-b border-border px-1 py-2 last:border-none",
                    row.me && "bg-accent/[0.07]"
                  )}
                >
                  <span className={cn("w-4 font-heading text-xs font-black", row.gold ? "text-brand-gold" : "text-muted-foreground")}>
                    {row.rank}
                  </span>
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-heading text-[8px] font-bold"
                    style={{ background: row.bg, color: row.color }}
                  >
                    {row.initials}
                  </div>
                  <span className="flex-1 text-xs font-bold text-white">{row.name}</span>
                  <span className={cn("font-heading text-xs font-bold", row.gold ? "text-brand-gold" : "text-foreground")}>
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute left-[35px] top-[55px] z-[5] w-[205px] rounded-xl border border-border bg-surface-1 p-4 shadow-[0_24px_64px_rgba(0,0,0,.55)]"
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span className="rounded-full bg-brand-red px-2.5 py-0.5 font-heading text-[9px] font-bold tracking-[0.1em] text-white">
                BADGES
              </span>
            </div>
            <div className="mb-1 text-sm leading-snug text-foreground">🏅 Foodie Elite</div>
            <div className="text-[10px] text-muted-foreground">
              25 platillos de 5 estrellas registrados
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
