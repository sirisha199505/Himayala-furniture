"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { img, POOL } from "@/data/images";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1];
const INTERVAL = 5000;

const slides = [
{
  image: img(POOL.living[0], 2000),
  eyebrow: "Living Spaces",
  heading: "Crafted To",
  highlight: "Perfection",
  sub: "Luxury furniture designed for modern living."
},
{
  image: img(POOL.beds[1], 2000),
  eyebrow: "Bedroom Retreats",
  heading: "Rest In",
  highlight: "Quiet Luxury",
  sub: "Serene bedrooms built for comfort that lasts a lifetime."
},
{
  image: img(POOL.dining[0], 2000),
  eyebrow: "Dining & Gathering",
  heading: "Where Memories",
  highlight: "Gather",
  sub: "Solid-wood dining sets crafted for meals worth lingering over."
},
{
  image: img(POOL.office[0], 2000),
  eyebrow: "Workspaces",
  heading: "Work In",
  highlight: "Boardroom Style",
  sub: "Executive furniture that brings polish to every workspace."
},
{
  image: img(POOL.hero[1], 2000),
  eyebrow: "Bespoke Interiors",
  heading: "Designed Around",
  highlight: "You",
  sub: "Custom furniture built to your exact vision and space."
}];

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const go = React.useCallback(
    (dir) =>
    setIndex((i) => (i + dir + slides.length) % slides.length),
    []
  );

  React.useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, reduce, index]);

  const slide = slides[index];

  return (
    <section
      className="relative h-[calc(100svh-6rem)] min-h-[480px] w-full overflow-hidden bg-charcoal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured furniture">
      
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0">
          
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.eyebrow}
              fill
              priority={index === 0}
              sizes="100vw"
              className={reduce ? "object-cover" : "object-cover animate-kenburns"} />
            
          </div>
          {/* Left-to-right dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
              "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.20) 100%)"
            }} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[88rem] flex-col justify-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={index}>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-bronze">
                
                <span className="h-px w-10 bg-bronze" />
                {slide.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="font-editorial text-[40px] font-semibold uppercase leading-[1.02] tracking-tight text-white sm:text-[56px] lg:text-[80px] xl:text-[92px]">
                
                {slide.heading}{" "}
                <span className="text-brand">{slide.highlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                className="mt-5 max-w-lg text-pretty text-lg font-light leading-relaxed text-white/85 sm:text-xl">
                
                {slide.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                className="mt-9 flex flex-wrap gap-4">
                
                <Button asChild size="lg">
                  <Link href="/products">
                    Explore Collection <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:border-white hover:bg-white hover:text-charcoal">
                  
                  <Link href="/gallery">
                    <Images size={18} /> View Gallery
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-all hover:border-white hover:bg-brand sm:flex lg:left-6">
        
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-all hover:border-white hover:bg-brand sm:flex lg:right-6">
        
        <ChevronRight size={24} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((s, i) =>
        <button
          key={i}
          onClick={() => setIndex(i)}
          aria-label={`Go to ${s.eyebrow}`}
          aria-current={i === index}
          className="group relative h-2.5 overflow-hidden rounded-full bg-white/30 transition-all"
          style={{ width: i === index ? 44 : 10 }}>
          
            {i === index && !paused && !reduce &&
          <motion.span
            key={`p-${index}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            style={{ originX: 0 }}
            className="absolute inset-0 bg-brand" />

          }
            {i === index && (paused || reduce) &&
          <span className="absolute inset-0 bg-brand" />
          }
          </button>
        )}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 right-6 z-20 hidden items-center gap-2 text-xs uppercase tracking-widest text-white/60 lg:flex">
        <span className="text-[0.65rem]">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-white/30" />
        <span className="text-[0.65rem]">{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>);

}
