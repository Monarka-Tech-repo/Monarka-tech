"use client";

import { useState } from "react";
import { Camera, Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoLog({
  onSave,
}: {
  onSave: (name: string, rating: number) => void;
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!name.trim() || rating === 0) return;
    onSave(name.trim(), rating);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setName("");
      setRating(0);
    }, 1400);
  }

  if (saved) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Check className="h-7 w-7" />
        </div>
        <div className="font-heading text-lg font-semibold text-foreground">
          ¡Guardado en tu diario!
        </div>
        <p className="text-xs text-muted-foreground">
          Ya puedes verlo en My Menu.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-4">
      <div className="mb-4 text-[13px] font-bold text-foreground">
        Log Dish
      </div>

      <div className="mb-4 flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border-2 bg-secondary text-muted-foreground">
        <Camera className="h-7 w-7" />
        <span className="text-xs">Toca para tomar foto</span>
      </div>

      <label className="mb-1.5 text-[11px] font-medium text-muted-foreground">
        Nombre del platillo
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="p. ej. Ramen Tonkotsu"
        className="mb-4 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
      />

      <label className="mb-1.5 text-[11px] font-medium text-muted-foreground">
        Calificación
      </label>
      <div className="mb-6 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            aria-label={`${star} estrellas`}
            className="transition-transform active:scale-90"
          >
            <Star
              className={cn(
                "h-6 w-6",
                star <= rating
                  ? "fill-brand-gold text-brand-gold"
                  : "text-border-2"
              )}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={!name.trim() || rating === 0}
        className="mt-auto rounded-full bg-accent py-3 text-sm font-semibold text-white transition-colors disabled:opacity-40"
      >
        Guardar en mi diario
      </button>
    </div>
  );
}
