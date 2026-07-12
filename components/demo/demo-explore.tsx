"use client";

import { useState } from "react";
import Image from "next/image";
import { IconSearch, IconLike, IconComments, IconSave } from "@/components/demo/cata-icons";
import { exploreDishes, feedPosts } from "@/content/demo";
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

      {tab === "forYou" && (
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
      )}

      {tab === "leaderboard" && (
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
      )}

      {/* Explore's "Feed" tab is the vertical post-with-engagement pattern
          (feedPostUserName / feedLikeCount / view_comments in
          ExploreScreen.js) — distinct from the home Feed screen's
          horizontal dashboard sections. */}
      {tab === "feed" && (
        <div className="flex flex-col gap-3 p-3">
          {feedPosts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-2.5 p-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ background: post.avatarBg, color: post.avatarColor }}
                >
                  {post.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold text-foreground">
                    {post.name}
                  </div>
                  <div className="truncate text-[10.5px] text-muted-foreground">
                    {post.location}
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={post.image}
                  alt={post.dish}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="mb-1 text-[13px] font-semibold text-foreground">
                  {post.dish}
                </div>
                <div className="mb-2 text-xs text-brand-gold">
                  {"★".repeat(post.rating)}
                  <span className="text-border-2">{"★".repeat(5 - post.rating)}</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 text-[11px]">
                    <IconLike className="h-4 w-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <IconComments className="h-4 w-4" /> {post.comments}
                  </span>
                  <IconSave className="ml-auto h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(tab === "community" || tab === "friends") && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
          <p className="text-xs text-muted-foreground">
            Esta sección se ve completa dentro de la app.
          </p>
        </div>
      )}
    </div>
  );
}
