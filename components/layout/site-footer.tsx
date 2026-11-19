import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { DreamBigBurst } from "@/components/effects/dream-big-burst";
import { ContactForm } from "@/components/sections/contact-form";
import { getDictionary, type Locale } from "@/lib/i18n";

/** "Let's talk" headline, contact form and legal line shared by the service pages. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.footer;

  return (
    <footer id="contact" className="relative overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-44">
      <div aria-hidden className="absolute bottom-[-30rem] left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[#176cff]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px]">
        <RevealOnScroll>
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">{t.eyebrow}</p>
          <a href="mailto:hello@monarka.tech" className="group block border-b border-black/15 pb-12">
            <span className="flex items-end justify-between gap-6 text-[clamp(3.2rem,9.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
              {t.title}
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
        <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.14em] text-black/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Monarka TECH LLC</p>
          <p>{dict.common.taglinePhrases.join(" · ")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:hello@monarka.tech" className="text-black hover:text-[#176cff]">hello@monarka.tech</a>
            <a
              href="https://instagram.com/monarka.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#176cff]"
            >
              Instagram · @monarka.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
