"use client";

import { useState } from "react";
import Image from "next/image";
import { IconSearch } from "@/components/demo/cata-icons";
import { exploreDishes } from "@/content/demo";
import { cn } from "@/lib/utils";

// Matches the real Explore screen's tabs exactly (es.json explore.tab_*)
const tabs = [
  { key: "forYou", label: "Para ti" },
  { key: "leaderboard", label: "Ranking" },
  { key: "community", label: "Comunidad" },
  { key: "feed", label: "Feed" },
  { key: "friends", label: "Amigos" },
] as const;

const miniLeaderboard = [
  { rank: 1, initials: "AM", name: "Ana M.", count: 34 },
  { rank: 2, initials: "TÚ", name: "tú", count: 12 },
  { rank: 3, initials: "CR", name: "Carlos R.", count: 11 },
];

export function DemoExplore() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("forYou");

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 pb-2 pt-3 backdrop-blur">
        <div className="mb-2.5 flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2">
          <IconSearch className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Busca platos, restaurantes, personas...
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "shrink-0 pb-1.5 text-[11px] font-semibold transition-colors",
                tab === t.key
                  ? "border-b-2 border-accent text-accent"
                  : "text-muted-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "forYou" ? (
        <div className="grid grid-cols-2 gap-2 p-3">
          {exploreDishes.map((dish) => (
            <button
              key={dish.id}
              type="button"
              className="group overflow-hidden rounded-xl border border-border bg-card text-left transition-transform active:scale-[0.97]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform group-active:scale-105"
                />
              </div>
              <div className="p-2">
                <div className="truncate text-[11px] font-semibold text-foreground">
                  {dish.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : tab === "leaderboard" ? (
        <div className="p-3">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {miniLeaderboard.map((row) => (
              <div
                key={row.rank}
                className={cn(
                  "flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-none",
                  row.name === "tú" && "bg-accent/[0.06]"
                )}
              >
                <span className="w-4 text-xs font-bold text-muted-foreground">
                  {row.rank}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-foreground">
                  {row.initials}
                </div>
                <span className="flex-1 text-xs font-semibold text-foreground">
                  {row.name}
                </span>
                <span className="text-xs font-bold text-brand-gold">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
          <p className="text-xs text-muted-foreground">
            Esta sección se ve completa dentro de la app — la demo web
            muestra Para ti y Ranking.
          </p>
        </div>
      )}
    </div>
  );
}
