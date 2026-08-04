"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Cuánto tiempo toma un proyecto?",
    a: "Depende del alcance, pero desde la primera conversación te damos un cronograma claro y realista.",
  },
  {
    q: "¿Qué tecnologías usan?",
    a: "Elegimos tecnología moderna y escalable según las necesidades específicas de cada proyecto, no una plantilla fija.",
  },
  {
    q: "¿Ofrecen soporte después del lanzamiento?",
    a: "Sí. Ofrecemos soporte continuo y mantenimiento para que tu producto siga funcionando bien con el tiempo.",
  },
  {
    q: "¿Trabajan con negocios pequeños y grandes?",
    a: "Sí, trabajamos con negocios en distintas etapas — desde ideas nuevas hasta empresas ya establecidas.",
  },
  {
    q: "¿Cómo empiezo un proyecto con Monarka?",
    a: "Completa el formulario de solicitud de proyecto en esta misma página, o escríbenos directamente a hello@monarka.tech.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{item.q}</span>
              <ChevronDown
                aria-hidden
                className={`size-5 shrink-0 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pb-6 text-sm leading-6 text-white/55 md:text-base">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
