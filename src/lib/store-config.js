// ---------------------------------------------------------------------------
// Store configuration resolved from the backend Settings (edited in the admin
// console) layered over the static SITE constants. This is what the public
// storefront should read so that Super-Admin edits actually take effect.
//
// - getStoreConfig()  -> async, server-side fetch of the public /store-info
//                        endpoint. Falls back to SITE on any error.
// - resolveStoreConfig(raw) -> pure merge of raw API settings over SITE.
// - telLink(config) / whatsappLink(config) -> config-aware link helpers
//   (mirror the signatures in lib/site.js but take the resolved config).
// ---------------------------------------------------------------------------

import { SITE } from "@/lib/site";

// Same normalization as lib/api.js — tolerate a base configured without /api.
function apiBase() {
  let base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:9292/api").replace(/\/$/, "");
  if (!/\/api$/.test(base)) base += "/api";
  return base;
}

const blank = (v) => v == null || String(v).trim() === "";
const onlyDigits = (s) => String(s || "").replace(/\D/g, "");
// Keep a leading + and digits for tel: links.
const telFormat = (s) => String(s || "").replace(/[^\d+]/g, "");

// Merge raw API settings (snake_case, from /store-info) over the SITE defaults.
// Any blank/missing field falls back to the corresponding SITE value.
export function resolveStoreConfig(raw = {}) {
  const s = raw || {};

  const locality = blank(s.city) ? SITE.address.locality : String(s.city).trim();
  const region = blank(s.state) ? SITE.address.region : String(s.state).trim();

  return {
    name: blank(s.store_name) ? SITE.name : s.store_name,
    tagline: blank(s.tagline) ? SITE.tagline : s.tagline,
    description: SITE.description, // not stored in settings
    email: blank(s.email) ? SITE.email : s.email,
    hours: blank(s.hours) ? SITE.hours : s.hours,
    // phoneDisplay = what we show; phone = tel: target
    phoneDisplay: blank(s.phone) ? SITE.phoneDisplay : String(s.phone).trim(),
    phone: blank(s.phone) ? SITE.phone : telFormat(s.phone) || SITE.phone,
    // wa.me requires digits only (no +, spaces, etc.)
    whatsapp: blank(s.whatsapp) ? SITE.whatsapp : onlyDigits(s.whatsapp) || SITE.whatsapp,
    social: {
      instagram: blank(s.instagram) ? SITE.social.instagram : s.instagram,
      facebook: blank(s.facebook) ? SITE.social.facebook : s.facebook,
      youtube: blank(s.youtube) ? SITE.social.youtube : s.youtube,
      pinterest: SITE.social.pinterest // not stored in settings
    },
    address: {
      ...SITE.address,
      locality,
      region,
      // Keep street/postal from SITE, but reflect edited city/state.
      full: `${SITE.address.street}, ${locality}, ${region} ${SITE.address.postalCode}`
    },
    foundingYear: SITE.foundingYear,
    url: SITE.url
  };
}

// Pure SITE fallback — safe default when the backend is unavailable.
export const DEFAULT_STORE_CONFIG = resolveStoreConfig({});

// Server-side fetch of the public store settings. Revalidates every 5 minutes
// so admin edits propagate without a redeploy; never throws (falls back to SITE).
export async function getStoreConfig() {
  try {
    const res = await fetch(`${apiBase()}/store-info`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return DEFAULT_STORE_CONFIG;
    const json = await res.json();
    return resolveStoreConfig(json?.data || {});
  } catch {
    return DEFAULT_STORE_CONFIG;
  }
}

// Config-aware link helpers (mirror lib/site.js signatures).
export function whatsappLink(config, message) {
  const num = config?.whatsapp || SITE.whatsapp;
  const text = encodeURIComponent(
    message ?? `Hi ${config?.name || SITE.name}, I'd like to know more about your furniture.`
  );
  return `https://wa.me/${num}?text=${text}`;
}

export function telLink(config) {
  return `tel:${config?.phone || SITE.phone}`;
}
