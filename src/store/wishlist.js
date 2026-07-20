"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToast } from "@/store/toast";

export const MAX_COMPARE = 4;

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
      remove: (slug) =>
      set((s) => ({ items: s.items.filter((i) => i !== slug) })),
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
        if (s.items.length >= MAX_COMPARE) {
          // cap comparison at MAX_COMPARE — let the user know why nothing happened
          useToast.
          getState().
          show(
            `You can compare up to ${MAX_COMPARE} products at a time. Remove one to add another.`,
            { variant: "warning" }
          );
          return s;
        }
        return { items: [...s.items, slug] };
      }),
      has: (slug) => get().items.includes(slug),
      clear: () => set({ items: [] })
    }),
    { name: "hfm-compare" }
  )
);
