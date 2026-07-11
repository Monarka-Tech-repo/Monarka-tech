import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { LinkifyText } from "@/components/sections/linkify-text";
import { lastUpdated, privacySections } from "@/content/privacy";
import { cn } from "@/lib/utils";

function ListItem({ text }: { text: string }) {
  const match = text.match(/^([^:]{2,40}):\s(.+)$/);
  return (
    <li className="relative mb-1.5 pl-6 text-[13.5px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-accent before:content-['▸']">
      {match ? (
        <>
          <strong className="font-semibold text-foreground">{match[1]}:</strong>{" "}
          <LinkifyText text={match[2]} />
        </>
      ) : (
        <LinkifyText text={text} />
      )}
    </li>
  );
}

export function LegalPrivacy() {
  return (
    <>
      <section className="relative z-[1] px-6 pb-8 pt-32 text-center">
        <p className="mx-auto mb-4 flex items-center justify-center gap-2.5 text-[10px] uppercase tracking-[0.4em] text-brand-teal before:h-px before:w-6 before:bg-brand-teal after:h-px after:w-6 after:bg-brand-teal">
          Documento Legal
        </p>
        <h1 className="mb-2 font-heading text-[clamp(1.4rem,3vw,2.2rem)] font-black text-white">
          Política de Privacidad
        </h1>
        <p className="font-mono text-xs text-muted-foreground">
          Última actualización: {lastUpdated}
        </p>
      </section>

      <main className="relative z-[1] mx-auto max-w-3xl px-6 pb-24 pt-8">
        {privacySections.map((section) => (
          <RevealOnScroll key={section.title}>
            <section className="mb-10">
              <h2
                className={cn(
                  "mb-4 border-b pb-2.5 font-heading text-[13px] font-bold uppercase tracking-[0.18em]",
                  section.cata
                    ? "border-brand-red/30 text-brand-red"
                    : "border-border text-accent"
                )}
              >
                {section.title}
                {section.cata && (
                  <span className="ml-2 inline-flex items-center rounded-full border border-brand-red/25 bg-brand-red/10 px-2.5 py-0.5 align-middle font-heading text-[9px] font-bold tracking-[0.1em] text-brand-red">
                    CATA App
                  </span>
                )}
              </h2>

              {section.intro?.map((p, i) => (
                <p key={i} className="mb-3 text-[14.5px] leading-[1.8] text-muted-foreground">
                  <LinkifyText text={p} />
                </p>
              ))}

              {section.subsections?.map((sub, i) => (
                <div key={i}>
                  {sub.h3 && (
                    <h3 className="mb-2 mt-5 text-base font-bold text-white">{sub.h3}</h3>
                  )}
                  {sub.paragraphs?.map((p, j) => (
                    <p key={j} className="mb-3 text-[14.5px] leading-[1.8] text-muted-foreground">
                      <LinkifyText text={p} />
                    </p>
                  ))}
                  {sub.list && (
                    <ul className="mb-4 list-none pl-0">
                      {sub.list.map((item, k) => (
                        <ListItem key={k} text={item} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {section.outro?.map((p, i) => (
                <p key={i} className="mb-3 text-[14.5px] leading-[1.8] text-muted-foreground">
                  <LinkifyText text={p} />
                </p>
              ))}
            </section>
          </RevealOnScroll>
        ))}
      </main>
    </>
  );
}
