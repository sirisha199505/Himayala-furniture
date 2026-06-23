"use client";

import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

const kpis = [
{ label: "Sessions (30d)", value: "48,210", trend: "+18%", icon: Eye },
{ label: "Unique Visitors", value: "31,540", trend: "+12%", icon: Users },
{ label: "Enquiries", value: "642", trend: "+24%", icon: MousePointerClick },
{ label: "Conversion Rate", value: "4.8%", trend: "+0.6pt", icon: TrendingUp }];

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Analytics</h1>
        <p className="mt-1 text-warmbrown/70">Performance overview (demo data).</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) =>
        <div key={k.label} className="rounded-2xl border border-border bg-surface p-5">
            <k.icon size={20} className="text-brand" />
            <div className="mt-4 font-display text-2xl font-bold text-charcoal">{k.value}</div>
            <div className="text-sm text-muted">{k.label}</div>
            <div className="mt-2 text-xs font-medium text-success">{k.trend}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-charcoal">Traffic Trend</h2>
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
          <h2 className="font-display text-lg font-semibold text-charcoal">Traffic Sources</h2>
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
