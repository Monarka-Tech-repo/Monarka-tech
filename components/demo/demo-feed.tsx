import Image from "next/image";
import { feedPosts } from "@/content/demo";

export function DemoFeed() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <span className="font-heading text-lg italic text-accent">CATA</span>
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
              <div className="mb-1.5 text-xs text-brand-gold">
                {"★".repeat(post.rating)}
                <span className="text-border-2">
                  {"★".repeat(5 - post.rating)}
                </span>
              </div>
              <div className="flex gap-3 text-[11px] text-muted-foreground">
                <span>♥ {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span>🔖</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
