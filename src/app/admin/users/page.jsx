"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function AdminUsers() {
  return (
    <EntityManager
      entity="users"
      title="User Management"
      singular="User"
      description="Manage admin users and their roles. (Super Admin only)"
      columns={[
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      {
        key: "role",
        label: "Role",
        render: (r) => r.role === "super" ? "Super Admin" : "Content Manager"
      },
      { key: "status", label: "Status" }]
      }
      fields={[
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", required: true },
      { name: "role", label: "Role", type: "select", options: ["super", "content"], required: true },
      { name: "status", label: "Status", type: "select", options: ["Active", "Invited", "Disabled"] }]
      } />);

}
