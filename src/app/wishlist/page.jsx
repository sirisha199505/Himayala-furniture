"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useMounted } from "@/lib/use-mounted";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const mounted = useMounted();
  const { items, clear } = useWishlist();
  const { productBySlug } = useCatalog();
  const products = mounted ?
  items.map(productBySlug).filter((p) => p !== undefined) :
  [];

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
        { name: "Home", href: "/" },
        { name: "Wishlist", href: "/wishlist" }]
        } />
      
      <div className="mt-5 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-charcoal">
            My Wishlist
          </h1>
          <p className="mt-2 text-warmbrown/80">
            {mounted ? `${products.length} saved item(s)` : "Loading…"}
          </p>
        </div>
        {products.length > 0 &&
        <button
          onClick={clear}
          className="text-sm font-medium text-muted hover:text-brand">
          
            Clear all
          </button>
        }
      </div>

      {mounted && products.length === 0 ?
      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige text-brand">
            <Heart size={30} />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold">
            Your wishlist is empty
          </h2>
          <p className="mt-2 max-w-sm text-warmbrown/80">
            Browse our collection and tap the heart on any product to save it
            here.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/products">
              Explore Furniture <ArrowRight size={18} />
            </Link>
          </Button>
        </div> :

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {products.map((p) => p && <ProductCard key={p.slug} product={p} />)}
        </div>
      }
    </Container>);

}
