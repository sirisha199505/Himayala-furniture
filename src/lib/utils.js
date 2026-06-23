import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value, currency = "₹") {
  return `${currency}${value.toLocaleString("en-IN")}`;
}

export function slugify(input) {
  return input.
  toLowerCase().
  trim().
  replace(/[^a-z0-9\s-]/g, "").
  replace(/\s+/g, "-").
  replace(/-+/g, "-");
}

/** Deterministic pseudo-random in [0,1) from a string seed — keeps SSR/CSR stable. */
export function seededRandom(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  h = Math.imul(h ^ h >>> 16, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  return ((h ^= h >>> 16) >>> 0) / 4294967296;
}

export function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
