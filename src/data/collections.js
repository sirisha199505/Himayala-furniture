/**
 * Fallback collections, used until collections are managed via the admin
 * (Admin → Collections). Shape matches the API's `collections` entity, including
 * `categorySlugs` — the product categories that make up each collection.
 * Backed by local hero photos in /public/images/collections.
 */

export const collections = [
{
  slug: "residential-homes",
  name: "Residential Homes",
  subtitle: "Furnish every room",
  description:
  "Sofas, beds, wardrobes, TV units and dining — everything you need to furnish a warm, beautiful home.",
  image: "/images/collections/image1.jpg",
  accent: "#c54a11",
  items: "200+ pieces",
  categorySlugs: [
  "sofas", "chairs", "tv-units", "beds", "wardrobes", "dining-sets", "storage-furniture"]
},
{
  slug: "office-furniture",
  name: "Office Furniture Solutions",
  subtitle: "Work, beautifully",
  description:
  "Executive desks, ergonomic chairs, workstations and storage engineered for productive workplaces.",
  image: "/images/collections/image2.jpg",
  accent: "#b7410e",
  items: "80+ pieces",
  categorySlugs: ["office-furniture", "study-tables", "chairs", "storage-furniture"]
},
{
  slug: "premium-luxury",
  name: "Premium & Luxury Interiors",
  subtitle: "The very best",
  description:
  "Our finest imported and bespoke pieces — statement furniture in solid wood, marble and gold-accent finishes.",
  image: "/images/collections/image3.jpg",
  accent: "#b58a58",
  items: "40+ pieces",
  categorySlugs: ["custom-furniture", "sofas", "beds", "wardrobes"]
},
{
  slug: "hospitality",
  name: "Hospitality Projects",
  subtitle: "Hotels, cafes & more",
  description:
  "Durable, stylish seating and tables for restaurants, cafes, hotels and reception spaces.",
  image: "/images/collections/image4.jpg",
  accent: "#7a5c45",
  items: "60+ pieces",
  categorySlugs: ["dining-sets", "chairs", "sofas", "storage-furniture"]
}];

export const collectionBySlug = (slug) =>
collections.find((c) => c.slug === slug);

// The product categories that make up each collection (shared by the
// collection detail page and the shop's "Shop by Collection" filter).
export const collectionCategories = Object.fromEntries(
  collections.map((c) => [c.slug, c.categorySlugs ?? []])
);

// Helper: build a slug -> categorySlugs map from any list of collections
// (DB-driven or static).
export const collectionCategoryMap = (list) =>
Object.fromEntries((list ?? []).map((c) => [c.slug, c.categorySlugs ?? []]));
