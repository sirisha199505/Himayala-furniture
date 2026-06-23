"use client";

import * as React from "react";
import { Plus, Search, Pencil, Trash2, ImageOff, RotateCcw } from "lucide-react";
import { useAdminData } from "@/store/admin-data";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle } from
"@/components/ui/dialog";

export function EntityManager({
  entity,
  title,
  description,
  columns,
  fields,
  singular

}) {
  const mounted = useMounted();
  const { data, add, update, remove, reset } = useAdminData();
  const records = data[entity] ?? [];
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [confirmId, setConfirmId] = React.useState(null);

  if (!mounted) return null;

  const filtered = query ?
  records.filter((r) =>
  JSON.stringify(r).toLowerCase().includes(query.toLowerCase())
  ) :
  records;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">{title}</h1>
          {description && <p className="mt-1 text-warmbrown/70">{description}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (confirm("Reset all admin data to defaults? Your local edits will be lost.")) reset();
            }}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted hover:border-brand hover:text-brand"
            title="Reset to defaults">
            
            <RotateCcw size={15} /> Reset
          </button>
          <Button onClick={() => setCreating(true)}>
            <Plus size={18} /> Add {singular}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}…`}
          className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand" />
        
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                {columns.map((c) =>
                <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
                )}
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) =>
              <tr key={r.id} className="hover:bg-beige/40">
                  {columns.map((c) =>
                <td key={c.key} className="px-4 py-3 align-middle">
                      {c.render ?
                  c.render(r) :
                  c.image ?
                  <Thumb src={r[c.key]} /> :

                  <span className="line-clamp-1 text-charcoal">
                          {String(r[c.key] ?? "—")}
                        </span>
                  }
                    </td>
                )}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <IconBtn label="Edit" onClick={() => setEditing(r)}>
                        <Pencil size={15} />
                      </IconBtn>
                      <IconBtn label="Delete" danger onClick={() => setConfirmId(r.id)}>
                        <Trash2 size={15} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.length === 0 &&
              <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-muted">
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted">
        {filtered.length} {filtered.length === 1 ? singular.toLowerCase() : title.toLowerCase()} ·
        Changes are saved to your browser (demo persistence).
      </p>

      {/* Create / Edit dialog */}
      <EntityForm
        open={creating || !!editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        fields={fields}
        singular={singular}
        initial={editing}
        onSubmit={(values) => {
          if (editing) update(entity, editing.id, values);else
          add(entity, values);
          setCreating(false);
          setEditing(null);
        }} />
      

      {/* Delete confirm */}
      <Dialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="text-xl font-semibold">Delete {singular}?</DialogTitle>
          <p className="mt-2 text-warmbrown/80">
            This will remove the item from your local data. This cannot be undone.
          </p>
          <div className="mt-5 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="flex-1 !bg-brand hover:!bg-brand-dark"
              onClick={() => {
                if (confirmId) remove(entity, confirmId);
                setConfirmId(null);
              }}>
              
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}

function EntityForm({
  open,
  onClose,
  fields,
  initial,
  singular,
  onSubmit

}) {
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    if (!open) return;
    const init = {};
    for (const f of fields) {
      let raw = initial?.[f.name];
      if (f.type === "image" && !raw && Array.isArray(initial?.images)) {
        raw = (initial?.images)[0];
      }
      if (f.type === "tags") init[f.name] = Array.isArray(raw) ? raw.join(", ") : raw ?? "";else
      init[f.name] = raw ?? "";
    }
    setValues(init);
  }, [open, initial, fields]);

  function set(name, v) {
    setValues((s) => ({ ...s, [name]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const out = {};
    for (const f of fields) {
      const v = values[f.name];
      if (f.type === "number") out[f.name] = Number(v) || 0;else
      if (f.type === "tags")
      out[f.name] = String(v ?? "").
      split(",").
      map((x) => x.trim()).
      filter(Boolean);else
      out[f.name] = v ?? "";
    }
    // keep an images[] array in sync when an image field exists (for site rendering)
    if (fields.some((f) => f.type === "image") && out.image && !out.images) {
      out.images = [out.image];
    }
    onSubmit(out);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle className="text-2xl font-semibold">
          {initial ? `Edit ${singular}` : `Add ${singular}`}
        </DialogTitle>
        <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) =>
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                {f.label}
              </label>
              {f.type === "textarea" ?
            <textarea
              rows={4}
              required={f.required}
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" /> :

            f.type === "select" ?
            <select
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand">
              
                  <option value="">Select…</option>
                  {f.options?.map((o) =>
              <option key={o} value={o}>{o}</option>
              )}
                </select> :
            f.type === "image" ?
            <div className="space-y-2">
                  <input
                type="url"
                required={f.required}
                value={String(values[f.name] ?? "")}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder="https://…/image.jpg"
                className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />
              
                  <Thumb src={String(values[f.name] ?? "")} large />
                </div> :

            <input
              type={f.type === "number" ? "number" : "text"}
              required={f.required}
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />

            }
            </div>
          )}
          <div className="sm:col-span-2 mt-2 flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {initial ? "Save Changes" : `Add ${singular}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>);

}

function Thumb({ src, large }) {
  const size = large ? "h-32 w-full" : "h-12 w-12";
  if (!src)
  return (
    <div className={`flex ${size} items-center justify-center rounded-lg bg-beige text-muted`}>
        <ImageOff size={18} />
      </div>);

  return (
    <div className={`relative ${size} overflow-hidden rounded-lg bg-beige`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>);

}

function IconBtn({
  children,
  label,
  danger,
  onClick

}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
      danger ?
      "text-muted hover:bg-brand/10 hover:text-brand" :
      "text-muted hover:bg-beige hover:text-charcoal"}`
      }>
      
      {children}
    </button>);

}
