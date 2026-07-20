"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ProductSlider, SliderButton } from "@/components/product/product-slider";
import { Button } from "@/components/ui/button";

export function BestSellersCarousel({ products }) {
  const sliderRef = React.useRef(null);
  const scroll = (dir) => sliderRef.current?.scroll(dir);

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow mb-3">Best Sellers</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              Loved by thousands of homes
            </h2>
          </Reveal>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/products">
              View All <ArrowRight size={16} />
            </Link>
          </Button>
          <div className="hidden gap-2 sm:flex">
            <SliderButton onClick={() => scroll(-1)} label="Previous">
              <ChevronLeft size={20} />
            </SliderButton>
            <SliderButton onClick={() => scroll(1)} label="Next">
              <ChevronRight size={20} />
            </SliderButton>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ProductSlider ref={sliderRef} products={products} showNav={false} />
      </div>
    </>);

}
