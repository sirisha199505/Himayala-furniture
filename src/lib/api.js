"use client";

// ---------------------------------------------------------------------------
// Backend API client for the Himalayan Furniture Mart admin console.
// Talks to the Roda/Ruby API. Handles auth token, the {data:{…}} envelope the
// backend expects, and camelCase (frontend) <-> snake_case (DB) conversion.
// ---------------------------------------------------------------------------

export const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:9292/api").replace(/\/$/, "");

const AUTH_STORAGE_KEY = "hfm-admin-auth";

// --- token helpers (read straight from the persisted zustand store) ---------
export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw)?.state?.token ?? null;
  } catch {
    return null;
  }
}

// --- case conversion --------------------------------------------------------
const toSnakeKey = (k) => k.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
const toCamelKey = (k) => k.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());

function convertKeys(value, keyFn) {
  if (Array.isArray(value)) return value.map((v) => convertKeys(v, keyFn));
  if (value && typeof value === "object" && value.constructor === Object) {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[keyFn(k)] = convertKeys(v, keyFn);
    return out;
  }
  return value;
}

export const toSnake = (obj) => convertKeys(obj, toSnakeKey);
export const toCamel = (obj) => convertKeys(obj, toCamelKey);

// --- core request -----------------------------------------------------------
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(method, path, { body, query } = {}) {
  const token = getToken();
  let url = `${API_BASE}${path}`;
  if (query) {
    const qs = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== "")
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    // Backend reads the payload from params[:data]
    body: body !== undefined ? JSON.stringify({ data: body }) : undefined,
    cache: "no-store"
  });

  if (res.status === 401 && typeof window !== "undefined") {
    // Session expired / invalid — bounce to login.
    try {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    if (!window.location.pathname.startsWith("/admin/login")) {
      window.location.href = "/admin/login";
    }
    throw new ApiError("Unauthorized", 401, null);
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }

  if (!res.ok || (json && json.status === "error")) {
    const msg =
      (json && (json.message || describeErrors(json.data))) ||
      `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, json?.data);
  }

  return json;
}

function describeErrors(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    return Object.entries(data)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" · ");
  }
  return null;
}

// --- auth -------------------------------------------------------------------
export async function apiLogin(email, password) {
  const json = await request("POST", "/login", { body: { email, password } });
  return { token: json.data.token, info: json.data.info };
}

// ---------------------------------------------------------------------------
// Entity registry: maps a frontend entity key to its REST path plus optional
// inbound/outbound transforms for entities whose shape differs from the DB.
// ---------------------------------------------------------------------------
const ROLE_INT = { super: 1, admin: 2 };
const ROLE_STR = { 1: "super", 2: "admin" };

const usersTransform = {
  out: (r) => {
    const out = { ...r };
    if (r.name !== undefined) out.full_name = r.name;
    delete out.name;
    if (r.role !== undefined) out.role = ROLE_INT[r.role] ?? Number(r.role) ?? 2;
    if (r.status !== undefined) out.active = r.status !== "Disabled";
    delete out.status;
    if (out.password === "" || out.password == null) delete out.password;
    return out;
  },
  in: (r) => ({
    ...r,
    name: r.fullName ?? r.full_name ?? r.name,
    role: ROLE_STR[r.role] ?? r.role,
    status: r.active === false ? "Disabled" : "Active"
  })
};

export const ENTITIES = {
  products: { path: "/products" },
  categories: { path: "/categories" },
  gallery: { path: "/gallery" },
  faqs: { path: "/faqs" },
  locations: { path: "/locations" },
  collections: { path: "/collections" },
  blogs: { path: "/blogs" },
  caseStudies: { path: "/case-studies" },
  stories: { path: "/stories" },
  seo: { path: "/seo" },
  leads: { path: "/leads" },
  orders: { path: "/orders" },
  customers: { path: "/customers" },
  users: { path: "/users", transform: usersTransform }
};

function entity(key) {
  const e = ENTITIES[key];
  if (!e) throw new ApiError(`Unknown entity: ${key}`, 0, null);
  return e;
}

// --- entity CRUD ------------------------------------------------------------
export async function listEntity(key, query) {
  const e = entity(key);
  const json = await request("GET", e.path, { query });
  const rows = Array.isArray(json.data) ? json.data : [];
  return rows.map((row) => {
    const camel = toCamel(row);
    return e.transform?.in ? e.transform.in(camel) : camel;
  });
}

export async function createEntity(key, record) {
  const e = entity(key);
  const payload = e.transform?.out ? e.transform.out(record) : record;
  const json = await request("POST", e.path, { body: toSnake(payload) });
  const camel = toCamel(json.data);
  return e.transform?.in ? e.transform.in(camel) : camel;
}

export async function updateEntity(key, id, patch) {
  const e = entity(key);
  const payload = e.transform?.out ? e.transform.out(patch) : patch;
  const json = await request("PUT", `${e.path}/${id}`, { body: toSnake(payload) });
  const camel = toCamel(json.data);
  return e.transform?.in ? e.transform.in(camel) : camel;
}

export async function removeEntity(key, id) {
  const e = entity(key);
  await request("DELETE", `${e.path}/${id}`);
  return true;
}

// --- public storefront enquiry (no auth) -----------------------------------
// Creates a lead from an Enquire Now / Book Consultation / Contact submission
// so it shows up under Admin → Leads.
export async function createEnquiry(payload) {
  const json = await request("POST", "/public/leads", { body: toSnake(payload) });
  return toCamel(json.data);
}

// --- misc read-only endpoints ----------------------------------------------
export async function getAnalytics() {
  const json = await request("GET", "/analytics");
  return toCamel(json.data);
}

export async function getSettings() {
  const json = await request("GET", "/settings");
  return toCamel(json.data);
}

export async function saveSettings(patch) {
  const json = await request("PUT", "/settings", { body: toSnake(patch) });
  return toCamel(json.data);
}
