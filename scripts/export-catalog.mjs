// Export the static storefront catalog to JSON for the backend to import into
// the DB `products` table (so checkout can price orders server-side).
//
// Run from the UI project root:
//   "/path/to/node.exe" --experimental-default-type=module scripts/export-catalog.mjs
// Writes: ../Himalayan-Mart-api/Himalayan-api/scripts/catalog.json
import { writeFileSync } from "node:fs";
import { products } from "../src/data/products.js";

const rows = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.price ?? 0,
  mrp: p.mrp ?? null,
  rating: p.rating ?? 0,
  reviews: p.reviews ?? 0,
  short_description: p.shortDescription ?? null,
  description: p.description ?? null,
  warranty: p.warranty ?? null,
  seating: p.seating ?? null,
  weight: p.weight ?? null,
  in_stock: p.inStock !== false,
  best_seller: p.bestSeller === true,
  is_new: p.isNew === true,
  images: p.images ?? [],
  materials: p.materials ?? [],
  colors: p.colors ?? [],
  dimensions: p.dimensions ?? {},
  badges: p.badges ?? [],
  specs: p.specs ?? []
}));

const out = "../Himalayan-Mart-api/Himalayan-api/scripts/catalog.json";
writeFileSync(out, JSON.stringify(rows, null, 2));
console.log(`Wrote ${rows.length} products to ${out}`);
