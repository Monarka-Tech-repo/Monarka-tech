export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Spanish (the default) lives at the root; every other locale gets a prefix.
// `path` is a site path like "/", "/studio" or "/#faq".
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path}`;
  return `/${locale}${path}`;
}

// Canonical + hreflang alternates for a page that exists in every locale.
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(defaultLocale, path),
    },
  };
}
