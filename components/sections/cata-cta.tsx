"use client";

import type { FormEvent } from "react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { useFormspree } from "@/lib/use-formspree";
import { cn } from "@/lib/utils";

function WaitlistCard({
  icon,
  title,
  desc,
  placeholder,
  buttonLabel,
  note,
  endpointId,
  tipo,
  variant,
}: {
  icon: string;
  title: string;
  desc: string;
  placeholder: string;
  buttonLabel: string;
  note: string;
  endpointId: string | undefined;
  tipo: string;
  variant: "diner" | "rest";
}) {
  const { status, submit } = useFormspree(endpointId);
  const submitting = status === "submitting";
  const done = status === "success";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await submit({ email: String(form.get("email") ?? ""), tipo });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-9">
      <div className="mb-3 text-2xl">{icon}</div>
      <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">
        {desc}
      </p>
      <form onSubmit={onSubmit} className="flex">
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          disabled={submitting || done}
          className="flex-1 rounded-l border border-r-0 border-border bg-background px-5 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || done}
          className={cn(
            "whitespace-nowrap rounded-r px-5 py-3.5 text-[13px] font-semibold transition-colors disabled:opacity-70",
            variant === "diner"
              ? "bg-accent text-white hover:bg-accent/90"
              : "bg-brand-gold text-foreground hover:bg-brand-gold/85"
          )}
        >
          {done ? "✓ ¡Listo!" : submitting ? "Enviando…" : buttonLabel}
        </button>
      </form>
      <p className="mt-3 text-xs text-brand-dim">
        {status === "unconfigured"
          ? "Formulario en configuración — vuelve pronto."
          : status === "error"
            ? "Algo salió mal. Intenta de nuevo."
            : note}
      </p>
    </div>
  );
}

export function CataCta() {
  return (
    <section id="contacto" className="relative z-[1] overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(184,68,42,.08) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-[2] mx-auto max-w-5xl px-6 py-28">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-teal">
              Contacto CATA
            </p>
            <h2 className="mb-3.5 font-heading text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold leading-tight text-foreground">
              Sé de los primeros en{" "}
              <em className="text-accent">probar CATA</em>
            </h2>
            <p className="text-[15px] leading-[1.78] text-muted-foreground">
              CATA está en desarrollo activo. Únete a la lista de espera o
              súmate como restaurante socio — te avisaremos en cuanto
              abramos el acceso anticipado.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-10 md:grid-cols-2">
          <RevealOnScroll>
            <WaitlistCard
              icon="🍽️"
              title="COMENSALES"
              desc="Regístrate para ser de los primeros en descargar CATA cuando lancemos en iOS y Android, y obtén acceso anticipado a todas las funciones."
              placeholder="tu@email.com"
              buttonLabel="Unirme a la Lista →"
              note="Sin spam. Solo novedades de CATA."
              endpointId={process.env.NEXT_PUBLIC_FORMSPREE_DINER}
              tipo="cata-comensal"
              variant="diner"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <WaitlistCard
              icon="👨‍🍳"
              title="RESTAURANTES & SERVICIO"
              desc="¿Tienes un restaurante? Reclama tu página, publica tu menú oficial y conecta con la comunidad de foodies de tu ciudad desde el día uno."
              placeholder="tu@restaurante.com"
              buttonLabel="Quiero Ser Socio →"
              note="Un representante de Monarka TECH te contactará."
              endpointId={process.env.NEXT_PUBLIC_FORMSPREE_RESTAURANT}
              tipo="cata-restaurante"
              variant="rest"
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
