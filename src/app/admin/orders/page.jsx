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

// Turn an order's line items into a readable product summary.
function productSummary(r) {
  const items = r.lineItems || r.line_items || [];
  if (Array.isArray(items) && items.length) {
    return items.
    map((li) => `${li.name}${li.qty > 1 ? ` ×${li.qty}` : ""}`).
    join(", ");
  }
  return "—";
}

export default function AdminOrders() {
  return (
    <EntityManager
      entity="orders"
      title="Orders"
      singular="Order"
      description="Recent orders across all channels. You can update the order status."
      canCreate={false}
      columns={[
      { key: "code", label: "Order" },
      { key: "customer", label: "Customer" },
      {
        key: "products",
        label: "Products",
        render: (r) =>
        <span className="line-clamp-2 text-charcoal">{productSummary(r)}</span>

      },
      { key: "items", label: "Qty" },
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
      { name: "code", label: "Order Code", readOnly: true },
      { name: "customer", label: "Customer", readOnly: true },
      { name: "items", label: "Qty", type: "number", readOnly: true },
      { name: "total", label: "Total (₹)", type: "number", readOnly: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["Processing", "In Production", "Out for Delivery", "Delivered", "Cancelled"]
      },
      { name: "date", label: "Date", readOnly: true }]
      } />);

}
