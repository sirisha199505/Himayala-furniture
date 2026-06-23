"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlist = create()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (slug) =>
      set((s) => ({
        items: s.items.includes(slug) ?
        s.items.filter((i) => i !== slug) :
        [...s.items, slug]
      })),
      has: (slug) => get().items.includes(slug),
      clear: () => set({ items: [] })
    }),
    { name: "hfm-wishlist" }
  )
);

export const useCompare = create()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (slug) =>
      set((s) => {
        if (s.items.includes(slug))
        return { items: s.items.filter((i) => i !== slug) };
        if (s.items.length >= 4) return s; // cap comparison at 4
        return { items: [...s.items, slug] };
      }),
      has: (slug) => get().items.includes(slug),
      clear: () => set({ items: [] })
    }),
    { name: "hfm-compare" }
  )
);
