"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompareArrows, Eye, ArrowRight, ShoppingBag, Check } from "lucide-react";

import { cn, formatPrice } from "@/lib/utils";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { QuickView } from "@/components/product/quick-view";
import { useWishlist, useCompare } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";

export function ProductCard({ product, removeFromWishlistOnAdd = false }) {
  const mounted = useMounted();
  const [imgError, setImgError] = React.useState(false);
  const wishlist = useWishlist();
  const compare = useCompare();
  const cart = useCart();
  const [added, setAdded] = React.useState(false);
  const wished = mounted && wishlist.has(product.slug);
  const compared = mounted && compare.has(product.slug);
  const cover = product.images?.[0];
  const purchasable = product.price > 0 && product.inStock !== false;
  const discount =
  product.mrp && product.mrp > product.price ?
  Math.round((product.mrp - product.price) / product.mrp * 100) :
  0;

  function addToCart() {
    cart.add(product.slug, 1);
    // On the wishlist page, moving an item to the cart should remove it here.
    if (removeFromWishlistOnAdd && wishlist.has(product.slug)) {
      wishlist.remove(product.slug);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative aspect-square overflow-hidden bg-beige sm:aspect-[4/5]">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          {imgError || !cover ?
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-beige to-brand-50 p-4 text-center">
              <span className="font-display text-sm font-semibold text-warmbrown/70">
                {product.name}
              </span>
            </div> :

          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          }
        </Link>

        {/* Badges — use the admin-managed `badges` list, falling back to the
            bestSeller/isNew flags for older records. */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {(Array.isArray(product.badges) && product.badges.length ?
          product.badges :
          [
          ...(product.bestSeller ? ["Best Seller"] : []),
          ...(product.isNew ? ["New"] : [])]).
          map((b) =>
          <Badge key={b} variant={b === "New" ? "dark" : "brand"}>
              {b}
            </Badge>
          )}
          {discount > 0 && <Badge variant="gold">{discount}% Off</Badge>}
        </div>

        {/* Action rail */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <IconButton
            active={wished}
            label="Add to wishlist"
            onClick={() => wishlist.toggle(product.slug)}>
            
            <Heart size={17} className={wished ? "fill-current" : ""} />
          </IconButton>
          <IconButton
            active={compared}
            label="Add to compare"
            onClick={() => compare.toggle(product.slug)}>
            
            <GitCompareArrows size={17} />
          </IconButton>
          <QuickView
            product={product}
            trigger={
            <IconButton label="Quick view">
                <Eye size={17} />
              </IconButton>
            } />
          
        </div>

        {!product.inStock &&
        <div className="absolute inset-x-0 bottom-0 bg-charcoal/80 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
            Made to Order
          </div>
        }
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Rating value={product.rating} reviews={product.reviews} className="mb-2" />
        <h3 className="font-display text-lg font-semibold leading-snug text-charcoal">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-brand">
            
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-warmbrown/75">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-end gap-2">
          {product.price > 0 ?
          <>
              <span className="text-xl font-semibold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {discount > 0 &&
            <span className="pb-0.5 text-sm text-muted line-through">
                  {formatPrice(product.mrp)}
                </span>
            }
            </> :

          <span className="text-lg font-semibold text-brand">
              Price on Request
            </span>
          }
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {purchasable &&
          <Button size="sm" className="w-full" onClick={addToCart}>
              {added ?
            <><Check size={16} /> Added to Cart</> :
            <><ShoppingBag size={16} /> Add to Cart</>}
            </Button>
          }
          <div className="flex gap-2">
            <EnquiryDialog
              productName={product.name}
              trigger={
              <Button
                size="sm"
                variant={purchasable ? "outline" : "primary"}
                className="flex-1">

                  Enquire
                </Button>
              } />

            <Button
              asChild
              size="sm"
              variant="outline"
              aria-label={`View details for ${product.name}`}
              className="shrink-0 px-3 sm:px-4">

              <Link href={`/products/${product.slug}`}>
                <span className="hidden sm:inline">Details</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>);

}

function IconButton({
  children,
  label,
  active,
  onClick

}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full shadow-soft backdrop-blur transition-all duration-200 hover:scale-110",
        active ?
        "bg-brand text-white" :
        "bg-white/90 text-charcoal hover:bg-brand hover:text-white"
      )}>
      
      {children}
    </button>);

}
