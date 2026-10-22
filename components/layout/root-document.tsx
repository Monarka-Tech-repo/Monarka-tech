import type { Metadata } from "next";
import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { getDictionary, type Locale } from "@/lib/i18n";
import { ThemeScope } from "@/components/layout/theme-scope";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { BackgroundMusic } from "@/components/effects/background-music";
import { LoadingScreen } from "@/components/effects/loading-screen";

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${t.homeTitle}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: t.siteDescription,
  };
}

// Each locale has its own root layout (app/(es), app/(en)) so <html lang>
// is correct in the static export; both render through this shell.
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale).common;
  return (
    <html lang={locale} className={fontVariables}>
      <body className="antialiased">
        <ThemeScope theme="monarka">
          <LoadingScreen />
          <SmoothScroll />
          <BackgroundMusic labels={{ on: t.musicOn, off: t.musicOff }} />
          {children}
        </ThemeScope>
      </body>
    </html>
  );
}
