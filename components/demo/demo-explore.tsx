"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { exploreDishes } from "@/content/demo";

export function DemoExplore() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Buscar platillos, restaurantes...
          </span>
        </div>
      </div>
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
    </div>
  );
}
