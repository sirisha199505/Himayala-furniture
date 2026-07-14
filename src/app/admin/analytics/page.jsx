"use client";

import * as React from "react";
import { Sofa, Inbox, ShoppingCart, Users } from "lucide-react";
import { getAnalytics } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

const traffic = [
{ month: "Jan", value: 62 },
{ month: "Feb", value: 70 },
{ month: "Mar", value: 58 },
{ month: "Apr", value: 81 },
{ month: "May", value: 92 },
{ month: "Jun", value: 100 }];

const sources = [
{ label: "Organic Search", pct: 46 },
{ label: "Direct", pct: 22 },
{ label: "Social", pct: 18 },
{ label: "Referral", pct: 9 },
{ label: "AI / LLM Referrals", pct: 5 }];

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-charcoal">
            Traffic Trend <span className="text-xs font-normal text-muted">(sample)</span>
          </h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {traffic.map((t) =>
            <div key={t.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                className="w-full rounded-t-lg bg-brand/80 transition-all hover:bg-brand"
                style={{ height: `${t.value}%` }} />

                <span className="text-xs text-muted">{t.month}</span>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-charcoal">
            Traffic Sources <span className="text-xs font-normal text-muted">(sample)</span>
          </h2>
          <div className="mt-5 space-y-4">
            {sources.map((s) =>
            <div key={s.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-warmbrown">{s.label}</span>
                  <span className="font-medium text-charcoal">{s.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-beige">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}
