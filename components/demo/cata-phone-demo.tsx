"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Home, Camera, LayoutGrid, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneStatusBar, PhoneHomeIndicator } from "@/components/demo/phone-chrome";
import { DemoFeed } from "@/components/demo/demo-feed";
import { DemoExplore } from "@/components/demo/demo-explore";
import { DemoLog } from "@/components/demo/demo-log";
import { DemoMyMenu } from "@/components/demo/demo-my-menu";
import { DemoProfile } from "@/components/demo/demo-profile";
import { seedMyMenu, cardPalettes, type MenuEntry } from "@/content/demo";

type Tab = "explore" | "feed" | "log" | "mymenu" | "profile";

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: "explore", label: "Explore", icon: Compass },
  { key: "feed", label: "Feed", icon: Home },
  { key: "log", label: "Log", icon: Camera },
  { key: "mymenu", label: "My Menu", icon: LayoutGrid },
  { key: "profile", label: "Perfil", icon: User },
];

export function CataPhoneDemo() {
  const [tab, setTab] = useState<Tab>("feed");
  const [menuEntries, setMenuEntries] = useState<MenuEntry[]>(seedMyMenu);

  function handleSaveDish(name: string, rating: number) {
    const palette = cardPalettes[menuEntries.length % cardPalettes.length];
    setMenuEntries((prev) => [
      {
        id: `logged-${Date.now()}`,
        name,
        rating,
        paletteFrom: palette[0],
        paletteTo: palette[1],
      },
      ...prev,
    ]);
  }

  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center">
      <div
        className="relative flex h-[620px] w-[300px] flex-col overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_40px_90px_rgba(30,20,10,.22)]"
        style={{ borderColor: "#1a1a18", background: "var(--background)" }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl"
          style={{ background: "#1a1a18" }}
        />
        <PhoneStatusBar />

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              {tab === "feed" && <DemoFeed />}
              {tab === "explore" && <DemoExplore />}
              {tab === "log" && <DemoLog onSave={handleSaveDish} />}
              {tab === "mymenu" && <DemoMyMenu entries={menuEntries} />}
              {tab === "profile" && (
                <DemoProfile dishCount={menuEntries.length} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex items-center justify-around border-t border-border bg-background px-2 pt-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            const isLog = t.key === "log";
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-label={t.label}
                className="flex flex-1 flex-col items-center gap-1 py-1"
              >
                {isLog ? (
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                      active
                        ? "bg-accent text-white"
                        : "bg-accent/85 text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ) : (
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active ? "text-accent" : "text-muted-foreground"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
        <PhoneHomeIndicator />
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Demo interactiva — sin necesidad de descargar ni iniciar sesión.
      </p>
    </div>
  );
}
