"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// A real 3D carousel — one phone mockup per real screenshot, arranged
// around a circle in 3D space and rotating to bring each one to the
// front — reading from this site's own copy of the same curated
// screenshot folder used on cata.life.
const screens = [
  "WhatsApp Image 2026-07-20 at 11.41.32 PM (1).jpeg",
  "WhatsApp Image 2026-07-20 at 11.41.32 PM (4).jpeg",
  "WhatsApp Image 2026-07-20 at 11.41.32 PM.jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (3).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (5).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (6).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (8).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.58 PM (7).jpeg",
  "WhatsApp Image 2026-07-21 at 1.11.18 AM (2).jpeg",
  "WhatsApp Image 2026-07-21 at 1.28.34 AM (2).jpeg",
  "WhatsApp Image 2026-07-21 at 1.28.35 AM.jpeg",
].map((name) => `/assets/cata/Screens for webpage/${encodeURIComponent(name)}`);

const captions = [
  ["Descubre tu perfil de gustos", "Convierte cada registro en una visión clara de lo que te encanta."],
  ["Guarda lo que vale la pena", "Crea un diario visual de platillos, bebidas y lugares."],
  ["Recuerda cada experiencia", "Fotos, notas y calificaciones siempre a la mano."],
  ["Crea y comparte recetas", "Lleva la inspiración de la mesa a tu propia cocina."],
  ["Explora nuevas ideas", "Encuentra experiencias construidas alrededor de tu gusto."],
  ["Construye tu historia", "Cada comida se convierte en parte de tu colección."],
  ["Comparte con tu gente", "Descubre qué están probando las personas en las que confías."],
  ["Planea tu próxima salida", "Guarda restaurantes, recetas y viajes gastronómicos."],
  ["Conoce mejor tu paladar", "Tus hábitos se transforman en recomendaciones más personales."],
  ["Celebra cada hallazgo", "Haz visibles los platillos y lugares que recomendarías."],
  ["Todo tu mundo gastronómico", "Una sola app para descubrir, guardar y compartir."],
];

const PHONE_WIDTH = 170;
const PHONE_HEIGHT = 350;
const RADIUS = 300;
const STEP = 360 / screens.length;

export function CataPhoneShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: 1400, height: PHONE_HEIGHT + 40, width: "100%" }}
      >
        <div className="relative" style={{ transformStyle: "preserve-3d", width: PHONE_WIDTH, height: PHONE_HEIGHT }}>
          {screens.map((src, i) => {
            let delta = i - index;
            if (delta > screens.length / 2) delta -= screens.length;
            if (delta < -screens.length / 2) delta += screens.length;
            const angle = delta * STEP;
            const isFront = delta === 0;
            return (
              <motion.div
                key={src}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: angle }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[2rem] border-[8px] shadow-[0_30px_70px_rgba(0,0,0,.45)] transition-opacity duration-500"
                  style={{
                    borderColor: "#1a1a18",
                    background: "#100D0B",
                    transform: `translateZ(${RADIUS}px)`,
                    backfaceVisibility: "hidden",
                    opacity: isFront ? 1 : 0.35,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-0 z-20 h-4 w-20 -translate-x-1/2 rounded-b-xl"
                    style={{ background: "#1a1a18" }}
                  />
                  <Image
                    src={src}
                    alt="Captura de la app CATA"
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                    priority={i === 0}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex gap-1.5">
        {screens.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-[#3d8bff]" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
      <div className="relative mt-5 min-h-16 w-full max-w-xs text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-lg font-semibold text-white">{captions[index][0]}</p>
            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-white/50">{captions[index][1]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
