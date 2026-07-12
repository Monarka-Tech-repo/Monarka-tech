import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import type { Theme } from "@/components/layout/theme-scope";
import { cn } from "@/lib/utils";

const columns = [
  { title: "CATA", links: footerNav.cata },
  { title: "Monarka", links: footerNav.monarka },
  { title: "Legal", links: footerNav.legal },
];

const brandByTheme: Record<
  Theme,
  { name: string; sub: string; wordmarkClassName?: string; copy: string }
> = {
  monarka: {
    name: siteConfig.name,
    sub: siteConfig.location,
    copy: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
  },
  cata: {
    name: "CATA",
    sub: "Dining Journal · Taste · Collect · Share",
    wordmarkClassName: "font-heading italic tracking-normal normal-case",
    copy: `© ${new Date().getFullYear()} CATA — un proyecto de Monarka TECH. El Paso, TX.`,
  },
  legal: {
    name: siteConfig.name,
    sub: siteConfig.location,
    copy: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
  },
};

export function SiteFooter({ theme = "monarka" }: { theme?: Theme }) {
  const brand = brandByTheme[theme];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p
              className={cn(
                "text-[13px] font-bold uppercase tracking-[0.12em]",
                brand.wordmarkClassName
              )}
            >
              {brand.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{brand.sub}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>{brand.copy}</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
