"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";

export const ProductSlider = React.forwardRef(function ProductSlider(
  { products, showNav = true },
  forwardedRef
) {
  const ref = React.useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  React.useImperativeHandle(forwardedRef, () => ({ scroll }), []);

  return (
    <div className="relative">
      {showNav &&
      <div className="absolute -top-16 right-0 hidden gap-2 sm:flex">
        <SliderButton onClick={() => scroll(-1)} label="Previous">
          <ChevronLeft size={20} />
        </SliderButton>
        <SliderButton onClick={() => scroll(1)} label="Next">
          <ChevronRight size={20} />
        </SliderButton>
      </div>
      }
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar">

        {products.map((p) =>
        <div
          key={p.slug}
          className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31%] xl:w-[23.5%]">

            <ProductCard product={p} />
          </div>
        )}
      </div>
    </div>);

});

export function SliderButton({
  onClick,
  label,
  children

}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-charcoal shadow-soft transition-all hover:border-brand hover:bg-brand hover:text-white">

      {children}
    </button>);

}
