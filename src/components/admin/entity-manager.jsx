"use client";

import * as React from "react";
import { Plus, Search, Pencil, Trash2, ImageOff, RotateCcw, Upload, X } from "lucide-react";
import { useAdminData } from "@/store/admin-data";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";
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
  singular,
  canCreate = true

}) {
  const mounted = useMounted();
  const { data, add, update, remove, load, reset, loading, error } = useAdminData();
  const records = data[entity] ?? [];
  const isLoading = loading?.[entity];
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [confirmId, setConfirmId] = React.useState(null);
  const [formError, setFormError] = React.useState("");

  React.useEffect(() => {
    if (mounted) load(entity);
  }, [mounted, entity, load]);

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
            onClick={() => reset(entity)}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted hover:border-brand hover:text-brand disabled:opacity-50"
            disabled={isLoading}
            title="Reload from server">

            <RotateCcw size={15} className={isLoading ? "animate-spin" : ""} /> Refresh
          </button>
          {canCreate &&
          <Button onClick={() => setCreating(true)}>
            <Plus size={18} /> Add {singular}
          </Button>
          }
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

      {/* Error banner */}
      {error &&
      <div className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">
          {error}
        </div>
      }

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
                    {isLoading ? "Loading…" : `No ${title.toLowerCase()} found.`}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted">
        {filtered.length} {filtered.length === 1 ? singular.toLowerCase() : title.toLowerCase()}
      </p>

      {/* Create / Edit dialog */}
      <EntityForm
        open={creating || !!editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
          setFormError("");
        }}
        fields={fields}
        singular={singular}
        initial={editing}
        error={formError}
        onSubmit={async (values) => {
          setFormError("");
          const res = editing ?
          await update(entity, editing.id, values) :
          await add(entity, values);
          if (res?.ok) {
            setCreating(false);
            setEditing(null);
          } else {
            setFormError(res?.error || "Something went wrong. Please try again.");
          }
        }} />
      

      {/* Delete confirm */}
      <Dialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="text-xl font-semibold">
            Delete this {singular.toLowerCase()}?
          </DialogTitle>
          <p className="mt-2 text-warmbrown/80">
            This {singular.toLowerCase()} will be removed from your store and will no
            longer be visible to customers. You can't undo this, so please make sure
            before you continue.
          </p>
          <div className="mt-5 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="flex-1 !bg-brand hover:!bg-brand-dark"
              onClick={async () => {
                if (confirmId) await remove(entity, confirmId);
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
  error,
  onSubmit

}) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (!open) return;
    const init = {};
    for (const f of fields) {
      let raw = initial?.[f.name];
      if (f.type === "image" && !raw && Array.isArray(initial?.images)) {
        raw = (initial?.images)[0];
      }
      if (f.type === "gallery") {
        // A multi-image field holds an array of URLs / data-URLs.
        const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
        init[f.name] = arr.filter(Boolean);
      } else
      if (f.type === "boolean")
      init[f.name] = raw === true || raw === "true" || raw === "t" || raw === "Yes" || raw === 1;else
      if (f.type === "tags") init[f.name] = Array.isArray(raw) ? raw.join(", ") : raw ?? "";else
      init[f.name] = raw ?? "";
    }
    setValues(init);
    setErrors({});
    // Re-populate only when the dialog opens or the record being edited changes
    // — NOT on every parent re-render. `fields` is a fresh array literal each
    // render, so depending on it here would reset the form (wiping in-progress
    // edits) whenever the parent re-renders (e.g. a background list refresh).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial?.id]);

  function set(name, v) {
    setValues((s) => ({ ...s, [name]: v }));
    // Clear a field's error as soon as the user edits it.
    setErrors((e) => e[name] ? { ...e, [name]: undefined } : e);
  }

  // Validate every field and return a { name: message } map of problems.
  function validate() {
    const errs = {};
    for (const f of fields) {
      if (f.readOnly) continue; // not user-editable → nothing to validate
      const raw = values[f.name];

      if (f.type === "gallery") {
        const arr = Array.isArray(raw) ? raw.filter(Boolean) : [];
        if (f.required && arr.length === 0) {
          errs[f.name] = `Please add at least one image.`;
        }
        continue;
      }

      const str = String(raw ?? "").trim();

      if (f.required && str === "") {
        errs[f.name] = `${f.label} is required.`;
        continue;
      }
      if (f.type === "number" && str !== "") {
        const n = Number(str);
        if (!Number.isFinite(n)) {
          errs[f.name] = "Enter a valid number.";
          continue;
        }
        const min = f.min ?? 0;
        if (n < min) errs[f.name] = `Must be ${min} or more.`;else
        if (f.max != null && n > f.max) errs[f.name] = `Must be ${f.max} or less.`;
      }
    }
    return errs;
  }

  function submit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const out = {};
    for (const f of fields) {
      const v = values[f.name];
      if (f.type === "number") {
        // Clamp within [min, max] so negatives / out-of-range never get saved,
        // even if the browser's native validation is bypassed. min defaults to 0.
        let n = Number(v) || 0;
        const min = f.min ?? 0;
        if (n < min) n = min;
        if (f.max != null && n > f.max) n = f.max;
        out[f.name] = n;
      } else
      if (f.type === "boolean")
      out[f.name] = v === true;else
      if (f.type === "gallery")
      out[f.name] = (Array.isArray(v) ? v : []).filter(Boolean);else
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
    // A gallery named "images" also feeds the single `image` used in some lists.
    if (Array.isArray(out.images) && out.images.length && !out.image) {
      out.image = out.images[0];
    }
    onSubmit(out);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle className="text-2xl font-semibold">
          {initial ? `Edit ${singular}` : `Add ${singular}`}
        </DialogTitle>
        {error &&
        <div className="mt-4 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">
            {error}
          </div>
        }
        <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) =>
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                {f.label} {f.required && !f.readOnly && <span className="text-brand">*</span>}
              </label>
              {f.readOnly ?
            <div className="w-full rounded-xl border border-border bg-beige/40 px-4 py-2.5 text-sm text-warmbrown">
                  {(() => {
                const v = values[f.name];
                if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
                return v !== undefined && v !== null && v !== "" ? String(v) : "—";
              })()}
                </div> :
            f.type === "boolean" ?
            <select
              value={values[f.name] ? "Yes" : "No"}
              onChange={(e) => set(f.name, e.target.value === "Yes")}
              className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand">

                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select> :
            f.type === "textarea" ?
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
            f.type === "gallery" ?
            <GalleryField
              value={Array.isArray(values[f.name]) ? values[f.name] : []}
              onChange={(arr) => set(f.name, arr)} /> :
            f.type === "image" ?
            <SingleImageField
              required={f.required}
              value={String(values[f.name] ?? "")}
              onChange={(v) => set(f.name, v)} /> :

            <input
              type={f.type === "number" ? "number" : "text"}
              required={f.required}
              min={f.type === "number" ? f.min ?? 0 : undefined}
              max={f.type === "number" ? f.max : undefined}
              step={f.type === "number" ? f.step ?? "any" : undefined}
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className={cn(
                "w-full rounded-xl border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand",
                errors[f.name] ? "border-brand" : "border-border"
              )} />

            }
              {errors[f.name] ?
            <p className="mt-1 text-xs text-brand">{errors[f.name]}</p> :
            f.hint ?
            <p className="mt-1 text-xs text-muted">{f.hint}</p> :
            null}
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

