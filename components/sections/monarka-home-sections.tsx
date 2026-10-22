import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { ArrowLink } from "@/components/effects/arrow-link";
import { CataPhoneShowcase } from "@/components/sections/cata-phone-showcase";
import { ContactForm } from "@/components/sections/contact-form";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { HalftoneTexture } from "@/components/effects/halftone-texture";
import { DreamBigBurst } from "@/components/effects/dream-big-burst";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceFunnelForm } from "@/components/sections/service-funnel-form";
import { CapabilitiesCarousel } from "@/components/sections/capabilities-carousel";
import { SiteNav } from "@/components/layout/site-nav";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

// Official Dream Big seal (same mark used as the site favicon), used as the
// marquee's separator instead of a generic star glyph.
function Mark() {
  // eslint-disable-next-line @next/next/no-img-element -- tiny repeated inline glyph, not worth next/image's fixed-layout overhead
  return <img src="/icon.png" alt="" aria-hidden className="inline-block h-[1.5em] w-[1.5em] -translate-y-[0.05em] align-middle" />;
}

function Manifesto({ phrases }: { phrases: string[] }) {
  return phrases.map((phrase) => (
    <span key={phrase}>{phrase}&nbsp; <Mark />&nbsp; </span>
  ));
}

export function MonarkaHomeSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home;

  const navLinksLeft = [
    { label: dict.nav.capabilities, href: "#capabilities" },
    { label: dict.nav.work, href: "#work" },
    { label: dict.nav.studio, href: localePath(locale, "/studio") },
  ];
  const navLinksRight = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.faq, href: "#faq" },
  ];

  return (
    <main className="monarka-home bg-[#050505] text-[#f4f4ef]">
      <SiteNav locale={locale} path="/" logoHref="#top" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section aria-label={t.manifestoLabel} className="overflow-hidden border-y border-white/10 py-7">
        <div className="monarka-rail flex w-max items-center whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-medium uppercase leading-none tracking-[-0.05em] text-white/90">
          <span><Manifesto phrases={dict.common.taglinePhrases} /></span>
          <span aria-hidden><Manifesto phrases={dict.common.taglinePhrases} /></span>
        </div>
      </section>

      <section id="capabilities" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
        <StripeWarp />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll className="grid gap-8 pb-20 md:grid-cols-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.capabilities.eyebrow}</p>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.capabilities.titleLines[0]}<br />{t.capabilities.titleLines[1]}</h2>
          </RevealOnScroll>
        </div>
        <div className="relative z-[1]">
          <CapabilitiesCarousel t={dict.capabilities} studioHref={localePath(locale, "/studio")} />
        </div>
      </section>

      <section id="work" className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-12 flex items-end justify-between border-b border-black/20 pb-5 md:mb-20">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.work.eyebrow}</p>
              <h2 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.82] tracking-[-0.075em]">CATA</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-black/55 md:block">{t.work.metaLines[0]}<br />{t.work.metaLines[1]}</p>
          </RevealOnScroll>

          <div className="grid gap-5 lg:grid-cols-[1.65fr_.7fr]">
            <RevealOnScroll className="group relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#b8442a] py-14 md:min-h-[760px]">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,226,173,.5),transparent_32%)]" />
              <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white" />
                {t.work.badge}
              </span>
              <div className="relative z-[1] transition-transform duration-700 group-hover:scale-[1.02]">
                <CataPhoneShowcase t={dict.cataShowcase} />
              </div>
            </RevealOnScroll>
            <div className="flex min-h-[440px] flex-col justify-between rounded-[1.5rem] bg-[#171717] p-7 text-white md:p-10">
              <RevealOnScroll delay={0.15}>
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                    <Image src="/assets/cata/cata-icon.png" alt="" fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">CATA</p>
                    <p className="text-xs leading-tight text-white/50">{t.work.cataSubtitle}</p>
                  </div>
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#ef9f27]">{t.work.cardEyebrow}</p>
                <h3 className="mt-3 text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">{t.work.cardTitle}</h3>
              </RevealOnScroll>
              <div>
                <p className="mb-8 max-w-md text-base leading-7 text-white/55">{t.work.cardBody}</p>
                <ArrowLink href="https://cata.life" light>{t.work.cardCta}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[#3d8bff] px-5 py-24 text-black md:px-10 md:py-36">
        <HalftoneTexture />
        <div className="relative z-[1] mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <RevealOnScroll>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em]">{t.about.eyebrow}</p>
            <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">{t.about.title}</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="flex flex-col justify-end">
            <p className="mb-10 max-w-xl text-xl leading-8 md:text-2xl md:leading-9">{t.about.lead}</p>
            <p className="mb-10 max-w-lg text-base leading-7 text-black/65">{t.about.body}</p>
            <ArrowLink href="mailto:hello@monarka.tech">{t.about.cta}</ArrowLink>
          </RevealOnScroll>
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
            <ServiceFunnelForm locale={locale} t={dict.funnel} common={dict.common} />
          </RevealOnScroll>
        </div>
      </section>

      <section id="faq" className="bg-[#050505] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.faq.eyebrow}</p>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.faq.title}</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <FaqSection items={dict.faq} />
          </RevealOnScroll>
        </div>
      </section>

      <footer id="contact" className="relative overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-44">
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
