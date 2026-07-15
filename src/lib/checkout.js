"use client";

// Public (guest) checkout client. Unlike src/lib/api.js this sends NO auth
// token and never redirects to /admin/login — it targets the public
// /api/checkout/* routes. The backend reads the payload from params[:data],
// so every body is wrapped in { data: … }.
import { API_BASE } from "@/lib/api";

async function post(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
    cache: "no-store"
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON */
  }

  if (!res.ok || json?.status === "error") {
    const msg =
    (json && (json.message || describe(json.data))) ||
    `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return json.data;
}

function describe(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (typeof data === "object")
  return Object.values(data).flat().join(" · ");
  return null;
}

// items: [{ slug, qty }], customer: { name, email, phone, address, city, state, pincode }
export function createRazorpayOrder(items, customer) {
  return post("/checkout/create-order", { items, customer });
}

export function verifyPayment(payload) {
  // payload: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
  return post("/checkout/verify", payload);
}

export function placeCodOrder(items, customer) {
  return post("/checkout/cod", { items, customer });
}

// Public order detail lookup — needs the secret token from the confirmation URL.
export async function fetchOrder(code, token) {
  const qs = new URLSearchParams({ code, token }).toString();
  const res = await fetch(`${API_BASE}/checkout/order?${qs}`, { cache: "no-store" });
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON */
  }
  if (!res.ok || json?.status === "error") {
    const err = new Error(
      json?.message || describe(json?.data) || `Request failed (${res.status})`
    );
    err.status = res.status;
    throw err;
  }
  return json.data;
}

// Lazy-load Razorpay's checkout.js once; resolves to window.Razorpay.
export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.Razorpay) return resolve(window.Razorpay);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(window.Razorpay);
    s.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(s);
  });
}
