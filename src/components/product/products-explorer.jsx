"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Frown } from "lucide-react";
import { collections, collectionCategories } from "@/data/collections";
import { cn, formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/components/providers/catalog-provider";

const PAGE_SIZE = 8;

export function ProductsExplorer() {
  const { products, categories, allMaterials, allColors, priceRange } = useCatalog();
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const initialCollection = params.get("collection");
  const paramsKey = params.toString();

  const [query, setQuery] = React.useState("");
  const [cats, setCats] = React.useState(
    initialCategory ? [initialCategory] : []
  );
  const [colls, setColls] = React.useState(
    initialCollection ? [initialCollection] : []
  );
  const [mats, setMats] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [maxPrice, setMaxPrice] = React.useState(priceRange.max);
  const [sort, setSort] = React.useState("featured");
  const [visible, setVisible] = React.useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Re-sync every filter with the URL whenever it changes. Navigating to
  // /products (e.g. "View all products") clears the query string, which resets
  // all filters and dropdowns back to their defaults.
  React.useEffect(() => {
    setQuery("");
    setCats(initialCategory ? [initialCategory] : []);
    setColls(initialCollection ? [initialCollection] : []);
    setMats([]);
    setColors([]);
    setMaxPrice(priceRange.max);
    setSort("featured");
    setDrawerOpen(false);
    setVisible(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  const toggle =
  (setter) =>
  (val) =>
  setter((s) =>
  s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
  );

  const filtered = React.useMemo(() => {
    const collCats = colls.length ?
    new Set(colls.flatMap((slug) => collectionCategories[slug] ?? [])) :
    null;
    let list = products.filter((p) => {
      if (query && !`${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()))
      return false;
      if (collCats && !collCats.has(p.category)) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (mats.length && !p.materials.some((m) => mats.includes(m))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name)))
      return false;
      if (p.price > maxPrice && p.price !== 0) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.bestSeller) - Number(a.bestSeller)
        );
    }
    return list;
  }, [query, colls, cats, mats, colors, maxPrice, sort]);

  React.useEffect(() => setVisible(PAGE_SIZE), [query, colls, cats, mats, colors, maxPrice, sort]);

  const activeCount =
  colls.length + cats.length + mats.length + colors.length + (
  maxPrice < priceRange.max ? 1 : 0);

  const clearAll = () => {
    setColls([]);
    setCats([]);
    setMats([]);
    setColors([]);
    setMaxPrice(priceRange.max);
    setQuery("");
  };

  const Filters =
  <div className="space-y-7">
      <FilterGroup title="Shop by Collection">
        {collections.map((col) =>
      <CheckRow
        key={col.slug}
        label={col.name}
        checked={colls.includes(col.slug)}
        onChange={() => toggle(setColls)(col.slug)} />

      )}
      </FilterGroup>

      <FilterGroup title="Category">
        {categories.map((c) =>
      <CheckRow
        key={c.slug}
        label={c.name}
        count={c.count}
        checked={cats.includes(c.slug)}
        onChange={() => toggle(setCats)(c.slug)} />

      )}
      </FilterGroup>

      <FilterGroup title="Price">
        <input
        type="range"
        min={0}
        max={priceRange.max}
        step={1000}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full accent-brand"
        aria-label="Maximum price" />
      
        <div className="mt-2 flex justify-between text-sm text-warmbrown">
          <span>{formatPrice(0)}</span>
          <span className="font-semibold text-charcoal">
            Up to {formatPrice(maxPrice)}
          </span>
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        {allMaterials.map((m) =>
      <CheckRow
        key={m}
        label={m}
        checked={mats.includes(m)}
        onChange={() => toggle(setMats)(m)} />

      )}
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2.5 pt-1">
          {allColors.map((c) =>
        <button
          key={c.name}
          title={c.name}
          aria-label={c.name}
          onClick={() => toggle(setColors)(c.name)}
          className={cn(
            "h-8 w-8 rounded-full border-2 transition-all",
            colors.includes(c.name) ?
            "border-brand ring-2 ring-brand/30" :
            "border-border hover:scale-110"
          )}
          style={{ backgroundColor: c.hex }} />

        )}
        </div>
      </FilterGroup>
    </div>;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28 rounded-2xl border border-border bg-surface p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Filters</h2>
            {activeCount > 0 &&
            <button
              onClick={clearAll}
              className="text-sm font-medium text-brand hover:underline">
              
                Clear ({activeCount})
              </button>
            }
          </div>
          {Filters}
        </div>
      </aside>

      {/* Main */}
      <div className="lg:col-span-9">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search furniture…"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-11 text-sm outline-none transition-colors focus:border-brand" />

            {query &&
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-beige hover:text-charcoal">

                <X size={16} />
              </button>
            }
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-medium lg:hidden">
              
              <SlidersHorizontal size={16} /> Filters
              {activeCount > 0 &&
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
                  {activeCount}
                </span>
              }
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-full border border-border bg-surface py-3 pl-4 pr-10 text-sm font-medium outline-none focus:border-brand"
                aria-label="Sort products">
                
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              
            </div>
          </div>
        </div>

        <p className="mb-5 text-sm text-muted">
          Showing{" "}
          <span className="font-semibold text-charcoal">
            {Math.min(visible, filtered.length)}
          </span>{" "}
          of {filtered.length} products
        </p>

        {filtered.length === 0 ?
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Frown size={40} className="text-muted" />
            <p className="mt-4 font-display text-xl font-semibold">
              No products match your filters
            </p>
            <Button onClick={clearAll} variant="outline" className="mt-5">
              Clear all filters
            </Button>
          </div> :

        <>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {filtered.slice(0, visible).map((p) =>
            <ProductCard key={p.slug} product={p} />
            )}
            </div>
            {visible < filtered.length &&
          <div className="mt-10 text-center">
                <Button
              size="lg"
              variant="outline"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              
                  Load More
                </Button>
              </div>
          }
          </>
        }
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen &&
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[80] bg-charcoal/60 lg:hidden" />
          
            <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-6 lg:hidden">
            
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Filters</h2>
                <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-beige"
                aria-label="Close filters">
                
                  <X size={18} />
                </button>
              </div>
              {Filters}
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={clearAll}>
                  Clear
                </Button>
                <Button className="flex-1" onClick={() => setDrawerOpen(false)}>
                  Show {filtered.length} results
                </Button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}

function FilterGroup({
  title,
  children

}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-charcoal">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>);

}

function CheckRow({
  label,
  count,
  checked,
  onChange

}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-warmbrown hover:text-charcoal">
      <span
        className={cn(
          "flex h-4.5 w-4.5 items-center justify-center rounded border transition-colors",
          checked ? "border-brand bg-brand text-white" : "border-border bg-surface"
        )}
        style={{ height: 18, width: 18 }}>
        
        {checked &&
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
            d="M2 6l3 3 5-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
          </svg>
        }
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only" />
      
      <span className="flex-1">{label}</span>
      {count !== undefined && count > 0 &&
      <span className="text-xs text-muted">{count}</span>
      }
    </label>);

}
