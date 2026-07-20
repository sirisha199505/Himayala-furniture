"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useProductMedia } from "@/components/product/product-media";

export function ProductGallery({
  images,
  name

}) {
  const { active, setActive } = useProductMedia();
  const [zoom, setZoom] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 sm:flex-col">
        {images.map((src, i) =>
        <button
          key={i}
          onMouseEnter={() => setActive(i)}
          onClick={() => setActive(i)}
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
          src={images[active]}
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
