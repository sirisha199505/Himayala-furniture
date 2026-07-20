
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getStory, getStories } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { Prose } from "@/components/content/prose";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params

}) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story not found" };
  return pageMeta({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.cover,
    type: "article"
  });
}

export default async function StoryPage({
  params

}) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const stories = await getStories();
  const idx = stories.findIndex((s) => s.slug === slug);
  const next = stories.length ? stories[(idx + 1) % stories.length] : null;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Our Story", url: "/stories" },
        { name: story.title, url: `/stories/${story.slug}` }]
        )} />
      

      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <Image
          src={story.cover}
          alt={story.title}
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 hero-overlay" />
        <Container className="relative flex h-full flex-col justify-end pb-12">
          <Breadcrumbs
            tone="light"
            items={[
            { name: "Home", href: "/" },
            { name: "Our Story", href: "/stories" },
            { name: story.title, href: `/stories/${story.slug}` }]
            } />
          
          <p className="eyebrow mt-5 text-bronze">{story.kicker}</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            {story.title}
          </h1>
        </Container>
      </section>

      <Container className="py-14">
        <article className="mx-auto max-w-3xl">
          <p className="text-balance font-display text-xl font-medium leading-relaxed text-charcoal sm:text-2xl">
            {story.excerpt}
          </p>
          <hr className="my-8 border-border" />
          <Prose content={story.body} />

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-border bg-beige/50 p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-warmbrown/80">
              Let our team help you craft a space you'll love for years.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <EnquiryDialog
                intent="Consultation"
                trigger={<Button size="lg">Book Consultation</Button>} />
              
              <Button asChild size="lg" variant="outline">
                <Link href="/products">Browse Furniture</Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Nav */}
        <div className="mx-auto mt-12 flex max-w-3xl items-center justify-between">
          <Button asChild variant="ghost">
            <Link href="/stories">
              <ArrowLeft size={18} /> All Stories
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/stories/${next.slug}`}>
              {next.title} <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </Container>
    </>);

}
