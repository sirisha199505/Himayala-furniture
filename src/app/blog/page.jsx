
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { BlogList } from "@/components/blog/blog-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { getBlogs } from "@/lib/catalog";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Blog & Guides",
  description:
  "Furniture buying guides, interior design ideas, furniture care tips, workspace design and home decor inspiration from the experts at Himalayan Furniture Mart.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getBlogs();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }]
        )} />
      
      <PageHeader
        eyebrow="Journal"
        title="Ideas for beautiful living"
        description="Buying guides, design inspiration and care tips to help you make the most of your home and furniture."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" }]
        } />
      
      <Container className="py-14">
        <BlogList posts={posts} categories={categories} />
      </Container>
    </>);

}
