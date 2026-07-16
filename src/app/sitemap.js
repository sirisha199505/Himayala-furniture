
import { SITE } from "@/lib/site";
import { getProducts } from "@/lib/catalog";
import { collections } from "@/data/collections";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/caseStudies";
import { stories } from "@/data/stories";

export default async function sitemap() {
  const base = SITE.url;
  const now = new Date();
  const products = await getProducts();

  const staticPages = [
  "",
  "/products",
  "/collections",
  "/gallery",
  "/stories",
  "/case-studies",
  "/blog",
  "/faq",
  "/contact"].
  map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8
  }));

  const dynamic = [
  ...products.map((p) => `/products/${p.slug}`),
  ...collections.map((c) => `/collections/${c.slug}`),
  ...blogPosts.map((b) => `/blog/${b.slug}`),
  ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  ...stories.map((s) => `/stories/${s.slug}`)].
  map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticPages, ...dynamic];
}
