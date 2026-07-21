"use client";

import * as React from "react";
import { Minus, Plus, Check, Loader2 } from "lucide-react";
import { useAdminData } from "@/store/admin-data";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";

function statusOf(stock, inStock) {
  if (!inStock || stock <= 0) return "Made to Order";
  return stock < 8 ? "Low Stock" : "In Stock";
}

const color = {
  "In Stock": "bg-success/10 text-success",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Made to Order": "bg-beige text-warmbrown"
};

export default function AdminInventory() {
  const mounted = useMounted();
  const { data, load, update, loading, error } = useAdminData();

  React.useEffect(() => {
    if (mounted) load("products");
  }, [mounted, load]);

  if (!mounted) return null;

  const products = data.products ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Inventory</h1>
        <p className="mt-1 text-warmbrown/70">
          Update the number of units in stock for each product.
        </p>
      </div>

      {error &&
      <div className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">
          {error}
        </div>
      }

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Units</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) =>
              <InventoryRow key={p.id} product={p} update={update} />
              )}
              {products.length === 0 &&
              <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted">
                    {loading?.products ? "Loading…" : "No products yet."}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}

function InventoryRow({ product, update }) {
  const initial = Math.max(0, Number(product.stock ?? 0));
  const [units, setUnits] = React.useState(initial);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // Keep local state in sync if the underlying record reloads.
  React.useEffect(() => {
    setUnits(Math.max(0, Number(product.stock ?? 0)));
  }, [product.stock]);

  const dirty = units !== initial;
  const status = statusOf(units, product.inStock);

  function setSafe(n) {
    setUnits(Math.max(0, Number.isFinite(n) ? Math.floor(n) : 0));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    // Units in stock also drives the in-stock flag so the storefront stays consistent.
    const res = await update("products", product.id, { stock: units, inStock: units > 0 });
    setSaving(false);
    if (res?.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <tr className="hover:bg-beige/40">
      <td className="px-5 py-3 font-medium text-charcoal">{String(product.name)}</td>
      <td className="px-5 py-3 text-warmbrown">{String(product.category ?? "—")}</td>
      <td className="px-5 py-3">
        <div className="inline-flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Decrease units"
            onClick={() => setSafe(units - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-charcoal transition-colors hover:border-brand hover:text-brand">

            <Minus size={15} />
          </button>
          <input
            type="number"
            min={0}
            value={units}
            onChange={(e) => setSafe(Number(e.target.value))}
            className="w-16 rounded-lg border border-border bg-ivory px-2 py-1.5 text-center text-sm outline-none focus:border-brand" />

          <button
            type="button"
            aria-label="Increase units"
            onClick={() => setSafe(units + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-charcoal transition-colors hover:border-brand hover:text-brand">

            <Plus size={15} />
          </button>
        </div>
      </td>
      <td className="px-5 py-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-5 py-3 text-right">
        {saved ?
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <Check size={16} /> Saved
          </span> :

        <Button
          size="sm"
          variant="outline"
          disabled={!dirty || saving}
          onClick={save}>

            {saving ? <Loader2 size={15} className="animate-spin" /> : "Save"}
          </Button>
        }
      </td>
    </tr>);

}
