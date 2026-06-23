"use client";

import { EntityManager } from "@/components/admin/entity-manager";
import { faqCategories } from "@/data/faqs";

export default function AdminFaqs() {
  return (
    <EntityManager
      entity="faqs"
      title="FAQs"
      singular="FAQ"
      description="Manage the questions and answers shown on the FAQ page."
      columns={[
      { key: "question", label: "Question" },
      { key: "category", label: "Category" }]
      }
      fields={[
      { name: "question", label: "Question", required: true, full: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "select", options: faqCategories, required: true }]
      } />);

}
