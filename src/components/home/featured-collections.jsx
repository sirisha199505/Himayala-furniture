import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedCollections() {
  return (
    <section className="bg-beige/60 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured Collections"
          title="Curated for the way you live"
          description="Thoughtfully composed collections that bring harmony to every space in your home and workplace." />
        

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {collections.map((col, i) =>
          <Reveal key={col.slug} delay={i * 0.08}>
              <Link
              href={`/collections/${col.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-3xl shadow-soft">
              
                <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: col.accent === "#1c1c1c" ? "#fff" : "#f0d3b8" }}>
                  
                    {col.subtitle} · {col.items}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                    {col.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    {col.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-all group-hover:gap-3 group-hover:bg-brand">
                    Explore Collection <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Container>
    </section>);

}
