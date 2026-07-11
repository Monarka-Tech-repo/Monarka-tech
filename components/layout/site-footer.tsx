import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";

const columns = [
  { title: "CATA", links: footerNav.cata },
  { title: "Monarka", links: footerNav.monarka },
  { title: "Legal", links: footerNav.legal },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em]">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.location}
            </p>
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
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