// Single-image field: a URL input plus an "upload from device" option.
function SingleImageField({ value = "", onChange }) {
  const fileRef = React.useRef(null);

  function onFile(e) {
    const file = (e.target.files || [])[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // `type="text"` (not "url") so device uploads, which produce long data: URLs,
  // aren't rejected by native URL validation. Required-ness is enforced by the
  // form's own validate().
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value?.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={value?.startsWith("data:") ? "Uploaded image ✓" : "https://…/image.jpg"}
          className="flex-1 rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          className="hidden" />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}>

          <Upload size={16} /> Upload
        </Button>
      </div>
      <Thumb src={value} large />
    </div>);

}

// Multi-image field: add images by URL or by uploading from the device
// (read as data-URLs). The first image acts as the cover.
function GalleryField({ value = [], onChange }) {
  const [url, setUrl] = React.useState("");
  const fileRef = React.useRef(null);

  function addUrl() {
    const u = url.trim();
    if (!u) return;
    onChange([...value, u]);
    setUrl("");
  }

  function removeAt(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function onFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    Promise.all(
      files.map(
        (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        })
      )
    ).then((datas) => {
      const valid = datas.filter(Boolean);
      if (valid.length) onChange([...value, ...valid]);
    });
    e.target.value = ""; // allow re-picking the same file
  }

  return (
    <div className="space-y-3">
      {value.length > 0 &&
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((src, i) =>
        <div key={i} className="relative">
              <Thumb src={src} large />
              <button
            type="button"
            onClick={() => removeAt(i)}
            aria-label="Remove image"
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/70 text-white hover:bg-brand">

                <X size={13} />
              </button>
              {i === 0 &&
          <span className="absolute bottom-1 left-1 rounded bg-charcoal/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Cover
                </span>
          }
            </div>
        )}
        </div>
      }

      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
          placeholder="https://…/image.jpg"
          className="flex-1 rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />

        <Button type="button" variant="outline" onClick={addUrl}>
          <Plus size={16} /> Add
        </Button>
      </div>

      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFiles}
          className="hidden" />

        <Button
          type="button"
          variant="secondary"
          onClick={() => fileRef.current?.click()}>

          <Upload size={16} /> Upload from device
        </Button>
        <p className="mt-1 text-xs text-muted">
          Add multiple image links or upload photos from your device. The first
          image is used as the cover.
        </p>
      </div>
    </div>);

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
