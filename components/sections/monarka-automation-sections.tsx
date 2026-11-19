import { Bot, Check, CreditCard, Workflow } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { StripeWarp } from "@/components/effects/stripe-warp";
import { HalftoneTexture } from "@/components/effects/halftone-texture";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { AgentChatDemo } from "@/components/sections/agent-chat-demo";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceFunnelForm } from "@/components/sections/service-funnel-form";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

// One icon per service, in the same order as `automationPage.services.items`.
const SERVICE_ICONS = [Bot, CreditCard, Workflow];

export function MonarkaAutomationSections({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.automationPage;

  const navLinksLeft = [
    { label: dict.nav.home, href: localePath(locale, "/") },
    { label: dict.nav.capabilities, href: localePath(locale, "/#capabilities") },
    { label: dict.nav.apps, href: localePath(locale, "/apps") },
  ];
  const navLinksRight = [
    { label: dict.nav.studio, href: localePath(locale, "/studio") },
    { label: dict.nav.designs, href: localePath(locale, "/disenos") },
  ];

  return (
    <main className="monarka-home bg-white text-[#090909]">
      <SiteNav locale={locale} path="/automatizacion" navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />

      <section id="top" aria-hidden className="h-20" />

      <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <StripeWarp />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.hero.eyebrow}</p>
            <h1 className="max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.hero.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60 md:text-xl">{t.hero.body}</p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {t.services.items.map((item, i) => {
                const Icon = SERVICE_ICONS[i];
                return (
                  <li key={item.num} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Icon aria-hidden className="size-4 text-[#3d8bff]" />
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <section id="services" className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.services.eyebrow}</p>
            <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.services.title}</h2>
          </RevealOnScroll>
          <div className="grid gap-5 lg:grid-cols-3">
            {t.services.items.map((item, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <RevealOnScroll
                  key={item.num}
                  delay={i * 0.1}
                  className="group flex flex-col rounded-[1.5rem] border border-black/10 bg-white p-8 transition-colors hover:border-[#3d8bff]/50 md:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#3d8bff]/10 text-[#176cff] transition-colors group-hover:bg-[#3d8bff] group-hover:text-white">
                      <Icon aria-hidden className="size-7" />
                    </span>
                    <span className="text-xs font-semibold text-black/35">{item.num}</span>
                  </div>
                  <h3 className="mt-8 text-3xl font-medium leading-[0.95] tracking-[-0.04em] md:text-4xl">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-black/60">{item.description}</p>
                  <ul className="mt-8 space-y-3 border-t border-black/10 pt-6">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm font-medium">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#3d8bff]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="relative overflow-hidden bg-[#06070b] px-5 py-24 text-white md:px-10 md:py-36">
        <div aria-hidden className="absolute -left-40 top-1/3 size-[40rem] rounded-full bg-[#3d8bff]/20 blur-[140px]" />
        <div aria-hidden className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-[#25d366]/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-2">
          <RevealOnScroll>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#72aaff]">{t.demo.eyebrow}</p>
            <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]">{t.demo.title}</h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-white/60">{t.demo.body}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <AgentChatDemo t={t.demo} />
          </RevealOnScroll>
        </div>
      </section>

      <section id="use-cases" className="relative overflow-hidden bg-[#3d8bff] px-5 py-24 text-black md:px-10 md:py-36">
        <HalftoneTexture />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]">{t.useCases.eyebrow}</p>
            <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.useCases.title}</h2>
          </RevealOnScroll>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.useCases.items.map(([name, body], i) => (
              <RevealOnScroll key={name} delay={i * 0.08} className="rounded-[1.5rem] bg-white/85 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{name}</h3>
                <p className="mt-3 text-base leading-7 text-black/60">{body}</p>
              </RevealOnScroll>
            ))}
          </div>
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
            <ServiceFunnelForm locale={locale} t={dict.funnel} common={dict.common} initialArea="automation" />
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
