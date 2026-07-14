/**
 * Collections backed by local hero photos in /public/images/collections.
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
  items: "200+ pieces"
},
{
  slug: "office-furniture",
  name: "Office Furniture Solutions",
  subtitle: "Work, beautifully",
  description:
  "Executive desks, ergonomic chairs, workstations and storage engineered for productive workplaces.",
  image: "/images/collections/image2.jpg",
  accent: "#b7410e",
  items: "80+ pieces"
},
{
  slug: "premium-luxury",
  name: "Premium & Luxury Interiors",
  subtitle: "The very best",
  description:
  "Our finest imported and bespoke pieces — statement furniture in solid wood, marble and gold-accent finishes.",
  image: "/images/collections/image3.jpg",
  accent: "#b58a58",
  items: "40+ pieces"
},
{
  slug: "hospitality",
  name: "Hospitality Projects",
  subtitle: "Hotels, cafes & more",
  description:
  "Durable, stylish seating and tables for restaurants, cafes, hotels and reception spaces.",
  image: "/images/collections/image4.jpg",
  accent: "#7a5c45",
  items: "60+ pieces"
}];

export const collectionBySlug = (slug) =>
collections.find((c) => c.slug === slug);

// The product categories that make up each collection (shared by the
// collection detail page and the shop's "Shop by Collection" filter).
export const collectionCategories = {
  "residential-homes": [
  "sofas", "chairs", "tv-units", "beds", "wardrobes", "dining-sets", "storage-furniture"],
  "office-furniture": ["office-furniture", "study-tables", "chairs", "storage-furniture"],
  "premium-luxury": ["custom-furniture", "sofas", "beds", "wardrobes"],
  hospitality: ["dining-sets", "chairs", "sofas", "storage-furniture"]
};
