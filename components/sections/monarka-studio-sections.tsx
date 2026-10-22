import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { ArrowLink } from "@/components/effects/arrow-link";
import { ContactForm } from "@/components/sections/contact-form";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { HalftoneTexture } from "@/components/effects/halftone-texture";
import { DreamBigBurst } from "@/components/effects/dream-big-burst";
import { SiteNav } from "@/components/layout/site-nav";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function MonarkaStudioSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.studio;

  const navLinksLeft = [
    { label: dict.nav.home, href: localePath(locale, "/") },
    { label: dict.nav.capabilities, href: localePath(locale, "/#capabilities") },
  ];
  const navLinksRight = [
    { label: dict.nav.work, href: localePath(locale, "/#work") },
    { label: dict.nav.faq, href: localePath(locale, "/#faq") },
  ];

  return (
    <main className="monarka-home bg-[#050505] text-[#f4f4ef]">
      <SiteNav locale={locale} path="/studio" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <StripeWarp />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.hero.eyebrow}</p>
            <h1 className="max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              {t.hero.title}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60 md:text-xl">
              {t.hero.body}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.available.eyebrow}</p>
            <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              {t.available.title}
            </h2>
          </RevealOnScroll>

          <div className="grid gap-5 md:grid-cols-2">
            {t.available.offerings.map((item, i) => (
              <RevealOnScroll key={item.num} delay={i * 0.1} className="rounded-[1.5rem] border border-black/10 bg-white p-8 md:p-10">
                <span className="text-xs font-semibold text-black/35">{item.num}</span>
                <h3 className="mt-4 text-3xl font-medium leading-[0.95] tracking-[-0.04em] md:text-4xl">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-black/60">{item.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#3d8bff] px-5 py-24 text-black md:px-10 md:py-36">
        <HalftoneTexture />
        <div className="relative z-[1] mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <RevealOnScroll>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em]">{t.building.eyebrow}</p>
            <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              {t.building.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="flex flex-col justify-end">
            <p className="mb-10 max-w-lg text-xl leading-8 md:text-2xl md:leading-9">
              {t.building.lead}
            </p>
            <p className="mb-10 max-w-lg text-base leading-7 text-black/65">
              {t.building.body}
            </p>
            <ArrowLink href="mailto:hello@monarka.tech">{t.building.cta}</ArrowLink>
          </RevealOnScroll>
        </div>
      </section>

      <footer className="relative overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-44">
        <div aria-hidden className="absolute bottom-[-30rem] left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[#176cff]/20 blur-[140px]" />
        <div className="relative mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.footer.eyebrow}</p>
            <a href="mailto:hello@monarka.tech" className="group block border-b border-white/20 pb-12">
              <span className="flex items-end justify-between gap-6 text-[clamp(3.2rem,9.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
                {t.footer.title}
                <ArrowUpRight aria-hidden className="mb-2 size-12 shrink-0 transition-transform group-hover:rotate-45 md:mb-5 md:size-24" />
              </span>
            </a>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <ContactForm locale={locale} t={dict.contactForm} common={dict.common} />
          </RevealOnScroll>
          <div className="mt-14 flex justify-center">
            <DreamBigBurst size={96} />
          </div>
          <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.14em] text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Monarka TECH LLC</p>
            <p>{dict.common.taglinePhrases.join(" · ")}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="mailto:hello@monarka.tech" className="text-white hover:text-[#3d8bff]">hello@monarka.tech</a>
              <a
                href="https://instagram.com/monarka.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#3d8bff]"
              >
                Instagram · @monarka.tech
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
