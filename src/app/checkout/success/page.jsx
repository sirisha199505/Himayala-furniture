"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Loader2, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { fetchOrder } from "@/lib/checkout";

const METHOD_LABEL = { cod: "Cash on Delivery", razorpay: "Paid Online" };
const PAY_LABEL = {
  paid: "Paid",
  cod_pending: "Pay on delivery",
  created: "Awaiting payment",
  failed: "Payment failed"
};

function SuccessInner() {
  const params = useSearchParams();
  const orderCode = params.get("order");
  const token = params.get("t");
  const cod = params.get("method") === "cod";

  const [order, setOrder] = React.useState(null);
  const [state, setState] = React.useState("loading"); // loading | ok | error

  React.useEffect(() => {
    if (!orderCode || !token) {
      setState("error");
      return;
    }
    fetchOrder(orderCode, token).
    then((o) => {
      setOrder(o);
      setState("ok");
    }).
    catch(() => setState("error"));
  }, [orderCode, token]);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            {cod ? "Order placed!" : "Payment successful!"}
          </h1>
          <p className="mt-3 text-warmbrown/80">
            {cod ?
            "Thank you — your order is confirmed. Pay in cash when it's delivered." :
            "Thank you for your purchase. Your order is confirmed and being processed."}
          </p>
          {orderCode &&
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm">
              <Package size={16} className="text-brand" />
              <span className="text-warmbrown/70">Order</span>
              <span className="font-semibold text-charcoal">{orderCode}</span>
            </div>
          }
        </div>

        {/* Order details */}
        {state === "loading" &&
        <div className="mt-8 flex items-center justify-center gap-2 text-muted">
            <Loader2 className="animate-spin" size={18} /> Loading your order…
          </div>
        }

        {state === "ok" && order &&
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-warmbrown/70">
                Order Details
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-beige px-2.5 py-1 font-medium text-warmbrown">
                  {METHOD_LABEL[order.payment_method] || order.payment_method}
                </span>
                {/* Skip the status badge for COD — "Cash on Delivery" already says it. */}
                {order.payment_status !== "cod_pending" &&
                <span className="rounded-full bg-brand/10 px-2.5 py-1 font-medium text-brand">
                  {PAY_LABEL[order.payment_status] || order.payment_status}
                </span>
                }
              </div>
            </div>

            <ul className="divide-y divide-border px-6">
              {(order.line_items || []).map((li) =>
            <li key={li.slug} className="flex justify-between gap-3 py-3 text-sm">
                  <span className="min-w-0 text-charcoal">
                    {li.name} <span className="text-muted">× {li.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium text-charcoal">
                    {formatPrice(li.price * li.qty)}
                  </span>
                </li>
            )}
            </ul>

            <div className="flex justify-between border-t border-border px-6 py-4">
              <span className="font-semibold text-charcoal">Total</span>
              <span className="font-bold text-charcoal">{formatPrice(order.total)}</span>
            </div>

            {order.customer &&
          <div className="border-t border-border px-6 py-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-warmbrown/70">
                  <MapPin size={13} /> Delivery to
                </p>
                <p className="text-sm text-charcoal">{order.customer.name}</p>
                <p className="text-sm text-warmbrown/80">
                  {[order.customer.address, order.customer.city, order.customer.state, order.customer.pincode].
                filter(Boolean).join(", ")}
                </p>
                {order.customer.phone &&
            <p className="text-sm text-warmbrown/80">{order.customer.phone}</p>
            }
              </div>
          }
          </div>
        }

        <p className="mt-6 text-center text-sm text-warmbrown/70">
          Our team will contact you shortly to arrange delivery and installation.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </Container>);

}

export default function CheckoutSuccessPage() {
  return (
    <React.Suspense fallback={null}>
      <SuccessInner />
    </React.Suspense>);

}
