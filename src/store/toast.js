"use client";

import { create } from "zustand";

let counter = 0;

// Lightweight, global toast store. Call `useToast.getState().show(msg)` from
// anywhere (components or other stores) to surface a transient notification.
export const useToast = create((set) => ({
  toasts: [],
  show: (message, { variant = "info", duration = 3000 } = {}) => {
    const id = ++counter;
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    if (duration > 0) {
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
    return id;
  },
  dismiss: (id) =>
  set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}));
