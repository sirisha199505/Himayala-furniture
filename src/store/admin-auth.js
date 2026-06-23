"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Demo accounts (front-end only — wire to real auth in production)
export const DEMO_ACCOUNTS = [
{
  name: "Sirisha (Super Admin)",
  email: "admin@himalayanfurnituremart.in",
  password: "admin123",
  role: "super"
},
{
  name: "Content Manager",
  email: "content@himalayanfurnituremart.in",
  password: "content123",
  role: "content"
}];

export const useAdminAuth = create()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const match = DEMO_ACCOUNTS.find(
          (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
        );
        if (!match) return { ok: false, error: "Invalid email or password." };
        set({ user: { name: match.name, email: match.email, role: match.role } });
        return { ok: true };
      },
      logout: () => set({ user: null })
    }),
    { name: "hfm-admin-auth" }
  )
);

// Modules available per role
export const ROLE_MODULES = {
  content: ["dashboard", "products", "categories", "gallery", "faqs", "blogs", "case-studies", "stories", "seo"],
  super: [
  "dashboard", "products", "categories", "gallery", "faqs", "blogs", "case-studies",
  "stories", "seo", "leads", "orders", "customers", "analytics", "inventory", "users", "settings"]

};

export function canAccess(role, module) {
  if (!role) return false;
  return ROLE_MODULES[role].includes(module);
}
