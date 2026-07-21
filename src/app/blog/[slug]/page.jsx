
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlog, getBlogs } from "@/lib/catalog";
import { readingTime } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { Prose } from "@/components/content/prose";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd, breadcrumbLd, pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 30;

export async function generateMetadata({
  params

}) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "Article not found" };
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    type: "article"
  });
}

export default async function BlogPostPage({
  params

}) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  const blogPosts = await getBlogs();
  const related = blogPosts.
  filter((p) => p.slug !== post.slug && p.category === post.category).
  slice(0, 3);
  const more = (related.length ? related : blogPosts.filter((p) => p.slug !== post.slug)).slice(0, 3);

  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <>
      <JsonLd
        data={[
        articleLd(post),
        breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` }]
        )]
        } />
      

      <Container className="py-8">
        <Breadcrumbs
          items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` }]
          } />
        
      </Container>

      <Container className="pb-14">
        <article className="mx-auto max-w-3xl">
          <Badge variant="brand">{post.category}</Badge>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-charcoal sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-bronze text-sm font-semibold text-white">
                {post.author.charAt(0)}
              </span>
              <span>
                <span className="block font-medium text-charcoal">
                  {post.author}
                </span>
                <span className="text-xs">{post.authorRole}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {date}
            </span>
            <span>{readingTime(post.content)} min read</span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover" />
            
          </div>

          <div className="mt-10">
            <Prose content={post.content} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) =>
            <span
              key={t}
              className="rounded-full bg-beige px-3 py-1 text-xs font-medium text-warmbrown">
              
                #{t}
              </span>
            )}
          </div>
        </article>

        {/* More articles */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              More to read
            </h2>
            <Button asChild variant="ghost">
              <Link href="/blog">
                All articles <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {more.map((p) =>
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-soft">
              
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" />
                
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-brand">
                    {p.category}
                  </span>
                  <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold leading-snug text-charcoal group-hover:text-brand">
                    {p.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
          </Button>
        </div>
      </Container>
    </>);

}
