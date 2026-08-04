"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { ZAPIER_WEBHOOK_URL } from "@/lib/zapier";

type AreaKey = "web" | "app" | "automation" | "support";

const areaOptions: { key: AreaKey; label: string }[] = [
  { key: "web", label: "Productos digitales" },
  { key: "app", label: "Apps y plataformas" },
  { key: "automation", label: "Automatización" },
  { key: "support", label: "Tecnología y soporte" },
];

type Question = { key: string; label: string; type: "choice" | "text"; options?: string[] };

const areaQuestions: Record<AreaKey, Question[]> = {
  web: [
    { key: "existing_site", label: "¿Ya tienes un sitio web?", type: "choice", options: ["Sí", "No"] },
    {
      key: "goal",
      label: "¿Cuál es el objetivo principal?",
      type: "choice",
      options: ["Vender productos", "Mostrar mi portafolio o servicios", "Generar clientes potenciales", "Otro"],
    },
    { key: "industry", label: "¿En qué industria está tu negocio?", type: "text" },
  ],
  app: [
    { key: "platform", label: "¿Qué plataforma necesitas?", type: "choice", options: ["iOS", "Android", "Ambas", "Web"] },
    { key: "designs", label: "¿Ya tienes diseños o wireframes?", type: "choice", options: ["Sí", "No", "Parcialmente"] },
    { key: "stage", label: "¿Es una idea nueva o un producto existente?", type: "choice", options: ["Idea nueva", "Producto existente"] },
  ],
  automation: [
    { key: "process", label: "¿Qué proceso te gustaría automatizar?", type: "text" },
    { key: "tools", label: "¿Qué herramientas usan actualmente?", type: "text" },
  ],
  support: [
    {
      key: "support_type",
      label: "¿Qué tipo de soporte necesitas?",
      type: "choice",
      options: ["Hosting", "Mantenimiento", "Seguridad", "Migración", "Otro"],
    },
    { key: "existing_system", label: "¿Tienen un sistema existente que necesita ayuda?", type: "choice", options: ["Sí", "No"] },
  ],
};

const areaLabel: Record<AreaKey, string> = {
  web: "Productos digitales",
  app: "Apps y plataformas",
  automation: "Automatización",
  support: "Tecnología y soporte",
};

function ChoiceGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            value === opt
              ? "border-black bg-black text-white"
              : "border-black/15 bg-white text-black hover:border-black/40"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function ServiceFunnelForm() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [area, setArea] = useState<AreaKey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const questions = area ? areaQuestions[area] : [];
  const step1Complete = area !== null && questions.every((q) => answers[q.key]?.trim());

  const selectArea = (key: AreaKey) => {
    setArea(key);
    setAnswers({});
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "solicitud-de-servicio",
          area: area ? areaLabel[area] : "",
          ...answers,
          name,
          email,
          business,
          comments,
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-3 rounded-[1.5rem] border border-black/15 bg-black/[0.03] p-10 text-center">
        <Check aria-hidden className="size-8 text-[#3d8bff]" />
        <p className="text-lg font-semibold text-black">Solicitud enviada</p>
        <p className="text-sm text-black/55">Gracias por contarnos sobre tu proyecto — te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-14 max-w-2xl rounded-[1.5rem] border border-black/15 bg-black/[0.03] p-6 backdrop-blur-sm md:p-8">
      <div className="mb-8 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${step === i ? "w-8 bg-black" : "w-1.5 bg-black/20"}`} />
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-3">
          <p className="mb-2 text-center text-lg font-semibold text-black">¿Qué necesitas?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {areaOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => selectArea(opt.key)}
                className="rounded-xl border border-black/15 bg-white px-5 py-6 text-center text-base font-semibold text-black transition-colors hover:border-[#3d8bff] hover:text-[#3d8bff]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && area && (
        <div className="grid gap-6">
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50 hover:text-black"
          >
            <ArrowLeft aria-hidden className="size-3.5" /> {areaLabel[area]}
          </button>
          {questions.map((q) => (
            <div key={q.key} className="grid gap-2">
              <p className="text-sm font-semibold text-black">{q.label}</p>
              {q.type === "choice" ? (
                <ChoiceGroup
                  options={q.options ?? []}
                  value={answers[q.key]}
                  onChange={(v) => setAnswers((prev) => ({ ...prev, [q.key]: v }))}
                />
              ) : (
                <input
                  type="text"
                  value={answers[q.key] ?? ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }))}
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-black placeholder:text-black/30 focus:border-[#3d8bff] focus:outline-none"
                  placeholder="Tu respuesta"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            disabled={!step1Complete}
            onClick={() => setStep(2)}
            className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d8bff] disabled:opacity-40"
          >
            Continuar
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50 hover:text-black"
          >
            <ArrowLeft aria-hidden className="size-3.5" /> Atrás
          </button>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
              Nombre
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-black/15 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-black placeholder:text-black/30 focus:border-[#3d8bff] focus:outline-none"
                placeholder="Tu nombre"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
              Correo
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-black/15 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-black placeholder:text-black/30 focus:border-[#3d8bff] focus:outline-none"
                placeholder="tu@correo.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
            Negocio o proyecto (opcional)
            <input
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-black placeholder:text-black/30 focus:border-[#3d8bff] focus:outline-none"
              placeholder="Nombre de tu negocio o idea"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
            Algo más que quieras contarnos (opcional)
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="resize-none rounded-xl border border-black/15 bg-white px-4 py-3 text-base font-normal normal-case leading-6 tracking-normal text-black placeholder:text-black/30 focus:border-[#3d8bff] focus:outline-none"
              placeholder="Cualquier detalle adicional"
            />
          </label>
          {status === "error" && (
            <p className="text-sm text-red-600">Algo salió mal. Intenta de nuevo o escríbenos a hello@monarka.tech.</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d8bff] disabled:opacity-60"
          >
            {status === "sending" ? "Enviando..." : "Enviar solicitud"}
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
          </button>
        </form>
      )}
    </div>
  );
}
