"use client";

import { formatPrice } from "@/lib/utils";

const customers = [
{ name: "Ananya Reddy", city: "Hyderabad", orders: 3, spent: 184960, since: "2024" },
{ name: "Nimbus Technologies", city: "Bengaluru", orders: 2, spent: 2640000, since: "2025" },
{ name: "Priya Menon (Designer)", city: "Chennai", orders: 11, spent: 980000, since: "2023" },
{ name: "Vikram Singh", city: "Pune", orders: 1, spent: 64990, since: "2026" },
{ name: "Sneha Iyer", city: "Mumbai", orders: 2, spent: 56980, since: "2026" }];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Customers</h1>
        <p className="mt-1 text-warmbrown/70">Your customer base at a glance.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Orders</th>
                <th className="px-5 py-3 font-semibold">Lifetime Value</th>
                <th className="px-5 py-3 font-semibold">Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) =>
              <tr key={c.name} className="hover:bg-beige/40">
                  <td className="px-5 py-3 font-medium text-charcoal">{c.name}</td>
                  <td className="px-5 py-3 text-warmbrown">{c.city}</td>
                  <td className="px-5 py-3 text-warmbrown">{c.orders}</td>
                  <td className="px-5 py-3 font-medium text-charcoal">{formatPrice(c.spent)}</td>
                  <td className="px-5 py-3 text-muted">{c.since}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}
