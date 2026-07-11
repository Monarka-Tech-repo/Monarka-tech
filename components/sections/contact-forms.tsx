"use client";

import type { FormEvent } from "react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormspree } from "@/lib/use-formspree";

const dinerCities = [
  "El Paso, TX",
  "Ciudad Juárez",
  "Ciudad de México",
  "Monterrey",
  "Guadalajara",
  "Otra ciudad",
];

function StatusMessage({
  status,
}: {
  status: "idle" | "submitting" | "success" | "error" | "unconfigured";
}) {
  if (status === "success") {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-green">
        ✓ ¡Listo! Te avisamos cuando lancemos.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="mt-4 text-sm font-semibold text-destructive">
        Algo salió mal. Intenta de nuevo o escríbenos directamente.
      </p>
    );
  }
  if (status === "unconfigured") {
    return (
      <p className="mt-4 text-xs text-muted-foreground/60">
        Formulario en configuración — vuelve pronto.
      </p>
    );
  }
  return null;
}

function DinerForm() {
  const { status, submit } = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_DINER
  );
  const submitting = status === "submitting";
  const done = status === "success";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await submit({
      nombre: String(form.get("nombre") ?? ""),
      email: String(form.get("email") ?? ""),
      ciudad: String(form.get("ciudad") ?? ""),
      tipo: "comensal",
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-surface-1 p-8 transition-colors hover:border-border-2 md:p-12">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        Para Comensales
      </p>
      <h3 className="mb-2 text-xl font-bold tracking-tight">
        Lista de Espera
      </h3>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Regístrate y sé de los primeros en acceder a CATA cuando lancemos
        en iOS y Android.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Input name="nombre" placeholder="Tu nombre" required disabled={submitting || done} />
        <Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          disabled={submitting || done}
        />
        <select
          name="ciudad"
          required
          disabled={submitting || done}
          defaultValue=""
          className="h-9 w-full rounded-md border border-input bg-secondary px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          <option value="" disabled>
            Ciudad
          </option>
          {dinerCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <Button
          type="submit"
          disabled={submitting || done}
          className="mt-2 w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {done ? "✓ Enviado" : submitting ? "Enviando…" : "Unirme a la Lista →"}
        </Button>
      </form>
      <StatusMessage status={status} />
    </div>
  );
}

function RestaurantForm() {
  const { status, submit } = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_RESTAURANT
  );
  const submitting = status === "submitting";
  const done = status === "success";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await submit({
      restaurante: String(form.get("restaurante") ?? ""),
      contacto: String(form.get("contacto") ?? ""),
      email: String(form.get("email") ?? ""),
      ciudad: String(form.get("ciudad") ?? ""),
      tipo: "restaurante",
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-surface-1 p-8 transition-colors hover:border-border-2 md:p-12">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        Para Restaurantes
      </p>
      <h3 className="mb-2 text-xl font-bold tracking-tight">
        Sé Parte de CATA
      </h3>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        ¿Tienes un restaurante? Trabaja con nosotros y ofrece a tus
        clientes la experiencia CATA desde el día uno.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Input
          name="restaurante"
          placeholder="Nombre del restaurante"
          required
          disabled={submitting || done}
        />
        <Input
          name="contacto"
          placeholder="Tu nombre / rol"
          required
          disabled={submitting || done}
        />
        <Input
          name="email"
          type="email"
          placeholder="Correo de contacto"
          required
          disabled={submitting || done}
        />
        <Input name="ciudad" placeholder="Ciudad" disabled={submitting || done} />
        <Button
          type="submit"
          disabled={submitting || done}
          className="mt-2 w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {done ? "✓ Enviado" : submitting ? "Enviando…" : "Quiero ser Partner →"}
        </Button>
      </form>
      <StatusMessage status={status} />
    </div>
  );
}

export function ContactForms() {
  return (
    <section id="contacto" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Contacto
            </p>
            <h1 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Sé el primero
              <br />
              en vivirlo.
            </h1>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              Únete a la lista de espera o contáctanos si quieres que tu
              restaurante sea de los primeros en CATA.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <DinerForm />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <RestaurantForm />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
