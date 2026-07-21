
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStories } from "@/lib/catalog";
import { stats } from "@/data/why";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Story — Why Himalayan",
  description:
  "The story behind Himalayan Furniture Mart — our journey, our craftsmanship, our workshop and the people who make affordable luxury furniture possible.",
  path: "/stories"
});

export const revalidate = 30;

export default async function StoriesPage() {
  const stories = await getStories();
  const [feature, ...rest] = stories;
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Our Story", url: "/stories" }]
        )} />
      
      <PageHeader
        eyebrow="Why Himalayan"
        title="The story behind the craft"
        description="More than furniture — a commitment to beautiful living, honest pricing and craftsmanship that lasts a lifetime."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Our Story", href: "/stories" }]
        } />
      

      <Container className="py-14">
        {/* Feature story */}
        <Reveal>
          <Link
            href={`/stories/${feature.slug}`}
            className="group grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-2">
            
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <Image
                src={feature.cover}
                alt={feature.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="eyebrow mb-3">{feature.kicker}</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
                {feature.title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-warmbrown/80">
                {feature.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand transition-all group-hover:gap-3">
                Read the story <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Stats band */}
        <div className="my-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border lg:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label} className="bg-surface px-6 py-8 text-center">
              <div className="font-display text-3xl font-bold text-brand sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          )}
        </div>

        {/* Other stories */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((s, i) =>
          <Reveal key={s.slug} delay={i * 0.06}>
              <Link
              href={`/stories/${s.slug}`}
              className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-soft">
              
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                  src={s.cover}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                
                  <div className="absolute inset-0 gradient-overlay opacity-60" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand backdrop-blur">
                    {s.kicker}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-brand">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-warmbrown/80">
                    {s.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Container>
    </>);

}
