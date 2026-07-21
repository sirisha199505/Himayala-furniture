"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useMounted } from "@/lib/use-mounted";

export default function CartPage() {
  const mounted = useMounted();
  const cart = useCart();
  const { productBySlug } = useCatalog();

  // Resolve cart lines against the catalog; drop anything unknown.
  const lines = cart.items.
  map((i) => ({ ...i, product: productBySlug(i.slug) })).
  filter((l) => l.product);

  const subtotal = lines.reduce(
    (sum, l) => sum + (l.product.price || 0) * l.qty,
    0
  );

  if (!mounted) return null;

  if (lines.length === 0) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-16 sm:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-beige text-warmbrown">
            <ShoppingBag size={30} />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal">
            Your cart is empty
          </h1>
          <p className="mt-2 text-warmbrown/70">
            Browse our collections and add something beautiful.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/products">Shop Products</Link>
          </Button>
        </div>
      </Container>);

  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
        Your Cart
      </h1>
      <p className="mt-1 text-warmbrown/70">
        {lines.length} {lines.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Lines */}
        <ul className="space-y-4 lg:col-span-8">
          {lines.map(({ slug, qty, product }) =>
          <li
            key={slug}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4">

              <Link
              href={`/products/${slug}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-beige sm:h-28 sm:w-28">

                {product.images?.[0] &&
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="112px"
                className="object-cover" />
              }
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <Link
                  href={`/products/${slug}`}
                  className="font-display text-lg font-semibold text-charcoal hover:text-brand">

                    {product.name}
                  </Link>
                  <button
                  onClick={() => cart.remove(slug)}
                  aria-label={`Remove ${product.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-beige hover:text-brand">

                    <Trash2 size={17} />
                  </button>
                </div>
                <p className="mt-0.5 text-sm text-warmbrown/70">
                  {formatPrice(product.price)} each
                </p>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                    onClick={() => cart.setQty(slug, qty - 1)}
                    aria-label="Decrease quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-beige">

                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {qty}
                    </span>
                    <button
                    onClick={() => cart.setQty(slug, qty + 1)}
                    aria-label="Increase quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-beige">

                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="font-semibold text-charcoal">
                    {formatPrice(product.price * qty)}
                  </span>
                </div>
              </div>
            </li>
          )}
        </ul>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Order Summary
            </h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-warmbrown/70">Subtotal</dt>
                <dd className="font-medium text-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-warmbrown/70">Delivery</dt>
                <dd className="font-medium text-success">Free</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold text-charcoal">Total</dt>
                <dd className="font-bold text-charcoal">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </Container>);

}
