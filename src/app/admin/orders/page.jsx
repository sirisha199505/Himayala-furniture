"use client";

import { formatPrice } from "@/lib/utils";

const orders = [
{ id: "#HFM-3041", customer: "Ananya Reddy", items: 3, total: 124970, status: "Delivered", date: "2026-06-18" },
{ id: "#HFM-3040", customer: "Nimbus Technologies", items: 64, total: 1840000, status: "In Production", date: "2026-06-17" },
{ id: "#HFM-3039", customer: "Vikram Singh", items: 1, total: 64990, status: "Out for Delivery", date: "2026-06-16" },
{ id: "#HFM-3038", customer: "Sneha Iyer", items: 2, total: 56980, status: "Processing", date: "2026-06-15" },
{ id: "#HFM-3037", customer: "Arjun Nair", items: 5, total: 98750, status: "Delivered", date: "2026-06-12" }];

const statusColor = {
  Delivered: "bg-success/10 text-success",
  "In Production": "bg-bronze/15 text-walnut",
  "Out for Delivery": "bg-brand/10 text-brand",
  Processing: "bg-amber-100 text-amber-700"
};

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Orders</h1>
        <p className="mt-1 text-warmbrown/70">Recent orders across all channels.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) =>
              <tr key={o.id} className="hover:bg-beige/40">
                  <td className="px-5 py-3 font-semibold text-charcoal">{o.id}</td>
                  <td className="px-5 py-3 text-warmbrown">{o.customer}</td>
                  <td className="px-5 py-3 text-warmbrown">{o.items}</td>
                  <td className="px-5 py-3 font-medium text-charcoal">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[o.status] ?? "bg-beige text-warmbrown"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{o.date}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}
