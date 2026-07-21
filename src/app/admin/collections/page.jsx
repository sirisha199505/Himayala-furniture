"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { categories } from "@/data/categories";

const catSlugs = categories.map((c) => c.slug).join(", ");

export default function AdminCollections() {
  return (
    <EntityManager
      entity="collections"
      title="Collections"
      singular="Collection"
      description="Curated groups shown as 'Featured Collections' on the homepage and the /collections pages. Each collection pulls in products from the categories you list."
      columns={[
      { key: "image", label: "Image", image: true },
      { key: "name", label: "Name" },
      { key: "subtitle", label: "Subtitle" },
      { key: "items", label: "Items Label" },
      { key: "sortOrder", label: "Order" }]
      }
      fields={[
      { name: "name", label: "Name", required: true, full: true, placeholder: "Residential Homes" },
      { name: "subtitle", label: "Subtitle", placeholder: "Furnish every room" },
      { name: "items", label: "Items Label", placeholder: "200+ pieces" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "image", label: "Hero Image", type: "image", full: true, required: true },
      { name: "accent", label: "Accent Colour (hex)", placeholder: "#c54a11" },
      {
        name: "categorySlugs",
        label: "Categories in this collection",
        type: "tags",
        full: true,
        hint: `Comma-separated category slugs. Available: ${catSlugs}`
      },
      { name: "sortOrder", label: "Sort Order", type: "number", hint: "Lower shows first." }]
      } />);

}
