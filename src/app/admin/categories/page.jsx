"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminCategories() {
  return (
    <EntityManager
      entity="categories"
      title="Categories"
      singular="Category"
      description="Organise your catalogue into shoppable categories."
      columns={[
      { key: "image", label: "Image", image: true },
      { key: "name", label: "Name" },
      { key: "tagline", label: "Tagline" },
      { key: "count", label: "Items" }]
      }
      fields={[
      { name: "name", label: "Name", required: true },
      { name: "tagline", label: "Tagline", placeholder: "Sink into comfort" },
      { name: "count", label: "Item Count", type: "number" },
      { name: "image", label: "Image URL", type: "image", full: true },
      { name: "description", label: "Description", type: "textarea" }]
      } />);

}
