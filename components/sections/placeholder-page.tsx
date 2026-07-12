import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlaceholderPage({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section className="relative z-[1] flex min-h-[70vh] items-center px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-teal">
          {eyebrow}
        </p>
        <h1 className="mb-6 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-foreground">
          {title}
        </h1>
        <div className="mb-8 inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
          Contenido pendiente
        </div>
        <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
          {note}
        </p>
        <Link
          href="/contact"
          className={cn(buttonVariants(), "rounded-full")}
        >
          Contáctanos mientras tanto
        </Link>
      </div>
    </section>
  );
}
