"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Shopping cart — persisted to localStorage. Items are { slug, qty };
// product details (name, price, image) are resolved from the static catalog
// via productBySlug at render time. Server re-prices everything at checkout.
export const useCart = create()(
  persist(
    (set, get) => ({
      items: [],

      add: (slug, qty = 1) =>
      set((s) => {
        const existing = s.items.find((i) => i.slug === slug);
        if (existing) {
          return {
            items: s.items.map((i) =>
            i.slug === slug ? { ...i, qty: i.qty + qty } : i
            )
          };
        }
        return { items: [...s.items, { slug, qty }] };
      }),

      setQty: (slug, qty) =>
      set((s) => ({
        items:
        qty <= 0 ?
        s.items.filter((i) => i.slug !== slug) :
        s.items.map((i) => i.slug === slug ? { ...i, qty } : i)
      })),

      remove: (slug) =>
      set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),

      has: (slug) => get().items.some((i) => i.slug === slug),

      clear: () => set({ items: [] })
    }),
    { name: "hfm-cart" }
  )
);

// Total number of units across all lines.
export const cartCount = (s) => s.items.reduce((n, i) => n + i.qty, 0);
