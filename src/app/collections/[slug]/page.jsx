
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProducts, getCollection } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { ProductCard } from "@/components/product/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

// Collections are DB-driven; generate on demand and revalidate.
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 30;
export const maxDuration = 30; // allow the API cold-start wait in catalog.js (Vercel default is 10s)

export async function generateMetadata({
  params

}) {
  const { slug } = await params;
  const col = await getCollection(slug);
  if (!col) return { title: "Collection not found" };
  return pageMeta({
    title: col.name,
    description: col.description,
    path: `/collections/${col.slug}`,
    image: col.image
  });
}

export default async function CollectionPage({
  params

}) {
  const { slug } = await params;
  const col = await getCollection(slug);
  if (!col) notFound();

  const cats = col.categorySlugs ?? [];
  const products = await getProducts();
  const items = products.filter((p) => cats.includes(p.category));

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Collections", url: "/collections" },
        { name: col.name, url: `/collections/${col.slug}` }]
        )} />
      

      {/* Hero */}
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <Image
          src={col.image}
          alt={col.name}
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 hero-overlay" />
        <Container className="relative flex h-full flex-col justify-end pb-10">
          <Breadcrumbs
            tone="light"
            items={[
            { name: "Home", href: "/" },
            { name: "Collections", href: "/collections" },
            { name: col.name, href: `/collections/${col.slug}` }]
            } />
          
          <p className="eyebrow mt-4 text-bronze">{col.subtitle}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {col.name}
          </h1>
          <p className="mt-3 max-w-xl text-white/80">{col.description}</p>
        </Container>
      </section>

      <Container className="py-14">
        <p className="mb-8 text-sm text-muted">
          {items.length} pieces in this collection
        </p>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((p) =>
          <ProductCard key={p.slug} product={p} />
          )}
        </div>
      </Container>
    </>);

}
