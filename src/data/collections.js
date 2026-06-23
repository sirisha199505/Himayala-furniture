
import { img, POOL } from "./images";

export const collections = [
{
  slug: "living-room",
  name: "Living Room Collection",
  subtitle: "Where life gathers",
  description:
  "Sofas, accent chairs, coffee and TV units curated to make your living room the warmest room in the house.",
  image: img(POOL.living[0], 1400),
  accent: "#c54a11",
  items: "140+ pieces"
},
{
  slug: "bedroom",
  name: "Bedroom Collection",
  subtitle: "Rest in luxury",
  description:
  "Beds, wardrobes and bedside storage designed for serene, clutter-free sleep — comfort that lasts a lifetime.",
  image: img(POOL.beds[1], 1400),
  accent: "#7a5c45",
  items: "90+ pieces"
},
{
  slug: "dining",
  name: "Dining Collection",
  subtitle: "Gather and feast",
  description:
  "Dining sets, crockery units and bar furniture crafted in solid wood for meals worth lingering over.",
  image: img(POOL.dining[0], 1400),
  accent: "#b58a58",
  items: "60+ pieces"
},
{
  slug: "workspace",
  name: "Workspace Collection",
  subtitle: "Work, beautifully",
  description:
  "Executive desks, ergonomic chairs and workstations that bring boardroom polish to home and office.",
  image: img(POOL.office[0], 1400),
  accent: "#b7410e",
  items: "110+ pieces"
}];

export const collectionBySlug = (slug) =>
collections.find((c) => c.slug === slug);
