"use client";

import { create } from "zustand";
import {
  listEntity,
  createEntity,
  updateEntity,
  removeEntity } from
"@/lib/api";

// ---------------------------------------------------------------------------
// Admin data store — backed by the live backend API (not localStorage).
// Each entity is lazily loaded the first time a page mounts, then kept in a
// client-side cache that the CRUD actions keep in sync.
// ---------------------------------------------------------------------------

export const useAdminData = create()((set, get) => ({
  data: {},
  loading: {},
  loaded: {},
  error: null,

  // Fetch (or re-fetch) an entity's list from the backend.
  load: async (entity, { force = false } = {}) => {
    if (!force && (get().loading[entity] || get().loaded[entity])) return;
    set((s) => ({ loading: { ...s.loading, [entity]: true }, error: null }));
    try {
      const rows = await listEntity(entity);
      set((s) => ({
        data: { ...s.data, [entity]: rows },
        loaded: { ...s.loaded, [entity]: true },
        loading: { ...s.loading, [entity]: false }
      }));
    } catch (e) {
      set((s) => ({
        loading: { ...s.loading, [entity]: false },
        error: e?.message || "Failed to load data"
      }));
    }
  },

  add: async (entity, record) => {
    set({ error: null });
    try {
      const created = await createEntity(entity, record);
      set((s) => ({
        data: { ...s.data, [entity]: [created, ...(s.data[entity] ?? [])] }
      }));
      return { ok: true, record: created };
    } catch (e) {
      set({ error: e?.message || "Failed to save" });
      return { ok: false, error: e?.message };
    }
  },

  update: async (entity, id, patch) => {
    set({ error: null });
    try {
      const updated = await updateEntity(entity, id, patch);
      set((s) => ({
        data: {
          ...s.data,
          [entity]: (s.data[entity] ?? []).map((r) =>
          r.id === id ? { ...r, ...updated } : r)

        }
      }));
      return { ok: true, record: updated };
    } catch (e) {
      set({ error: e?.message || "Failed to update" });
      return { ok: false, error: e?.message };
    }
  },

  remove: async (entity, id) => {
    set({ error: null });
    try {
      await removeEntity(entity, id);
      set((s) => ({
        data: { ...s.data, [entity]: (s.data[entity] ?? []).filter((r) => r.id !== id) }
      }));
      return { ok: true };
    } catch (e) {
      set({ error: e?.message || "Failed to delete" });
      return { ok: false, error: e?.message };
    }
  },

  // Re-fetch an entity from the server (used by the Refresh button).
  reset: (entity) => {
    if (entity) return get().load(entity, { force: true });
    // No entity → clear everything and let pages reload on mount.
    set({ data: {}, loaded: {}, loading: {} });
  }
}));
