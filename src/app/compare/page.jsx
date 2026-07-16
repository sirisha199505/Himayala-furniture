"use client";

import Link from "next/link";
import Image from "next/image";
import { GitCompareArrows, X, ArrowRight, Check, Minus } from "lucide-react";
import { useCompare } from "@/store/wishlist";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useMounted } from "@/lib/use-mounted";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";

export default function ComparePage() {
  const mounted = useMounted();
  const { items, toggle, clear } = useCompare();
  const { productBySlug } = useCatalog();
  const products = mounted ?
  items.map(productBySlug).filter((p) => p !== undefined) :
  [];

  const rows = [
  { label: "Price", render: (p) => p.price ? formatPrice(p.price) : "On Request" },
  { label: "Rating", render: (p) => <Rating value={p.rating} reviews={p.reviews} /> },
  { label: "Material", render: (p) => p.materials.join(", ") },
  {
    label: "Dimensions",
    render: (p) =>
    p.dimensions.width ?
    `${p.dimensions.width}×${p.dimensions.depth}×${p.dimensions.height} cm` :
    "Custom"
  },
  { label: "Warranty", render: (p) => p.warranty },
  { label: "Finishes", render: (p) => p.colors.map((c) => c.name).join(", ") },
  {
    label: "In Stock",
    render: (p) =>
    p.inStock ?
    <Check size={18} className="mx-auto text-success" /> :

    <Minus size={18} className="mx-auto text-muted" />

  }];

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
        { name: "Home", href: "/" },
        { name: "Compare", href: "/compare" }]
        } />
      
      <div className="mt-5 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Compare Products
          </h1>
          <p className="mt-2 text-warmbrown/80">
            {mounted ? `${products.length} of 4 selected` : "Loading…"}
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
            <GitCompareArrows size={30} />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold">
            Nothing to compare yet
          </h2>
          <p className="mt-2 max-w-sm text-warmbrown/80">
            Add up to four products using the compare icon to see them side by
            side.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/products">
              Browse Products <ArrowRight size={18} />
            </Link>
          </Button>
        </div> :

      <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-32 align-bottom" />
                {products.map(
                (p) =>
                p &&
                <th key={p.slug} className="p-3 align-top">
                        <div className="relative">
                          <button
                      onClick={() => toggle(p.slug)}
                      aria-label={`Remove ${p.name}`}
                      className="absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/70 text-white hover:bg-brand">
                      
                            <X size={14} />
                          </button>
                          <Link href={`/products/${p.slug}`}>
                            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-beige">
                              <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="200px"
                          className="object-cover" />
                        
                            </div>
                            <span className="block text-left font-display text-base font-semibold leading-snug text-charcoal hover:text-brand">
                              {p.name}
                            </span>
                          </Link>
                        </div>
                      </th>

              )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) =>
            <tr key={row.label} className={ri % 2 ? "bg-beige/40" : ""}>
                  <td className="p-3 text-sm font-semibold text-charcoal">
                    {row.label}
                  </td>
                  {products.map(
                (p) =>
                p &&
                <td
                  key={p.slug}
                  className="p-3 text-center text-sm text-warmbrown">
                  
                          {row.render(p)}
                        </td>

              )}
                </tr>
            )}
              <tr>
                <td />
                {products.map(
                (p) =>
                p &&
                <td key={p.slug} className="p-3">
                        <EnquiryDialog
                    productName={p.name}
                    trigger={
                    <Button size="sm" className="w-full">
                              Enquire
                            </Button>
                    } />
                  
                      </td>

              )}
              </tr>
            </tbody>
          </table>
        </div>
      }
    </Container>);

}
