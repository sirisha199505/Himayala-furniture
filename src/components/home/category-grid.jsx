import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export async function CategoryGrid() {
  const categories = await getCategories();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shop by Category"
          title="Furniture for every room"
          description="From statement sofas to bespoke wardrobes, explore curated categories crafted for beautiful living." />
        

        <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) =>
          <StaggerItem
            key={cat.slug}
            className={i === 0 || i === 7 ? "col-span-2 md:col-span-1" : ""}>
            
              <Link
              href={`/products?category=${cat.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
              
                <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
              
                <div className="absolute inset-0 gradient-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-bronze">
                    {cat.count > 0 ? `${cat.count} pieces` : "Made to order"}
                  </p>
                  <h3 className="mt-0.5 flex items-center justify-between font-display text-lg font-semibold text-white">
                    {cat.name}
                    <ArrowUpRight
                    size={18}
                    className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                  
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          )}
        </Stagger>
      </Container>
    </section>);

}
