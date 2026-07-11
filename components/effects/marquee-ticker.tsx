export function MarqueeTicker({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`group relative overflow-hidden border-y border-border ${className ?? ""}`}
    >
      <div className="animate-marquee group-hover:[animation-play-state:paused] flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {track.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-3 px-10 py-3 text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
