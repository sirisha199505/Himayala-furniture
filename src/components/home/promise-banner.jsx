import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { img, POOL } from "@/data/images";
import { Reveal } from "@/components/motion/reveal";

/**
 * Full-width parallax brand band — mirrors the "HIGH QUALITY · LOW COST ·
 * NO COMPROMISE" craftsmanship banner from himalayanfurnituremart.in.
 */
export function PromiseBanner() {
  return (
    <section
      className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-charcoal bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{ backgroundImage: `url(${img(POOL.gallery[3], 1800)})` }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <p className="eyebrow mb-5 text-bronze">Crafted to Perfection</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-editorial text-[2rem] font-semibold uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-5xl lg:text-6xl">
            High Quality
            <span className="mx-3 text-bronze">·</span>
            Low Cost
            <span className="mx-3 text-bronze">·</span>
            No Compromise
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-white/80">
            Every joint cut by hand, every finish rubbed to a glow. We obsess
            over the details so your furniture lasts a lifetime — without the
            luxury price tag.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="/stories/our-craftsmanship"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white hover:text-charcoal">
            
            Discover Our Craftsmanship <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>);

}
