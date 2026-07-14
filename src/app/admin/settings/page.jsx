"use client";

import * as React from "react";
import { Check, Save } from "lucide-react";
import { SITE } from "@/lib/site";
import { getSettings, saveSettings } from "@/lib/api";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";

// Falls back to the site constants until a value has been saved to the backend.
const DEFAULTS = {
  storeName: SITE.name,
  tagline: SITE.tagline,
  phone: SITE.phoneDisplay,
  email: SITE.email,
  whatsapp: SITE.whatsapp,
  instagram: SITE.social?.instagram,
  facebook: SITE.social?.facebook,
  youtube: SITE.social?.youtube,
  city: SITE.address?.locality,
  state: SITE.address?.region,
  hours: SITE.hours
};

export default function AdminSettings() {
  const mounted = useMounted();
  const [values, setValues] = React.useState(DEFAULTS);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!mounted) return;
    getSettings().
    then((s) => {
      // Merge saved values over defaults, ignoring blank/nulls.
      const clean = Object.fromEntries(
        Object.entries(s || {}).filter(([, v]) => v !== null && v !== "")
      );
      setValues((prev) => ({ ...prev, ...clean }));
    }).
    catch((e) => setError(e?.message || "Failed to load settings"));
  }, [mounted]);

  function set(name, v) {
    setValues((s) => ({ ...s, [name]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveSettings(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (!mounted) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Settings</h1>
        <p className="mt-1 text-warmbrown/70">Manage your store's general settings. (Super Admin only)</p>
      </div>

      {error &&
      <div className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">{error}</div>
      }

      <form onSubmit={onSubmit} className="space-y-6">
        <Card title="Store Information">
          <Field label="Store Name" name="storeName" values={values} onChange={set} />
          <Field label="Tagline" name="tagline" values={values} onChange={set} />
          <Field label="Phone" name="phone" values={values} onChange={set} />
          <Field label="Email" name="email" type="email" values={values} onChange={set} />
          <Field label="WhatsApp Number" name="whatsapp" values={values} onChange={set} />
        </Card>

        <Card title="Social Links">
          <Field label="Instagram" name="instagram" values={values} onChange={set} />
          <Field label="Facebook" name="facebook" values={values} onChange={set} />
          <Field label="YouTube" name="youtube" values={values} onChange={set} />
        </Card>

        <Card title="Address">
          <Field label="City" name="city" values={values} onChange={set} />
          <Field label="State" name="state" values={values} onChange={set} />
          <Field label="Business Hours" name="hours" values={values} onChange={set} />
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg" disabled={saving}>
            <Save size={18} /> {saving ? "Saving…" : "Save Changes"}
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

function Field({ label, name, values, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      <input
        type={type}
        value={values[name] ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />

    </div>);

}
