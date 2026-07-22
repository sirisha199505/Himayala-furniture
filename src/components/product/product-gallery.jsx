"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useProductMedia } from "@/components/product/product-media";

export function ProductGallery({
  images,
  name

}) {
  const { active, setActive, overrideSrc, setOverrideSrc } = useProductMedia();
  const [zoom, setZoom] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 50, y: 50 });

  const pics = Array.isArray(images) ? images.filter(Boolean) : [];
  // A selected finish can override the shown image; a thumbnail click clears it.
  const current = overrideSrc ?? pics[active] ?? pics[0];
  const selectThumb = (i) => {setOverrideSrc?.(null);setActive(i);};

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };

  // Product with no images yet — show a graceful placeholder instead of
  // crashing on <Image src={undefined}>.
  if (pics.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-beige to-brand-50 p-6 text-center">
        <span className="font-display text-lg font-semibold text-warmbrown/70">
          {name}
        </span>
      </div>);

  }

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 sm:flex-col">
        {pics.map((src, i) =>
        <button
          key={i}
          onMouseEnter={() => selectThumb(i)}
          onClick={() => selectThumb(i)}
          aria-label={`View image ${i + 1}`}
          className={cn(
            "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-20 sm:w-20",
            active === i ?
            "border-brand" :
            "border-transparent opacity-70 hover:opacity-100"
          )}>
          
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        )}
      </div>

      {/* Main image */}
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-beige"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}>
        
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-200",
            zoom && "scale-[1.8]"
          )}
          style={zoom ? { transformOrigin: `${pos.x}% ${pos.y}%` } : undefined} />
        
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal shadow-soft backdrop-blur">
          Hover to zoom
        </span>
      </div>
    </div>);

}
