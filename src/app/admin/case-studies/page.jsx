"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminCaseStudies() {
  return (
    <EntityManager
      entity="caseStudies"
      title="Case Studies"
      singular="Case Study"
      description="Showcase completed projects with requirements, solutions and outcomes."
      columns={[
      { key: "cover", label: "Cover", image: true },
      { key: "title", label: "Title" },
      { key: "client", label: "Client" },
      { key: "location", label: "Location" },
      { key: "category", label: "Category" }]
      }
      fields={[
      { name: "title", label: "Title", required: true, full: true },
      { name: "client", label: "Client" },
      { name: "location", label: "Location" },
      { name: "category", label: "Category", type: "select", options: ["Residential", "Commercial"] },
      { name: "cover", label: "Cover Image URL", type: "image", full: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "requirement", label: "Client Requirement", type: "textarea" },
      { name: "solution", label: "Solution", type: "textarea" },
      { name: "outcome", label: "Outcome", type: "textarea" },
      { name: "challenges", label: "Challenges (comma separated)", type: "tags", full: true },
      { name: "furnitureUsed", label: "Furniture Used (comma separated)", type: "tags", full: true }]
      } />);

}
