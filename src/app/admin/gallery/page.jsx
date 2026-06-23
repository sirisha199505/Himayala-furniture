"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminGallery() {
  return (
    <EntityManager
      entity="gallery"
      title="Gallery"
      singular="Image"
      description="Add furniture and project images by URL. New images appear on the public gallery."
      columns={[
      { key: "image", label: "Image", image: true },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "location", label: "Location" }]
      }
      fields={[
      { name: "image", label: "Image URL", type: "image", required: true, full: true },
      { name: "title", label: "Title", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Living Room", "Bedroom", "Dining", "Office", "Commercial"],
        required: true
      },
      { name: "location", label: "Location", placeholder: "Hyderabad" },
      {
        name: "span",
        label: "Tile Size",
        type: "select",
        options: ["normal", "tall", "wide"]
      }]
      } />);

}
