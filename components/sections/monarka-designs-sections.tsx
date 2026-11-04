import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { SiteNav } from "@/components/layout/site-nav";
import { DesignsCatalog } from "@/components/sections/designs-catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

const CONTACT_HREF = "mailto:hello@monarka.tech";

export function MonarkaDesignsSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.designs;

  const navLinksLeft = [
    { label: dict.nav.home, href: localePath(locale, "/") },
    { label: dict.nav.studio, href: localePath(locale, "/studio") },
  ];
  const navLinksRight = [
    { label: dict.nav.work, href: localePath(locale, "/#work") },
    { label: dict.nav.faq, href: localePath(locale, "/#faq") },
  ];

  return (
    <main className="monarka-home bg-[#f6f5f1] text-[#090909]">
      <SiteNav locale={locale} path="/disenos" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section className="relative overflow-hidden bg-white px-5 py-24 md:px-10 md:py-36">
        <StripeWarp />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.hero.eyebrow}</p>
            <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.hero.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60 md:text-xl">{t.hero.body}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-black/40">{dict.studio.demos.fictional}</p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-5 md:px-10">
        <DesignsCatalog t={t} demos={dict.studio.demos} contactHref={CONTACT_HREF} />
      </section>

      <section className="bg-[#090909] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.cta.eyebrow}</p>
            <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.cta.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">{t.cta.body}</p>
          </div>
          <a
            href={CONTACT_HREF}
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#3d8bff] hover:text-white"
          >
            {t.cta.button}
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
        <div className="mx-auto mt-20 flex max-w-[1600px] flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.14em] text-white/45 md:flex-row md:justify-between">
          <p>© 2026 Monarka TECH LLC</p>
          <p>{dict.common.taglinePhrases.join(" · ")}</p>
          <a href={CONTACT_HREF} className="text-white hover:text-[#3d8bff]">hello@monarka.tech</a>
        </div>
      </section>
    </main>
  );
}
