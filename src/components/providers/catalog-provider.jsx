"use client";

// Client-side catalog cache. Client components (cart, wishlist, compare,
// products filter, compare-bar) resolve a product by slug synchronously — they
// can't await a server fetch — so this provider fetches the active product list
// once and exposes it via useCatalog(). It initializes from the static catalog
// so SSR/first paint match (no hydration mismatch), then swaps in live DB data.

import * as React from "react";
import { API_BASE, toCamel } from "@/lib/api";
import { products as STATIC_PRODUCTS } from "@/data/products";
import { categories as STATIC_CATEGORIES } from "@/data/categories";
import { collections as STATIC_COLLECTIONS } from "@/data/collections";
import {
  bestSellersOf,
  materialsOf,
  colorsOf,
  priceRangeOf,
  normalizeProduct } from
"@/lib/catalog";

const CatalogContext = React.createContext(null);

async function loadPublic(path, fallback) {
  try {
    const r = await fetch(`${API_BASE}/public/${path}`, { cache: "no-store" });
    const j = await r.json();
    const data = j?.data;
    return Array.isArray(data) && data.length ? toCamel(data) : fallback;
  } catch {
    return fallback;
  }
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = React.useState(STATIC_PRODUCTS);
  const [categories, setCategories] = React.useState(STATIC_CATEGORIES);
  const [collections, setCollections] = React.useState(STATIC_COLLECTIONS);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    Promise.all([
    loadPublic("products", STATIC_PRODUCTS),
    loadPublic("categories", STATIC_CATEGORIES),
    loadPublic("collections", STATIC_COLLECTIONS)]).
    then(([p, c, col]) => {
      if (!alive) return;
      setProducts(p.map(normalizeProduct));
      setCategories(c);
      setCollections(col);
    }).
    finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const value = React.useMemo(() => {
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    const catBySlug = new Map(categories.map((c) => [c.slug, c]));
    return {
      products,
      categories,
      collections,
      loading,
      productBySlug: (slug) => bySlug.get(slug),
      categoryBySlug: (slug) => catBySlug.get(slug),
      bestSellers: () => bestSellersOf(products),
      allMaterials: materialsOf(products),
      allColors: colorsOf(products),
      priceRange: priceRangeOf(products)
    };
  }, [products, categories, collections, loading]);

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>);

}

export function useCatalog() {
  const ctx = React.useContext(CatalogContext);
  if (!ctx) {
    // Defensive fallback if used outside the provider.
    const bySlug = new Map(STATIC_PRODUCTS.map((p) => [p.slug, p]));
    const catBySlug = new Map(STATIC_CATEGORIES.map((c) => [c.slug, c]));
    return {
      products: STATIC_PRODUCTS,
      categories: STATIC_CATEGORIES,
      collections: STATIC_COLLECTIONS,
      loading: false,
      productBySlug: (slug) => bySlug.get(slug),
      categoryBySlug: (slug) => catBySlug.get(slug),
      bestSellers: () => STATIC_PRODUCTS.filter((p) => p.bestSeller),
      allMaterials: materialsOf(STATIC_PRODUCTS),
      allColors: colorsOf(STATIC_PRODUCTS),
      priceRange: priceRangeOf(STATIC_PRODUCTS)
    };
  }
  return ctx;
}
