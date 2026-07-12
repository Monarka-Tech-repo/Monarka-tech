import { seedMyMenu } from "@/content/demo";

export function DemoProfile({ dishCount }: { dishCount: number }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex flex-col items-center px-4 pb-6 pt-8 text-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white">
          TÚ
        </div>
        <div className="mb-1 font-heading text-lg font-semibold text-foreground">
          Invitado Demo
        </div>
        <div className="mb-4 text-[11px] text-muted-foreground">
          El Paso, TX · probando CATA
        </div>
        <div className="grid w-full grid-cols-3 divide-x divide-border rounded-xl border border-border bg-card">
          <div className="p-3 text-center">
            <div className="font-heading text-lg font-semibold text-accent">
              {dishCount}
            </div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              Platillos
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="font-heading text-lg font-semibold text-accent">
              128
            </div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              Seguidores
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="font-heading text-lg font-semibold text-accent">
              #3
            </div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              El Paso
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 px-3 pb-3">
        {seedMyMenu.map((entry) => (
          <div
            key={entry.id}
            className="aspect-square overflow-hidden rounded-lg bg-secondary"
            style={{
              backgroundImage: entry.image ? `url(${entry.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}
