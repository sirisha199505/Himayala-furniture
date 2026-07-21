"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminLocations() {
  return (
    <EntityManager
      entity="locations"
      title="Store Locations"
      singular="Location"
      description="Manage the showrooms and branches shown on the Contact page."
      columns={[
      { key: "name", label: "Name" },
      { key: "address", label: "Address" },
      { key: "phone", label: "Phone" },
      {
        key: "isFlagship",
        label: "Flagship",
        render: (r) => r.isFlagship ? "Yes" : "—"
      }]
      }
      fields={[
      { name: "name", label: "Branch / City Name", required: true, full: true, placeholder: "Hyderabad (Flagship)" },
      { name: "address", label: "Address", type: "textarea", required: true, full: true },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email", type: "email" },
      { name: "hours", label: "Business Hours", placeholder: "Mon–Sat, 10am–8pm" },
      {
        name: "mapUrl",
        label: "Google Maps Embed URL",
        full: true,
        hint: "Optional. A Google Maps embed/link URL for this branch."
      },
      {
        name: "isFlagship",
        label: "Flagship Showroom?",
        type: "boolean",
        hint: "Marks this as the main showroom."
      }]
      } />);

}
