"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { formatPrice } from "@/lib/utils";

export default function AdminCustomers() {
  return (
    <EntityManager
      entity="customers"
      title="Customers"
      singular="Customer"
      description="Your customer base at a glance. Customers are added automatically from orders placed at checkout."
      canCreate={false}
      columns={[
      { key: "name", label: "Customer" },
      { key: "email", label: "Email" },
      { key: "city", label: "City" },
      { key: "orders", label: "Orders" },
      { key: "spent", label: "Lifetime Value", render: (r) => formatPrice(r.spent) },
      { key: "since", label: "Since" }]
      }
      fields={[
      { name: "name", label: "Customer", required: true },
      { name: "email", label: "Email" },
      { name: "city", label: "City" },
      { name: "orders", label: "Orders", type: "number" },
      { name: "spent", label: "Lifetime Value (₹)", type: "number" },
      { name: "since", label: "Since (year)", placeholder: "2024" }]
      } />);

}
