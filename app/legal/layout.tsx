import { ThemeScope } from "@/components/layout/theme-scope";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomCursor } from "@/components/effects/custom-cursor";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeScope theme="legal">
      <CustomCursor />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </ThemeScope>
  );
}
