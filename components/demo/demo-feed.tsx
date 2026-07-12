// Mirrors the real FeedScreen.js structure exactly: a stack of horizontally
// scrolling sections under underlined small-caps headers (SectionCaps), not
// a vertical Instagram-style post feed — see src/screens/FeedScreen.js
// cases 'friends' / 'restaurants' / 'most_visited' / 'favorites', and the
// exact storyRing/photoCard dimensions in its StyleSheet (s.storyRing:
// 84x84, s.storyImg: 74x74, s.photoCard: 120x82).
import Image from "next/image";
import { feedPosts, restaurantStories, mostVisited, favorites } from "@/content/demo";

function SectionCaps({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-foreground underline decoration-1 underline-offset-2">
      {children}
    </span>
  );
}

function StoryBubble({
  initials,
  image,
  ringColor,
  label,
}: {
  initials: string;
  image?: string;
  ringColor: string;
  label: string;
}) {
  return (
    <div className="flex w-[68px] shrink-0 flex-col items-center gap-1">
      <div
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[2.5px] p-[2px]"
        style={{ borderColor: ringColor }}
      >
        {image ? (
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image src={image} alt={label} fill sizes="58px" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
            {initials}
          </div>
        )}
      </div>
      <span className="max-w-full truncate text-[9.5px] text-foreground">{label}</span>
    </div>
  );
}

export function DemoFeed() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <span className="font-heading text-lg italic text-accent">CATA</span>
      </div>

      {/* case 'friends' */}
      <div className="pb-1.5 pt-4">
        <div className="mb-2 px-4">
          <SectionCaps>Amigos</SectionCaps>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          <div className="flex w-[68px] shrink-0 flex-col items-center gap-1">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[2.5px] border-border">
              <span className="text-xl leading-none text-muted-foreground">+</span>
            </div>
            <span className="text-[9.5px] text-foreground">Tu historia</span>
          </div>
          {feedPosts.map((f) => (
            <StoryBubble
              key={f.id}
              initials={f.initials}
              image={f.image}
              ringColor="#B8442A"
              label={f.name.split(" ")[0]}
            />
          ))}
        </div>
      </div>

      {/* case 'restaurants' */}
      <div className="pb-1.5 pt-3">
        <div className="mb-2 px-4">
          <SectionCaps>Restaurantes</SectionCaps>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          {restaurantStories.map((r) => (
            <StoryBubble
              key={r.id}
              initials={r.initials}
              image={r.image}
              ringColor="#C07D25"
              label={r.name}
            />
          ))}
        </div>
      </div>

      {/* case 'most_visited' */}
      <div className="pb-1.5 pt-3">
        <div className="mb-2 px-4">
          <SectionCaps>Más Visitados</SectionCaps>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-1">
          {mostVisited.map((r) => (
            <div
              key={r.id}
              className="relative h-[82px] w-[120px] shrink-0 overflow-hidden rounded-[10px] bg-secondary"
            >
              <Image src={r.image} alt={r.name} fill sizes="120px" className="object-cover" />
              <span className="absolute left-1 top-1 rounded-md bg-[#1a1a18] px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                #{r.rank}
              </span>
              <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                {r.visits} visitas
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* case 'favorites' */}
      <div className="pb-4 pt-3">
        <div className="mb-2 px-4">
          <SectionCaps>Favoritos</SectionCaps>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-1">
          {favorites.map((d) => (
            <div
              key={d.id}
              className="relative h-[82px] w-[120px] shrink-0 overflow-hidden rounded-[10px] bg-secondary"
            >
              <Image src={d.image} alt={d.name} fill sizes="120px" className="object-cover" />
              <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                ★ {d.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
