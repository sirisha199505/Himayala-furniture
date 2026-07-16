"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiLogin } from "@/lib/api";

// Backend role int -> frontend role key
const ROLE_STR = { 1: "super", 2: "admin" };

export const useAdminAuth = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          const { token, info } = await apiLogin(email.trim(), password);
          set({
            token,
            user: {
              id: info.id,
              name: info.full_name || info.name || info.email,
              email: info.email,
              role: ROLE_STR[info.role] ?? "admin"
            }
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e?.message || "Invalid email or password." };
        }
      },
      logout: () => set({ user: null, token: null })
    }),
    {
      name: "hfm-admin-auth",
      // sessionStorage = the admin session is cleared when the tab/browser is
      // closed, so reopening the site requires logging in again.
      storage: createJSONStorage(() =>
      typeof window !== "undefined" ? window.sessionStorage : undefined
      )
    }
  )
);

// Modules available per role.
// Super Admin: everything. Admin: everything EXCEPT user management & settings.
const ALL_MODULES = [
"dashboard", "products", "categories", "gallery", "faqs", "blogs", "case-studies",
"stories", "seo", "leads", "orders", "customers", "analytics", "inventory",
"users", "settings"];

export const ROLE_MODULES = {
  super: ALL_MODULES,
  admin: ALL_MODULES.filter((m) => m !== "users" && m !== "settings")
};

export const ROLE_LABELS = {
  super: "Super Admin",
  admin: "Admin"
};

export function canAccess(role, module) {
  if (!role) return false;
  return (ROLE_MODULES[role] ?? []).includes(module);
}
