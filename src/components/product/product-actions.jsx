"use client";

import { Heart, GitCompareArrows } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist, useCompare } from "@/store/wishlist";
import { useMounted } from "@/lib/use-mounted";

export function ProductActions({ slug }) {
  const mounted = useMounted();
  const wishlist = useWishlist();
  const compare = useCompare();
  const wished = mounted && wishlist.has(slug);
  const compared = mounted && compare.has(slug);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => wishlist.toggle(slug)}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold transition-all",
          wished ?
          "border-brand bg-brand/5 text-brand" :
          "border-border text-charcoal hover:border-brand hover:text-brand"
        )}>
        
        <Heart size={18} className={wished ? "fill-current" : ""} />
        {wished ? "Wishlisted" : "Wishlist"}
      </button>
      <button
        onClick={() => compare.toggle(slug)}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold transition-all",
          compared ?
          "border-brand bg-brand/5 text-brand" :
          "border-border text-charcoal hover:border-brand hover:text-brand"
        )}>
        
        <GitCompareArrows size={18} />
        {compared ? "Comparing" : "Compare"}
      </button>
    </div>);

}
