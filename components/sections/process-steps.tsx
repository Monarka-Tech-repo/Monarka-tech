import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";

/** Numbered "how we work" row shared by the service pages. */
export function ProcessSteps({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: [string, string][];
}) {
  return (
    <div>
      <RevealOnScroll className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{eyebrow}</p>
        <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{title}</h2>
      </RevealOnScroll>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([name, body], i) => (
          <li key={name} className="list-none">
            <RevealOnScroll delay={i * 0.08} className="border-t border-black/20 pt-6">
              <span aria-hidden className="text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-[#3d8bff]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">{name}</h3>
              <p className="mt-3 text-base leading-7 text-black/60">{body}</p>
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    </div>
  );
}
