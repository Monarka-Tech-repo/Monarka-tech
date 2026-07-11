import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal",
  description: "Documentos legales de Monarka TECH.",
  alternates: { canonical: "/legal" },
};

const docs = [
  {
    href: "/legal/privacy",
    title: "Política de Privacidad",
    desc: "Cómo recopilamos, usamos y protegemos tu información en monarka.tech y CATA.",
  },
  {
    href: "/legal/terms",
    title: "Términos de Servicio",
    desc: "Las reglas que rigen el uso de nuestros sitios y aplicaciones.",
  },
];

export default function LegalIndexPage() {
  return (
    <section className="relative z-[1] px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.35em] text-brand-teal">
          Documentos Legales
        </p>
        <h1 className="mb-12 text-center font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-black text-white">
          Legal
        </h1>
        <div className="flex flex-col gap-4">
          {docs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-xl border border-border bg-surface-1 p-6 transition-colors hover:border-border-2"
            >
              <div className="mb-1.5 font-heading text-sm font-bold text-accent">
                {doc.title}
              </div>
              <p className="text-sm text-muted-foreground">{doc.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
