import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales, localePath, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

const routes = ["/", "/studio"];

// Matches next.config's `trailingSlash: true`, so sitemap URLs equal the
// canonical URLs instead of pointing at redirects.
function absoluteUrl(locale: Locale, route: string) {
  const path = localePath(locale, route);
  return `${siteConfig.url}${path.endsWith("/") ? path : `${path}/`}`;
}

// One entry per page per locale, each listing every language version so
// search engines treat them as translations rather than duplicates.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, route),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, route)])),
      },
    })),
  );
}
