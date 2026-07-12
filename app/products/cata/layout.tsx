import { ThemeScope } from "@/components/layout/theme-scope";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function CataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeScope theme="cata">
      <SiteHeader theme="cata" />
      <main className="flex-1">{children}</main>
      <SiteFooter theme="cata" />
    </ThemeScope>
  );
}
