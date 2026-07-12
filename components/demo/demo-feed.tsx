import Image from "next/image";
import { feedPosts } from "@/content/demo";
import { IconLike, IconComments, IconSave } from "@/components/demo/cata-icons";

const friends = feedPosts.map((p) => ({
  initials: p.initials,
  bg: p.avatarBg,
  color: p.avatarColor,
}));

export function DemoFeed() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <span className="font-heading text-lg italic text-accent">CATA</span>
      </div>

      <div className="border-b border-border px-4 py-3">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-foreground underline decoration-1 underline-offset-2">
          Amigos
        </span>
        <div className="mt-2.5 flex gap-3">
          {friends.map((f, i) => (
            <div
              key={i}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 text-[11px] font-bold"
              style={{ background: f.bg, color: f.color }}
            >
              {f.initials}
            </div>
          ))}
        </div>
      </div>

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
                <span className="text-border-2">
                  {"★".repeat(5 - post.rating)}
                </span>
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
    </div>
  );
}
