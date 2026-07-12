import Image from "next/image";
import type { MenuEntry } from "@/content/demo";

export function DemoMyMenu({ entries }: { entries: MenuEntry[] }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <span className="text-[13px] font-bold text-foreground">My Menu</span>
        <span className="ml-2 text-[11px] text-muted-foreground">
          {entries.length} platillos
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {entries.map((entry) => (
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
                {"★".repeat(entry.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
