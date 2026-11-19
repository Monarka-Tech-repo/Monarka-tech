import Image from "next/image";
import { Check } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { ArrowLink } from "@/components/effects/arrow-link";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { CataPhoneShowcase } from "@/components/sections/cata-phone-showcase";
import { DemoGallery } from "@/components/sections/demo-gallery";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceFunnelForm } from "@/components/sections/service-funnel-form";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

// The web demos featured on this page, in display order.
const FEATURED_SITES = ["fornello", "portfolio"];

export function MonarkaAppsSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.appsPage;

  const navLinksLeft = [
    { label: dict.nav.home, href: localePath(locale, "/") },
    { label: dict.nav.capabilities, href: localePath(locale, "/#capabilities") },
    { label: dict.nav.automation, href: localePath(locale, "/automatizacion") },
  ];
  const navLinksRight = [
    { label: dict.nav.studio, href: localePath(locale, "/studio") },
    { label: dict.nav.designs, href: localePath(locale, "/disenos") },
  ];

  const demos = {
    ...dict.studio.demos,
    ...t.web,
    items: FEATURED_SITES.flatMap((slug) => dict.studio.demos.items.filter((item) => item.slug === slug)),
  };

  return (
    <main className="monarka-home bg-white text-[#090909]">
      <SiteNav locale={locale} path="/apps" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <StripeWarp />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.hero.eyebrow}</p>
            <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.hero.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60 md:text-xl">{t.hero.body}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CATA: our own app, shown live in the 3D phone carousel */}
      <section id="cata" className="relative overflow-hidden bg-[#120e0c] px-5 py-24 text-white md:px-10 md:py-36">
        <div aria-hidden className="absolute -left-40 top-10 size-[42rem] rounded-full bg-[#b8442a]/35 blur-[150px]" />
        <div aria-hidden className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-[#ef9f27]/15 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <RevealOnScroll className="group relative flex min-h-[600px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#b8442a] py-14 md:min-h-[700px]">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,226,173,.5),transparent_32%)]" />
            <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#7dff9b]" />
              {t.cata.badge}
            </span>
            <div className="relative z-[1] w-full transition-transform duration-700 group-hover:scale-[1.02]">
              <CataPhoneShowcase t={dict.cataShowcase} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ef9f27]">
              {t.cata.eyebrow}
            </p>
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl shadow-[0_15px_40px_-10px_rgba(184,68,42,.8)]">
                <Image src="/assets/cata/cata-icon.png" alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.85] tracking-[-0.07em]">CATA</h2>
                <p className="mt-1 text-sm text-white/50">{t.cata.subtitle}</p>
              </div>
            </div>
            <p className="mt-10 text-3xl font-medium leading-[1] tracking-[-0.04em] md:text-4xl">{t.cata.title}</p>
            <p className="mt-5 max-w-md text-base leading-7 text-white/60">{t.cata.body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.cata.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#ef9f27]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ArrowLink href="https://cata.life" light>{t.cata.cta}</ArrowLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="web" className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <DemoGallery t={demos} viewAll={{ href: localePath(locale, "/disenos"), label: dict.studio.demos.viewAll }} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <ProcessSteps {...t.process} />
        </div>
      </section>

      <section id="start" className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-4 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.start.eyebrow}</p>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.start.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-black/55">{t.start.body}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <ServiceFunnelForm locale={locale} t={dict.funnel} common={dict.common} initialArea="app" />
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
