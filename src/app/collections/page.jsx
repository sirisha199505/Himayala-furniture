
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCollections } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Collections",
  description:
  "Explore curated furniture collections from Himalayan Furniture Mart — Residential Homes, Office Furniture, Premium & Luxury Interiors and Hospitality Projects.",
  path: "/collections"
});

export const revalidate = 30;

export default async function CollectionsPage() {
  const collections = await getCollections();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Collections", url: "/collections" }]
        )} />
      
      <PageHeader
        eyebrow="Featured Collections"
        title="Curated for the way you live"
        description="Thoughtfully composed collections that bring harmony to every space in your home and workplace."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" }]
        } />
      
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {collections.map((col, i) =>
          <Reveal key={col.slug} delay={i * 0.07}>
              <Link
              href={`/collections/${col.slug}`}
              className="group relative block aspect-[16/11] overflow-hidden rounded-3xl shadow-soft">
              
                <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
                    {col.subtitle} · {col.items}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                    {col.name}
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    {col.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-all group-hover:gap-3 group-hover:bg-brand">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Container>
    </>);

}
