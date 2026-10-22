import { es } from "./es";
import { en } from "./en";
import type { Locale } from "./config";

export * from "./config";
export type { Dictionary, FunnelArea, FunnelQuestion } from "./es";

const dictionaries = { es, en };

// Server-side only: pages pick their dictionary here and hand client
// components just the slice they render, so each locale's bundle stays small.
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
