"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function MasonryGallery({
  items,
  showFilter = false,
  categories = []

}) {
  const [active, setActive] = React.useState("All");
  const [lightbox, setLightbox] = React.useState(null);

  const filtered =
  active === "All" ? items : items.filter((i) => i.category === active);

  const open = lightbox !== null ? filtered[lightbox] : null;

  const go = React.useCallback(
    (dir) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        return (cur + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  return (
    <>
      {showFilter &&
      <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) =>
        <button
          key={c}
          onClick={() => setActive(c)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all",
            active === c ?
            "bg-brand text-white shadow-soft" :
            "border border-border bg-surface text-charcoal hover:border-brand hover:text-brand"
          )}>
          
              {c}
            </button>
        )}
        </div>
      }

      <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
        {filtered.map((item, i) =>
        <motion.button
          key={item.id}
          layout
          onClick={() => setLightbox(i)}
          className={cn(
            "group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid",
            item.span === "tall" ?
            "aspect-[3/4]" :
            item.span === "wide" ?
            "aspect-[4/3]" :
            "aspect-square"
          )}>
          
            <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110" />
          
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="text-left">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-bronze">
                  {item.category}
                </p>
                <p className="text-sm font-semibold text-white">{item.title}</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                <Maximize2 size={15} />
              </span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/95 p-4"
          onClick={() => setLightbox(null)}>
          
            <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
            aria-label="Close">
            
              <X size={22} />
            </button>
            <button
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous">
            
              <ChevronLeft size={26} />
            </button>
            <button
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next">
            
              <ChevronRight size={26} />
            </button>

            <motion.figure
            key={open.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}>
            
              <div className="relative mx-auto aspect-[4/3] max-h-[78vh] w-fit">
                <Image
                src={open.image.replace(/w=\d+/, "w=1600")}
                alt={open.title}
                width={1600}
                height={1200}
                className="max-h-[78vh] w-auto rounded-2xl object-contain" />
              
              </div>
              <figcaption className="mt-4 text-center text-white">
                <p className="font-display text-lg font-semibold">{open.title}</p>
                <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-white/60">
                  <MapPin size={14} /> {open.location} · {open.category}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
