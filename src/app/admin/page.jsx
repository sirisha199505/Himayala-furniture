"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sofa, Images, Inbox, Newspaper, TrendingUp, IndianRupee,
  ArrowUpRight, Users, ShoppingCart } from
"lucide-react";
import { useAdminData } from "@/store/admin-data";
import { useAdminAuth } from "@/store/admin-auth";
import { useMounted } from "@/lib/use-mounted";

export default function AdminDashboard() {
  const mounted = useMounted();
  const { data, load } = useAdminData();
  const { user } = useAdminAuth();

  React.useEffect(() => {
    if (!mounted) return;
    ["products", "gallery", "blogs", "leads"].forEach((e) => load(e));
  }, [mounted, load]);

  if (!mounted) return null;

  const counts = {
    products: (data.products ?? []).length,
    gallery: (data.gallery ?? []).length,
    blogs: (data.blogs ?? []).length,
    leads: (data.leads ?? []).length
  };

  const stats = [
  { label: "Products", value: counts.products, icon: Sofa, href: "/admin/products", trend: "+3 this month" },
  { label: "Gallery Images", value: counts.gallery, icon: Images, href: "/admin/gallery", trend: "+5 this month" },
  { label: "New Leads", value: counts.leads, icon: Inbox, href: "/admin/leads", trend: "+12 this week" },
  { label: "Blog Posts", value: counts.blogs, icon: Newspaper, href: "/admin/blogs", trend: "+1 this month" }];

  const superStats = [
  { label: "Revenue (MTD)", value: "₹18.4L", icon: IndianRupee, trend: "+22% MoM" },
  { label: "Orders", value: "146", icon: ShoppingCart, trend: "+8% MoM" },
  { label: "Customers", value: "2,310", icon: Users, trend: "+5% MoM" },
  { label: "Conversion", value: "4.8%", icon: TrendingUp, trend: "+0.6pt" }];

  const recentLeads = (data.leads ?? []).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">
          Welcome back, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-warmbrown/70">
          Here's what's happening with Himalayan Furniture Mart today.
        </p>
      </div>

      {/* Content stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) =>
        <Link
          key={s.label}
          href={s.href}
          className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft">
          
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <s.icon size={22} />
              </span>
              <ArrowUpRight size={18} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-4 font-display text-3xl font-bold text-charcoal">
              {s.value}
            </div>
            <div className="text-sm text-muted">{s.label}</div>
            <div className="mt-2 text-xs font-medium text-success">{s.trend}</div>
          </Link>
        )}
      </div>

      {/* Super-admin commerce stats */}
      {user?.role === "super" &&
      <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-charcoal">
            Business Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {superStats.map((s) =>
          <div key={s.label} className="rounded-2xl bg-charcoal p-5 text-white">
                <s.icon size={22} className="text-bronze" />
                <div className="mt-4 font-display text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-white/60">{s.label}</div>
                <div className="mt-2 text-xs font-medium text-bronze">{s.trend}</div>
              </div>
          )}
          </div>
        </div>
      }

      {/* Recent leads */}
      <div className="rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-charcoal">
            Recent Enquiries
          </h2>
          <Link href="/admin/leads" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-semibold">Lead</th>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentLeads.map((l) =>
              <tr key={l.id} className="hover:bg-beige/40">
                  <td className="px-5 py-3 font-medium text-charcoal">{l.name}</td>
                  <td className="px-5 py-3 text-warmbrown">{l.product}</td>
                  <td className="px-5 py-3 text-warmbrown">{l.city}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={l.status} />
                  </td>
                  <td className="px-5 py-3 text-muted">{l.date}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}

function StatusPill({ status }) {
  const map = {
    New: "bg-brand/10 text-brand",
    Contacted: "bg-bronze/15 text-walnut",
    Quoted: "bg-amber-100 text-amber-700",
    Won: "bg-success/10 text-success"
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[status] ?? "bg-beige text-warmbrown"}`}>
      {status}
    </span>);

}
