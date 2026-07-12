"use client";

import { useState } from "react";
import Image from "next/image";
import { menuCategories, type MenuEntry } from "@/content/demo";
import { cn } from "@/lib/utils";

// Category pill: dark noir capsule, active = red — matches MyMenuScreen.js's
// `pill` StyleSheet exactly (backgroundColor: colors.noir / colors.red,
// borderRadius: 999, text in the Fraunces italic display font).
export function DemoMyMenu({ entries }: { entries: MenuEntry[] }) {
  const [category, setCategory] = useState<(typeof menuCategories)[number]>("Todos");
  const filtered =
    category === "Todos" ? entries : entries.filter((e) => e.category === category);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <span className="text-[13px] font-bold text-foreground">My Menu</span>
        <span className="ml-2 text-[11px] text-muted-foreground">
          {entries.length} platillos
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto px-3 pb-1 pt-3">
        {menuCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 font-heading text-[13px] italic transition-colors",
              cat === category
                ? "bg-accent text-white"
                : "bg-[#1a1a18] text-[#F0EBE3]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-square w-full">
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(135deg, ${entry.paletteFrom}, ${entry.paletteTo})`,
                  }}
                />
              )}
            </div>
            <div className="p-2">
              <div className="truncate text-[11px] font-semibold text-foreground">
                {entry.name}
              </div>
              <div className="text-[10px] text-brand-gold">
                {"★".repeat(Math.round(entry.rating))}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 py-8 text-center text-xs text-muted-foreground">
            Nada en esta categoría todavía.
          </p>
        )}
      </div>
    </div>
  );
}
