import { Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { ArrowLink } from "@/components/effects/arrow-link";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

// Placeholder until the hardware rental content (holograms, packages, quote
// form) is built — see AI_COLLABORATION.md.
export function MonarkaHardwareSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.hardwarePage;

  const navLinksLeft = [
    { label: dict.nav.home, href: localePath(locale, "/") },
    { label: dict.nav.capabilities, href: localePath(locale, "/#capabilities") },
  ];
  const navLinksRight = [
    { label: dict.nav.studio, href: localePath(locale, "/studio") },
    { label: dict.nav.designs, href: localePath(locale, "/disenos") },
  ];

  return (
    <main className="monarka-home bg-white text-[#090909]">
      <SiteNav locale={locale} path="/hardware" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <StripeWarp />
        <div className="relative z-[1] mx-auto w-full max-w-[1600px]">
          <RevealOnScroll>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.eyebrow}</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#3d8bff]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#176cff]">
                <Sparkles aria-hidden className="size-3.5" />
                {t.badge}
              </span>
            </div>
            <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60 md:text-xl">{t.body}</p>
            <div className="mt-10">
              <ArrowLink href="mailto:hello@monarka.tech">{t.cta}</ArrowLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
