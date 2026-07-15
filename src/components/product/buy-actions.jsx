"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";

// Add to Cart / Buy Now for a product. Disabled when out of stock or the
// product is "price on request" (price <= 0) — those keep the Enquire flow.
export function BuyActions({ slug, price, inStock = true }) {
  const mounted = useMounted();
  const router = useRouter();
  const cart = useCart();
  const [added, setAdded] = React.useState(false);

  const purchasable = inStock && price > 0;
  const inCart = mounted && cart.has(slug);

  if (!purchasable) return null;

  function addToCart() {
    cart.add(slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function buyNow() {
    if (!inCart) cart.add(slug, 1);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        variant="secondary"
        className="flex-1"
        onClick={addToCart}>
        {added ?
        <><Check size={18} /> Added to Cart</> :
        <><ShoppingBag size={18} /> {inCart ? "Add Another" : "Add to Cart"}</>}
      </Button>
      <Button size="lg" className="flex-1" onClick={buyNow}>
        <Zap size={18} /> Buy Now
      </Button>
    </div>);

}
