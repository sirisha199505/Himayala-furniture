"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { blogCategories } from "@/data/blog";

export default function AdminBlogs() {
  return (
    <EntityManager
      entity="blogs"
      title="Blogs"
      singular="Post"
      description="Write and manage blog articles and guides."
      columns={[
      { key: "cover", label: "Cover", image: true },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "author", label: "Author" },
      { key: "date", label: "Date" }]
      }
      fields={[
      { name: "title", label: "Title", required: true, full: true },
      { name: "category", label: "Category", type: "select", options: blogCategories, required: true },
      { name: "author", label: "Author" },
      { name: "authorRole", label: "Author Role" },
      { name: "date", label: "Date", placeholder: "2026-06-23" },
      { name: "cover", label: "Cover Image URL", type: "image", full: true },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content (Markdown)", type: "textarea", full: true },
      { name: "tags", label: "Tags (comma separated)", type: "tags", full: true }]
      } />);

}
