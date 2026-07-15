"use client";

import * as React from "react";
import { Sofa, Inbox, ShoppingCart, Users } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { getAnalytics } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

export default function AdminAnalytics() {
  const mounted = useMounted();
  const [summary, setSummary] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!mounted) return;
    getAnalytics().
    then(setSummary).
    catch((e) => setError(e?.message || "Failed to load analytics"));
  }, [mounted]);

  if (!mounted) return null;

  const kpis = [
  { label: "Products", value: summary?.products ?? "—", icon: Sofa },
  { label: "Leads", value: summary?.leads ?? "—", icon: Inbox },
  { label: "Orders", value: summary?.orders ?? "—", icon: ShoppingCart },
  { label: "Customers", value: summary?.customers ?? "—", icon: Users }];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Analytics</h1>
        <p className="mt-1 text-warmbrown/70">Live figures from your catalogue &amp; CRM.</p>
      </div>

      {error &&
      <div className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">{error}</div>
      }

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) =>
        <div key={k.label} className="rounded-2xl border border-border bg-surface p-5">
            <k.icon size={20} className="text-brand" />
            <div className="mt-4 font-display text-2xl font-bold text-charcoal">{k.value}</div>
            <div className="text-sm text-muted">{k.label}</div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Total revenue (from orders)</span>
          <span className="font-display text-xl font-bold text-charcoal">
            {summary ? formatPrice(summary.revenue) : "—"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <BarChart3 size={28} className="text-muted" />
        <h2 className="mt-3 font-display text-lg font-semibold text-charcoal">
          Website traffic analytics
        </h2>
        <p className="mt-1 max-w-md text-sm text-warmbrown/70">
          Traffic trends and sources will appear here once a web-analytics
          provider (e.g. Google Analytics or Plausible) is connected.
        </p>
      </div>
    </div>);

}
