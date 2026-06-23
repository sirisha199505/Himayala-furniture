"use client";

import * as React from "react";
import { Check, Save } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  const [saved, setSaved] = React.useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Settings</h1>
        <p className="mt-1 text-warmbrown/70">Manage your store's general settings.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card title="Store Information">
          <Field label="Store Name" defaultValue={SITE.name} />
          <Field label="Tagline" defaultValue={SITE.tagline} />
          <Field label="Phone" defaultValue={SITE.phoneDisplay} />
          <Field label="Email" defaultValue={SITE.email} type="email" />
          <Field label="WhatsApp Number" defaultValue={SITE.whatsapp} />
        </Card>

        <Card title="Social Links">
          <Field label="Instagram" defaultValue={SITE.social.instagram} />
          <Field label="Facebook" defaultValue={SITE.social.facebook} />
          <Field label="YouTube" defaultValue={SITE.social.youtube} />
        </Card>

        <Card title="Address">
          <Field label="City" defaultValue={SITE.address.locality} />
          <Field label="State" defaultValue={SITE.address.region} />
          <Field label="Business Hours" defaultValue={SITE.hours} />
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg">
            <Save size={18} /> Save Changes
          </Button>
          {saved &&
          <span className="flex items-center gap-1.5 text-sm font-medium text-success">
              <Check size={16} /> Settings saved
            </span>
          }
        </div>
      </form>
    </div>);

}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>);

}

function Field({
  label,
  defaultValue,
  type = "text"

}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />
      
    </div>);

}
