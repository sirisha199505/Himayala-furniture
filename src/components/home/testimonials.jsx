"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(1);

  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[index];

  return (
    <section className="bg-beige/60 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="Stories from our happy homes"
          description="Don't just take our word for it — hear from the families and businesses we've served." />
        

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote
            size={64}
            className="mx-auto mb-4 text-bronze/40"
            strokeWidth={1.5} />
          
          <div className="relative min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center">
                
                <div className="mb-4 flex justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) =>
                  <Star key={i} size={18} className="fill-bronze text-bronze" />
                  )}
                </div>
                <p className="text-balance font-display text-xl font-medium leading-relaxed text-charcoal sm:text-2xl">
                  “{t.quote}”
                </p>
                <footer className="mt-6 flex items-center justify-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full gradient-bronze text-lg font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div className="text-left">
                    <div className="flex items-center gap-2 font-semibold text-charcoal">
                      {t.name}
                      {t.video &&
                      <span className="flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[0.65rem] font-semibold text-brand">
                          <Play size={9} className="fill-current" /> Video
                        </span>
                      }
                    </div>
                    <div className="text-sm text-muted">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <NavBtn onClick={() => go(-1)} label="Previous">
              <ChevronLeft size={20} />
            </NavBtn>
            <div className="flex gap-2">
              {testimonials.map((_, i) =>
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-brand" : "w-2 bg-charcoal/20"}`} />

              )}
            </div>
            <NavBtn onClick={() => go(1)} label="Next">
              <ChevronRight size={20} />
            </NavBtn>
          </div>
        </div>
      </Container>
    </section>);

}

function NavBtn({
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
