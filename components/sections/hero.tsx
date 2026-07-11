"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,99,62,.08) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] right-[-5%] h-[40vh] w-[40vw] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(239,159,39,.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Monarka TECH &nbsp;·&nbsp; El Paso, TX
          </div>
          <h1 className="mb-7 text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
            Every dish,
            <br />
            a story worth
            <br />
            <em className="not-italic text-accent italic">keeping.</em>
          </h1>
          <p className="mx-auto mb-10 max-w-[440px] text-[clamp(0.9375rem,1.5vw,1.125rem)] leading-relaxed text-muted-foreground md:mx-0">
            Presentamos CATA — el diario gastronómico social diseñado para
            quienes viven para comer.
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link
              href="/products/cata"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-accent text-accent-foreground hover:bg-accent/90")}
            >
              Conoce CATA
            </Link>
            <Link
              href="/contact"
              className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Lista de Espera →
            </Link>
          </div>
          <p className="font-mono text-xs tracking-wide text-muted-foreground/50">
            COMING SOON &nbsp;·&nbsp; iOS &amp; ANDROID
          </p>
        </motion.div>

        <div className="relative hidden h-[540px] items-center justify-center md:flex">
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0.8, -0.5, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-[2] w-[240px] rounded-[38px] border border-border-2 bg-surface-2 p-[9px] shadow-[0_40px_100px_rgba(0,0,0,.7)]"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[29px] bg-surface-3">
              <Image
                src="/assets/cata/dish-4.jpg"
                alt="CATA App"
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col">
                <div className="flex justify-between bg-gradient-to-b from-black/60 to-transparent px-3.5 pb-1 pt-2.5">
                  <span className="text-[9px] font-bold text-white">9:41</span>
                  <span className="text-[9px] font-bold text-white">●●●</span>
                </div>
                <div className="mt-auto space-y-1.5 p-2.5">
                  <div className="rounded-[10px] border border-white/15 bg-white/10 p-2.5 backdrop-blur-md">
                    <div className="mb-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/50">
                      Log Dish
                    </div>
                    <div className="mb-1 text-[11px] font-bold text-white">
                      Wagyu A5 Tostada
                    </div>
                    <span className="inline-block rounded bg-brand-gold/20 px-1.5 py-px text-[8px] font-bold text-brand-gold">
                      ★★★★★
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="flex-1 rounded-[7px] border border-white/10 bg-white/10 py-1.5 text-center text-[7.5px] font-semibold uppercase tracking-wide text-white">
                      Guardar
                    </div>
                    <div className="flex-1 rounded-[7px] border border-white/10 bg-white/10 py-1.5 text-center text-[7.5px] font-semibold uppercase tracking-wide text-white">
                      Compartir
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[-2%] top-[8%] z-[3] rounded-2xl border border-border-2 bg-surface-2 px-3.5 py-3 shadow-[0_16px_40px_rgba(0,0,0,.5)]"
          >
            <div className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
              Leaderboard
            </div>
            <div className="text-[17px] font-extrabold tracking-tight">#3</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground/60">
              en El Paso · este mes
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[12%] left-[-2%] z-[3] rounded-2xl border border-border-2 bg-surface-2 px-3.5 py-3 shadow-[0_16px_40px_rgba(0,0,0,.5)]"
          >
            <div className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
              Food Journey
            </div>
            <div className="text-[17px] font-extrabold tracking-tight">12</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground/60">
              platillos · El Paso → Austin
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
