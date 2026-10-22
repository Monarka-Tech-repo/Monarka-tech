import Image from "next/image";
import { NavLogoReveal } from "@/components/effects/nav-logo-reveal";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

type NavLink = { label: string; href: string };

export function SiteNav({
  locale,
  path,
  logoHref = localePath(locale, "/"),
  navLinksLeft,
  navLinksRight,
}: {
  locale: Locale;
  /** This page's locale-neutral path (e.g. "/studio"), used for the language switch. */
  path: string;
  logoHref?: string;
  navLinksLeft: NavLink[];
  navLinksRight: NavLink[];
}) {
  const t = getDictionary(locale).common;
  const otherLocale: Locale = locale === "es" ? "en" : "es";

  return (
    <nav aria-label={t.navLabel} className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <a href={logoHref} aria-label={t.logoLabel} className="relative block h-8 w-36">
          <Image src="/assets/monarka-logo-dark.png" alt="" fill priority sizes="144px" className="object-contain object-left" />
        </a>
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] md:flex">
          {navLinksLeft.map((link) => <a key={link.href} href={link.href} className="transition-opacity hover:opacity-50">{link.label}</a>)}
          <NavLogoReveal size={50} />
          {navLinksRight.map((link) => <a key={link.href} href={link.href} className="transition-opacity hover:opacity-50">{link.label}</a>)}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={localePath(otherLocale, path)}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={t.switchLanguage.label}
            className="text-xs font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-50"
          >
            {t.switchLanguage.short}
          </a>
          <a href="mailto:hello@monarka.tech" className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-black">
            {t.talk}
          </a>
        </div>
      </div>
    </nav>
  );
}
