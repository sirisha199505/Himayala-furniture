
import { img } from "./images";

/**
 * Categories merge the premium spec set with the real categories shown on
 * himalayanfurnituremart.in (TV Units, Wardrobes, Study Tables, Office, etc).
 */
export const categories = [
{
  slug: "sofas",
  name: "Sofas",
  tagline: "Sink into comfort",
  description:
  "Handcrafted sofas with kiln-dried hardwood frames and high-resilience foam — built for everyday luxury and years of beautiful living.",
  image: img("1555041469-a586c61ea9bc"),
  icon: "Sofa",
  count: 48,
  featured: true
},
{
  slug: "beds",
  name: "Beds",
  tagline: "Rest, reimagined",
  description:
  "Statement beds with upholstered headboards and smart storage — engineered for stability and finished to perfection.",
  image: img("1505693416388-ac5ce068fe85"),
  icon: "BedDouble",
  count: 36,
  featured: true
},
{
  slug: "dining-sets",
  name: "Dining Sets",
  tagline: "Gather in style",
  description:
  "Solid-wood dining tables and chairs designed for long dinners and lasting memories, in seating options from 4 to 8.",
  image: img("1617806118233-18e1de247200"),
  icon: "Utensils",
  count: 29,
  featured: true
},
{
  slug: "office-furniture",
  name: "Office Furniture",
  tagline: "Work, elevated",
  description:
  "Executive desks, boss chairs, visitor chairs and workstations that bring boardroom polish to every workspace.",
  image: img("1524758631624-e2822e304c36"),
  icon: "Briefcase",
  count: 52,
  featured: true
},
{
  slug: "chairs",
  name: "Chairs",
  tagline: "The art of sitting",
  description:
  "Accent chairs, ergonomic office chairs, visitor and boss chairs — a seat for every space and every posture.",
  image: img("1598300042247-d088f8ab3a91"),
  icon: "Armchair",
  count: 64
},
{
  slug: "wardrobes",
  name: "Wardrobes",
  tagline: "Storage, perfected",
  description:
  "Sliding and hinged wardrobes with intelligent interiors, soft-close fittings and finishes tailored to your room.",
  image: img("1595428774223-ef52624120d2"),
  icon: "DoorClosed",
  count: 24,
  featured: true
},
{
  slug: "tv-units",
  name: "TV Units",
  tagline: "Centre of the room",
  description:
  "Wall-mounted and floor TV units with cable management and display niches — the anchor of a modern living room.",
  image: img("1538688525198-9b88f6f53126"),
  icon: "Tv",
  count: 31,
  featured: true
},
{
  slug: "study-tables",
  name: "Study Tables",
  tagline: "Focus, by design",
  description:
  "Compact and executive study tables with cable routing and storage — built for productivity and posture.",
  image: img("1593062096033-9a26b09da705"),
  icon: "PenLine",
  count: 27
},
{
  slug: "storage-furniture",
  name: "Storage Furniture",
  tagline: "Order, beautifully",
  description:
  "Bookshelves, shoe racks, crockery units, bedside tables and chests of drawers — storage that earns its place.",
  image: img("1503602642458-232111445657"),
  icon: "Archive",
  count: 58
},
{
  slug: "custom-furniture",
  name: "Custom Furniture",
  tagline: "Made for you",
  description:
  "Bespoke furniture crafted to your exact dimensions, materials and finish — your imagination, our workshop.",
  image: img("1616486338812-3dadae4b4ace"),
  icon: "Ruler",
  count: 0,
  featured: true
}];

export const categoryBySlug = (slug) =>
categories.find((c) => c.slug === slug);
