"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompareArrows, Eye } from "lucide-react";

import { cn, formatPrice } from "@/lib/utils";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { QuickView } from "@/components/product/quick-view";
import { useWishlist, useCompare } from "@/store/wishlist";
import { useMounted } from "@/lib/use-mounted";

export function ProductCard({ product }) {
  const mounted = useMounted();
  const wishlist = useWishlist();
  const compare = useCompare();
  const wished = mounted && wishlist.has(product.slug);
  const compared = mounted && compare.has(product.slug);
  const discount =
  product.mrp && product.mrp > product.price ?
  Math.round((product.mrp - product.price) / product.mrp * 100) :
  0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestSeller && <Badge variant="brand">Best Seller</Badge>}
          {product.isNew && <Badge variant="dark">New</Badge>}
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

        <div className="mt-4 flex gap-2">
          <EnquiryDialog
            productName={product.name}
            trigger={
            <Button size="sm" className="flex-1">
                Enquire
              </Button>
            } />
          
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link href={`/products/${product.slug}`}>Details</Link>
          </Button>
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
