// ---------------------------------------------------------------------------
// Storefront catalog data layer. Reads products/categories from the backend
// public API (so admin edits show up), converting snake_case -> camelCase, and
// FALLS BACK to the static src/data files if the API errors or is empty — so
// the site never breaks (during build, migration, or an API outage).
//
// Server components import these async getters directly. Client components use
// the CatalogProvider (which fetches the product list once) instead.
// ---------------------------------------------------------------------------

import { API_BASE, toCamel } from "@/lib/api";
import {
  products as STATIC_PRODUCTS } from
"@/data/products";
import { categories as STATIC_CATEGORIES } from "@/data/categories";
import { blogPosts as STATIC_BLOGS } from "@/data/blog";
import { caseStudies as STATIC_CASE_STUDIES } from "@/data/caseStudies";
import { stories as STATIC_STORIES } from "@/data/stories";
import { galleryItems as STATIC_GALLERY } from "@/data/gallery";
import { faqs as STATIC_FAQS } from "@/data/faqs";

const REVALIDATE = 300; // seconds — admin edits appear within ~5 min

async function fetchPublic(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}/public/${path}`, {
      next: { revalidate: REVALIDATE },
      // Fail fast (don't hang the build/render) if the API is slow/unreachable
      // — we fall back to the static catalog in that case.
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    const data = json?.data;
    if (data == null || Array.isArray(data) && data.length === 0) return fallback;
    return toCamel(data);
  } catch {
    return fallback;
  }
}

// --- Products ---------------------------------------------------------------
export async function getProducts() {
  return fetchPublic("products", STATIC_PRODUCTS);
}

export async function getProduct(slug) {
  const data = await fetchPublic(`products/slug/${encodeURIComponent(slug)}`, null);
  return data || STATIC_PRODUCTS.find((p) => p.slug === slug) || null;
}

export async function getCategories() {
  return fetchPublic("categories", STATIC_CATEGORIES);
}

// --- Editorial content ------------------------------------------------------
async function getBySlug(list, slug, fallbackList) {
  const data = await fetchPublic(`${list}/slug/${encodeURIComponent(slug)}`, null);
  return data || fallbackList.find((x) => x.slug === slug) || null;
}

export const getBlogs = () => fetchPublic("blogs", STATIC_BLOGS);
export const getBlog = (slug) => getBySlug("blogs", slug, STATIC_BLOGS);

export const getCaseStudies = () => fetchPublic("case-studies", STATIC_CASE_STUDIES);
export const getCaseStudy = (slug) => getBySlug("case-studies", slug, STATIC_CASE_STUDIES);

export const getStories = () => fetchPublic("stories", STATIC_STORIES);
export const getStory = (slug) => getBySlug("stories", slug, STATIC_STORIES);

export const getGallery = () => fetchPublic("gallery", STATIC_GALLERY);
export const getFaqs = () => fetchPublic("faqs", STATIC_FAQS);

// --- Derived helpers (mirror the old module-level exports in products.js) ----
export const bestSellersOf = (products) => products.filter((p) => p.bestSeller);

export const productsInCategory = (products, slug) =>
products.filter((p) => p.category === slug);

export function materialsOf(products) {
  return Array.from(new Set(products.flatMap((p) => p.materials || []))).sort();
}

export function colorsOf(products) {
  const map = new Map();
  products.forEach((p) => (p.colors || []).forEach((c) => map.set(c.name, c)));
  return Array.from(map.values());
}

export function priceRangeOf(products) {
  const prices = products.map((p) => p.price || 0);
  return { min: 0, max: prices.length ? Math.max(...prices) : 0 };
}
