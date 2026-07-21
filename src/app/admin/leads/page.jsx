"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminLeads() {
  return (
    <EntityManager
      entity="leads"
      title="Leads"
      singular="Lead"
      description="Leads are enquiries customers submit through the website — the Enquire Now, Book Consultation, Request Quote, Contact and newsletter forms all land here. Follow up with each person and track their status (New → Contacted → Quoted → Won/Lost)."
      columns={[
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "product", label: "Interest" },
      {
        key: "message",
        label: "Message",
        render: (r) =>
        <span className="line-clamp-2 text-charcoal">{r.message || "—"}</span>

      },
      {
        key: "status",
        label: "Status",
        render: (r) => {
          const map = {
            New: "bg-brand/10 text-brand",
            Contacted: "bg-bronze/15 text-walnut",
            Quoted: "bg-amber-100 text-amber-700",
            Won: "bg-success/10 text-success",
            Lost: "bg-gray-100 text-gray-500"
          };
          const s = String(r.status);
          return (
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[s] ?? "bg-beige text-warmbrown"}`}>
                {s}
              </span>);

        }
      },
      { key: "date", label: "Date" }]
      }
      fields={[
      { name: "name", label: "Name", required: true },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email", type: "email" },
      { name: "product", label: "Product / Interest", full: true },
      { name: "message", label: "Message", type: "textarea", full: true },
      { name: "city", label: "City" },
      { name: "date", label: "Date", placeholder: "2026-06-23" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["New", "Contacted", "Quoted", "Won", "Lost"]
      }]
      } />);

}
