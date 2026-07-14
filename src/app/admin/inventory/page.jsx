"use client";

import * as React from "react";
import { useAdminData } from "@/store/admin-data";
import { useMounted } from "@/lib/use-mounted";

export default function AdminInventory() {
  const mounted = useMounted();
  const { data, load, loading } = useAdminData();

  React.useEffect(() => {
    if (mounted) load("products");
  }, [mounted, load]);

  if (!mounted) return null;

  const products = data.products ?? [];
  const rows = products.map((p) => {
    const stock = Number(p.stock ?? 0);
    const status =
    !p.inStock || stock === 0 ? "Made to Order" : stock < 8 ? "Low Stock" : "In Stock";
    return { id: p.id, name: String(p.name), category: String(p.category ?? "—"), stock, status };
  });

  const color = {
    "In Stock": "bg-success/10 text-success",
    "Low Stock": "bg-amber-100 text-amber-700",
    "Made to Order": "bg-beige text-warmbrown"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Inventory</h1>
        <p className="mt-1 text-warmbrown/70">Stock levels across the catalogue.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Units</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) =>
              <tr key={r.id} className="hover:bg-beige/40">
                  <td className="px-5 py-3 font-medium text-charcoal">{r.name}</td>
                  <td className="px-5 py-3 text-warmbrown">{r.category}</td>
                  <td className="px-5 py-3 text-warmbrown">{r.stock}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              )}
              {rows.length === 0 &&
              <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-muted">
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
