"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminStories() {
  return (
    <EntityManager
      entity="stories"
      title="Stories"
      singular="Story"
      description="Manage the 'Why Himalayan' brand stories."
      columns={[
      { key: "cover", label: "Cover", image: true },
      { key: "title", label: "Title" },
      { key: "kicker", label: "Kicker" }]
      }
      fields={[
      { name: "title", label: "Title", required: true, full: true },
      { name: "kicker", label: "Kicker", placeholder: "Where it began" },
      { name: "cover", label: "Cover Image URL", type: "image", full: true },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "body", label: "Body (Markdown)", type: "textarea", full: true }]
      } />);

}
