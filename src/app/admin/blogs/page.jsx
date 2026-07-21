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
      { name: "author", label: "Author", required: true },
      { name: "authorRole", label: "Author Role", placeholder: "e.g. Lead Interior Designer" },
      { name: "date", label: "Date", required: true, placeholder: "2026-06-23", hint: "Publish date in YYYY-MM-DD format." },
      { name: "cover", label: "Cover Image", type: "image", full: true, required: true },
      {
        name: "excerpt",
        label: "Excerpt (short summary)",
        type: "textarea",
        required: true,
        hint: "A 1–2 sentence summary shown on blog cards and previews (not the full article)."
      },
      { name: "content", label: "Content (Markdown)", type: "textarea", full: true, required: true },
      { name: "tags", label: "Tags (comma separated)", type: "tags", full: true }]
      } />);

}
