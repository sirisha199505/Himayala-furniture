"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { productBySlug } from "@/data/products";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import {
  createRazorpayOrder,
  verifyPayment,
  placeCodOrder,
  loadRazorpay } from
"@/lib/checkout";

const BRAND = "#c54a11";

const empty = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
};

export default function CheckoutPage() {
  const mounted = useMounted();
  const router = useRouter();
  const cart = useCart();
  const [form, setForm] = React.useState(empty);
  const [method, setMethod] = React.useState("online");
  const [status, setStatus] = React.useState("idle"); // idle | processing
  const [error, setError] = React.useState("");

  const lines = cart.items.
  map((i) => ({ ...i, product: productBySlug(i.slug) })).
  filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + (l.product.price || 0) * l.qty, 0);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const items = cart.items.map((i) => ({ slug: i.slug, qty: i.qty }));

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (lines.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setStatus("processing");
    try {
      if (method === "cod") {
        const { order_code, token } = await placeCodOrder(items, form);
        cart.clear();
        router.push(
          `/checkout/success?order=${encodeURIComponent(order_code)}&t=${encodeURIComponent(token)}&method=cod`
        );
        return;
      }
      await payOnline();
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  async function payOnline() {
    const order = await createRazorpayOrder(items, form);
    const Razorpay = await loadRazorpay();

    const rzp = new Razorpay({
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: SITE.name,
      description: `Order ${order.order_code}`,
      order_id: order.razorpay_order_id,
      prefill: order.prefill || { name: form.name, email: form.email, contact: form.phone },
      theme: { color: BRAND },
      handler: async (response) => {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          cart.clear();
          router.push(
            `/checkout/success?order=${encodeURIComponent(order.order_code)}&t=${encodeURIComponent(order.token)}`
          );
        } catch (err) {
          setError(err?.message || "Payment verification failed. Contact us with your payment id.");
          setStatus("idle");
        }
      },
      modal: {
        ondismiss: () => setStatus("idle")
      }
    });
    rzp.on("payment.failed", (resp) => {
      setError(resp?.error?.description || "Payment failed. Please try again.");
      setStatus("idle");
    });
    rzp.open();
  }

  if (!mounted) return null;

  if (lines.length === 0) {
    return (
      <Container className="py-16 text-center sm:py-24">
        <h1 className="font-display text-3xl font-bold text-charcoal">Checkout</h1>
        <p className="mt-2 text-warmbrown/70">Your cart is empty.</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/products">Shop Products</Link>
        </Button>
      </Container>);

  }

  const processing = status === "processing";

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
        Checkout
      </h1>

      {error &&
      <div className="mt-5 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">
          {error}
        </div>
      }

      <form
        onSubmit={onSubmit}
        className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Details + payment */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" form={form} set={set} />
              <Field label="Phone" name="phone" type="tel" form={form} set={set} />
              <Field
                label="Email"
                name="email"
                type="email"
                required={false}
                form={form}
                set={set}
                className="sm:col-span-2" />

              <Field
                label="Address"
                name="address"
                form={form}
                set={set}
                className="sm:col-span-2" />

              <Field label="City" name="city" form={form} set={set} />
              <Field label="State" name="state" form={form} set={set} />
              <Field
                label="Pincode"
                name="pincode"
                required={false}
                form={form}
                set={set} />

            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
              Payment Method
            </h2>
            <div className="space-y-3">
              <PayOption
                active={method === "online"}
                onClick={() => setMethod("online")}
                icon={<CreditCard size={20} />}
                title="Pay Online"
                desc="Card, UPI, Net Banking & Wallets via Razorpay" />

              <PayOption
                active={method === "cod"}
                onClick={() => setMethod("cod")}
                icon={<Truck size={20} />}
                title="Cash on Delivery"
                desc="Pay when your furniture is delivered" />

            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Order Summary
            </h2>
            <ul className="mt-4 space-y-3">
              {lines.map(({ slug, qty, product }) =>
              <li key={slug} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0 text-warmbrown/80">
                    {product.name} <span className="text-muted">× {qty}</span>
                  </span>
                  <span className="shrink-0 font-medium text-charcoal">
                    {formatPrice(product.price * qty)}
                  </span>
                </li>
              )}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base">
              <span className="font-semibold text-charcoal">Total</span>
              <span className="font-bold text-charcoal">{formatPrice(subtotal)}</span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-5 w-full"
              disabled={processing}>

              {processing ?
              <><Loader2 className="animate-spin" size={18} /> Processing…</> :
              method === "cod" ?
              `Place Order · ${formatPrice(subtotal)}` :
              `Pay ${formatPrice(subtotal)}`}
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={14} /> Secure checkout
            </p>
          </div>
        </aside>
      </form>
    </Container>);

}

function Field({ label, name, type = "text", required = true, form, set, className }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brand" />

    </div>);

}

function PayOption({ active, onClick, icon, title, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
      active ?
      "border-brand bg-brand/5" :
      "border-border hover:border-brand/40"}`
      }>

      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
        active ? "bg-brand text-white" : "bg-beige text-warmbrown"}`
        }>

        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-charcoal">{title}</span>
        <span className="block text-xs text-warmbrown/70">{desc}</span>
      </span>
      <span
        className={`h-4 w-4 rounded-full border-2 ${
        active ? "border-brand bg-brand" : "border-border"}`
        } />

    </button>);

}
