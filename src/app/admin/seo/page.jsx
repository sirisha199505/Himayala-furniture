"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminSeo() {
  return (
    <EntityManager
      entity="seo"
      title="SEO Management"
      singular="Page SEO"
      description="Manage meta titles, descriptions and keywords for key pages."
      columns={[
      { key: "page", label: "Page" },
      { key: "title", label: "Meta Title" },
      { key: "description", label: "Meta Description" }]
      }
      fields={[
      { name: "page", label: "Page Name", required: true },
      { name: "title", label: "Meta Title", required: true, full: true },
      { name: "description", label: "Meta Description", type: "textarea" },
      { name: "keywords", label: "Keywords (comma separated)", type: "text", full: true }]
      } />);

}
