"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle } from
"@/components/ui/dialog";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { BuyActions } from "@/components/product/buy-actions";

export function QuickView({
  product,
  trigger

}) {
  const [active, setActive] = React.useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl p-0 sm:p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-beige sm:rounded-l-3xl sm:rounded-tr-none">
            <Image
              src={product.images[active]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover" />
            
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {product.images.slice(0, 4).map((src, i) =>
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-2 bg-white/60"}`} />

              )}
            </div>
          </div>
          <div className="flex flex-col p-6">
            <div className="mb-2 flex gap-1.5">
              {product.bestSeller && <Badge variant="brand">Best Seller</Badge>}
              {product.isNew && <Badge variant="dark">New</Badge>}
            </div>
            <DialogTitle className="font-display text-2xl font-semibold">
              {product.name}
            </DialogTitle>
            <Rating
              value={product.rating}
              reviews={product.reviews}
              className="mt-2" />
            
            <p className="mt-3 text-sm leading-relaxed text-warmbrown/80">
              {product.shortDescription}
            </p>

            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between border-b border-border pb-1.5">
                <dt className="text-muted">Material</dt>
                <dd className="font-medium text-charcoal">
                  {product.materials[0]}
                </dd>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <dt className="text-muted">Dimensions</dt>
                <dd className="font-medium text-charcoal">
                  {product.dimensions.width}×{product.dimensions.depth}×
                  {product.dimensions.height} cm
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Warranty</dt>
                <dd className="font-medium text-charcoal">{product.warranty}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-5">
              <div className="mb-3 flex items-end gap-2">
                {product.price > 0 ?
                <span className="text-2xl font-semibold text-charcoal">
                    {formatPrice(product.price)}
                  </span> :

                <span className="text-xl font-semibold text-brand">
                    Price on Request
                  </span>
                }
                {product.mrp && product.mrp > product.price &&
                <span className="pb-1 text-sm text-muted line-through">
                    {formatPrice(product.mrp)}
                  </span>
                }
              </div>
              <div className="space-y-2">
                <BuyActions
                  slug={product.slug}
                  price={product.price}
                  inStock={product.inStock !== false} />

                <div className="flex gap-2">
                  <EnquiryDialog
                    productName={product.name}
                    trigger={
                    <Button
                      variant={
                      product.price > 0 && product.inStock !== false ?
                      "outline" :
                      "primary"
                      }
                      className="flex-1">

                        Enquire Now
                      </Button>
                    } />

                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/products/${product.slug}`}>Full Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);

}
