"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

const catSlugs = categories.map((c) => c.slug);

export default function AdminProducts() {
  return (
    <EntityManager
      entity="products"
      title="Products"
      singular="Product"
      description="Manage your furniture catalogue — add, edit and remove products."
      columns={[
      {
        key: "image",
        label: "Image",
        render: (r) => {
          const src = r.images?.[0] ?? r.image;
          return src ?
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="h-12 w-12 rounded-lg object-cover" /> :

          <div className="h-12 w-12 rounded-lg bg-beige" />;

        }
      },
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Price",
        render: (r) => Number(r.price) ? formatPrice(Number(r.price)) : "On Request"
      },
      { key: "rating", label: "Rating", render: (r) => `★ ${r.rating ?? "—"}` }]
      }
      fields={[
      { name: "name", label: "Product Name", required: true },
      { name: "category", label: "Category", type: "select", options: catSlugs, required: true },
      { name: "price", label: "Price (₹)", type: "number", min: 0 },
      { name: "mrp", label: "MRP (₹)", type: "number", min: 0 },
      { name: "rating", label: "Rating (0–5)", type: "number", min: 0, max: 5, step: 0.1 },
      { name: "reviews", label: "Reviews", type: "number", min: 0, step: 1 },
      { name: "warranty", label: "Warranty", placeholder: "5-Year Warranty" },
      {
        name: "images",
        label: "Product Images",
        type: "gallery",
        full: true,
        hint: "Add multiple photos — e.g. different angles or a 2-person workstation. The first image is the cover."
      },
      { name: "shortDescription", label: "Short Description", type: "textarea" },
      { name: "description", label: "Full Description", type: "textarea" },
      { name: "materials", label: "Materials (comma separated)", type: "tags", full: true },
      { name: "badges", label: "Badges (comma separated)", type: "tags", full: true }]
      } />);

}
