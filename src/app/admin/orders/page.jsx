"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { formatPrice } from "@/lib/utils";

const statusColor = {
  Delivered: "bg-success/10 text-success",
  "In Production": "bg-bronze/15 text-walnut",
  "Out for Delivery": "bg-brand/10 text-brand",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-beige text-warmbrown"
};

export default function AdminOrders() {
  return (
    <EntityManager
      entity="orders"
      title="Orders"
      singular="Order"
      description="Recent orders across all channels."
      columns={[
      { key: "code", label: "Order" },
      { key: "customer", label: "Customer" },
      { key: "items", label: "Items" },
      { key: "total", label: "Total", render: (r) => formatPrice(r.total) },
      {
        key: "status",
        label: "Status",
        render: (r) =>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[r.status] ?? "bg-beige text-warmbrown"}`}>
              {r.status}
            </span>

      },
      { key: "date", label: "Date" }]
      }
      fields={[
      { name: "code", label: "Order Code", placeholder: "#HFM-3042" },
      { name: "customer", label: "Customer", required: true },
      { name: "items", label: "Items", type: "number" },
      { name: "total", label: "Total (₹)", type: "number" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Processing", "In Production", "Out for Delivery", "Delivered", "Cancelled"]
      },
      { name: "date", label: "Date", placeholder: "2026-06-20" }]
      } />);

}
