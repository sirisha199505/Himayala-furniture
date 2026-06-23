
import { img, POOL, REAL } from "./images";

const colorSwatch = {
  walnut: { name: "Walnut", hex: "#7a5c45" },
  charcoal: { name: "Charcoal", hex: "#2b2b2b" },
  ivory: { name: "Ivory", hex: "#efe8dd" },
  teak: { name: "Teak", hex: "#9c6b3f" },
  beige: { name: "Beige", hex: "#d9cbb6" },
  rust: { name: "Rust", hex: "#b7410e" },
  grey: { name: "Stone Grey", hex: "#9ca3af" },
  forest: { name: "Forest", hex: "#3f5340" }
};

function build(p) {
  return {
    ...p,
    specs:
    p.specs ?? [
    { label: "Primary Material", value: p.materials.join(", ") },
    { label: "Dimensions (W×D×H)", value: `${p.dimensions.width} × ${p.dimensions.depth} × ${p.dimensions.height} cm` },
    { label: "Warranty", value: p.warranty },
    { label: "Assembly", value: "Expert installation included" },
    { label: "Finish", value: "Hand-rubbed matte PU" }]

  };
}

export const products = [
build({
  slug: "himalaya-3-seater-sofa",
  name: "Himalaya 3-Seater Sofa",
  category: "sofas",
  price: 54990,
  mrp: 72990,
  rating: 4.8,
  reviews: 214,
  shortDescription: "A grand 3-seater with deep cushioning and a solid sheesham frame.",
  description:
  "The Himalaya 3-seater is our flagship sofa — a kiln-dried sheesham hardwood frame wrapped in high-resilience foam and premium textured upholstery. Wide track arms, feather-blend back cushions and a tailored silhouette make it the centrepiece your living room deserves.",
  images: [img(POOL.sofas[0]), img(POOL.sofas[1]), REAL.p1, img(POOL.living[0])],
  materials: ["Sheesham Hardwood", "HR Foam", "Textured Fabric"],
  colors: [colorSwatch.beige, colorSwatch.charcoal, colorSwatch.forest],
  dimensions: { width: 210, depth: 92, height: 86 },
  weight: 58,
  warranty: "5-Year Frame Warranty",
  seating: "3 Seater",
  badges: ["Best Seller", "Free Delivery"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "aspen-l-shaped-sectional",
  name: "Aspen L-Shaped Sectional",
  category: "sofas",
  price: 89990,
  mrp: 114990,
  rating: 4.9,
  reviews: 156,
  shortDescription: "Modular L-shape with a chaise — built for big-family lounging.",
  description:
  "A generous modular sectional with a reversible chaise, pocket-spring seating and a stain-resistant weave. The Aspen brings hotel-lobby comfort into your home with a frame engineered to last decades.",
  images: [img(POOL.sofas[1]), img(POOL.sofas[2]), img(POOL.living[1])],
  materials: ["Engineered Wood", "Pocket Springs", "Performance Weave"],
  colors: [colorSwatch.grey, colorSwatch.beige, colorSwatch.charcoal],
  dimensions: { width: 268, depth: 168, height: 84 },
  weight: 92,
  warranty: "5-Year Frame Warranty",
  seating: "5–6 Seater",
  badges: ["New", "Premium"],
  isNew: true,
  inStock: true
}),
build({
  slug: "kashmir-upholstered-king-bed",
  name: "Kashmir Upholstered King Bed",
  category: "beds",
  price: 64990,
  mrp: 82990,
  rating: 4.8,
  reviews: 189,
  shortDescription: "King bed with a channel-tufted headboard and hydraulic storage.",
  description:
  "The Kashmir pairs a dramatic channel-tufted headboard with whisper-quiet hydraulic storage beneath. A solid frame, reinforced slats and a plush fabric finish make it the calm centre of a luxurious bedroom.",
  images: [img(POOL.beds[0]), img(POOL.beds[1]), REAL.p2, img(POOL.beds[2])],
  materials: ["Solid Pine", "Ply Box", "Velvet-touch Fabric"],
  colors: [colorSwatch.beige, colorSwatch.grey, colorSwatch.rust],
  dimensions: { width: 198, depth: 215, height: 120 },
  weight: 110,
  warranty: "3-Year Warranty",
  seating: "King (78×72)",
  badges: ["Best Seller", "Hydraulic Storage"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "nordic-queen-storage-bed",
  name: "Nordic Queen Storage Bed",
  category: "beds",
  price: 48990,
  mrp: 61990,
  rating: 4.7,
  reviews: 142,
  shortDescription: "Clean Scandinavian lines with drawer storage.",
  description:
  "Minimal, warm and endlessly practical — the Nordic queen bed offers four spacious drawers, a low-profile headboard and a teak-finish frame that suits any palette.",
  images: [img(POOL.beds[2]), img(POOL.beds[3]), img(POOL.beds[0])],
  materials: ["Engineered Wood", "Teak Veneer"],
  colors: [colorSwatch.teak, colorSwatch.walnut, colorSwatch.ivory],
  dimensions: { width: 168, depth: 205, height: 100 },
  weight: 88,
  warranty: "3-Year Warranty",
  seating: "Queen (72×60)",
  isNew: true,
  inStock: true
}),
build({
  slug: "everest-6-seater-dining-set",
  name: "Everest 6-Seater Dining Set",
  category: "dining-sets",
  price: 74990,
  mrp: 94990,
  rating: 4.9,
  reviews: 121,
  shortDescription: "Solid acacia table with six cushioned chairs.",
  description:
  "Built around a thick solid-acacia top with a live-edge character, the Everest seats six in cushioned comfort. A heirloom dining set for the gatherings that matter.",
  images: [img(POOL.dining[0]), img(POOL.dining[1]), REAL.p3, img(POOL.dining[2])],
  materials: ["Solid Acacia", "Cushioned Seats"],
  colors: [colorSwatch.walnut, colorSwatch.teak],
  dimensions: { width: 180, depth: 90, height: 76 },
  weight: 75,
  warranty: "5-Year Warranty",
  seating: "6 Seater",
  badges: ["Best Seller"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "aria-4-seater-dining-set",
  name: "Aria 4-Seater Dining Set",
  category: "dining-sets",
  price: 42990,
  mrp: 53990,
  rating: 4.6,
  reviews: 98,
  shortDescription: "Compact dining for modern apartments.",
  description:
  "A space-smart four-seater with a rounded-corner top and ergonomic chairs — perfect for apartments that want big style in a small footprint.",
  images: [img(POOL.dining[2]), img(POOL.dining[3]), img(POOL.dining[0])],
  materials: ["Sheesham", "Fabric Seats"],
  colors: [colorSwatch.walnut, colorSwatch.beige],
  dimensions: { width: 120, depth: 75, height: 75 },
  weight: 48,
  warranty: "3-Year Warranty",
  seating: "4 Seater",
  inStock: true
}),
build({
  slug: "executive-boss-chair-pro",
  name: "Executive Boss Chair Pro",
  category: "office-furniture",
  price: 18990,
  mrp: 26990,
  rating: 4.7,
  reviews: 276,
  shortDescription: "High-back leatherette boss chair with lumbar support.",
  description:
  "A commanding high-back chair with multi-tilt recline, adjustable lumbar, padded armrests and premium leatherette. Designed for long days at the helm.",
  images: [img(POOL.office[0]), img(POOL.chairs[1]), img(POOL.office[1])],
  materials: ["Leatherette", "Nylon Base", "Class-4 Gas Lift"],
  colors: [colorSwatch.charcoal, colorSwatch.walnut],
  dimensions: { width: 68, depth: 70, height: 122 },
  weight: 19,
  warranty: "2-Year Warranty",
  badges: ["Best Seller"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "summit-executive-office-desk",
  name: "Summit Executive Office Desk",
  category: "office-furniture",
  price: 36990,
  mrp: 47990,
  rating: 4.8,
  reviews: 87,
  shortDescription: "Executive desk with integrated storage and cable management.",
  description:
  "The Summit desk pairs a broad work surface with a side return, lockable drawers and discreet cable routing — a workspace that means business.",
  images: [img(POOL.office[1]), img(POOL.office[2]), img(POOL.office[3])],
  materials: ["Engineered Wood", "Walnut Laminate"],
  colors: [colorSwatch.walnut, colorSwatch.charcoal],
  dimensions: { width: 160, depth: 80, height: 75 },
  weight: 64,
  warranty: "3-Year Warranty",
  isNew: true,
  inStock: true
}),
build({
  slug: "ergo-mesh-office-chair",
  name: "Ergo Mesh Office Chair",
  category: "chairs",
  price: 12990,
  mrp: 17990,
  rating: 4.6,
  reviews: 312,
  shortDescription: "Breathable mesh chair with synchro-tilt.",
  description:
  "All-day ergonomic support with a breathable mesh back, adjustable headrest, synchro-tilt mechanism and 3D armrests. Posture, sorted.",
  images: [img(POOL.chairs[1]), img(POOL.chairs[2]), img(POOL.office[0])],
  materials: ["Mesh", "Aluminium Base"],
  colors: [colorSwatch.charcoal, colorSwatch.grey],
  dimensions: { width: 66, depth: 66, height: 118 },
  weight: 16,
  warranty: "2-Year Warranty",
  badges: ["Best Seller"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "lumen-accent-armchair",
  name: "Lumen Accent Armchair",
  category: "chairs",
  price: 21990,
  mrp: 28990,
  rating: 4.8,
  reviews: 64,
  shortDescription: "Sculptural accent chair in boucle.",
  description:
  "A sculptural barrel chair upholstered in cosy boucle on tapered wooden legs — the perfect reading nook companion or living-room accent.",
  images: [img(POOL.chairs[3]), img(POOL.chairs[0]), img(POOL.living[2])],
  materials: ["Boucle Fabric", "Solid Wood Legs"],
  colors: [colorSwatch.ivory, colorSwatch.rust, colorSwatch.forest],
  dimensions: { width: 78, depth: 80, height: 82 },
  weight: 18,
  warranty: "2-Year Warranty",
  isNew: true,
  inStock: true
}),
build({
  slug: "vault-4-door-sliding-wardrobe",
  name: "Vault 4-Door Sliding Wardrobe",
  category: "wardrobes",
  price: 79990,
  mrp: 99990,
  rating: 4.8,
  reviews: 73,
  shortDescription: "Soft-close sliding wardrobe with mirror panel.",
  description:
  "A floor-to-ceiling sliding wardrobe with soft-close runners, a full-length mirror, adjustable shelving and a dedicated accessory drawer — storage engineered around your wardrobe.",
  images: [img(POOL.wardrobes[0]), img(POOL.wardrobes[1]), img(POOL.wardrobes[2])],
  materials: ["BWP Plywood", "Laminate Finish", "Soft-close Runners"],
  colors: [colorSwatch.walnut, colorSwatch.ivory, colorSwatch.charcoal],
  dimensions: { width: 240, depth: 60, height: 220 },
  weight: 160,
  warranty: "7-Year Warranty",
  badges: ["Premium"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "haven-3-door-wardrobe",
  name: "Haven 3-Door Wardrobe",
  category: "wardrobes",
  price: 52990,
  mrp: 67990,
  rating: 4.6,
  reviews: 51,
  shortDescription: "Hinged 3-door wardrobe with drawers.",
  description:
  "Classic hinged wardrobe with a hanging section, multiple shelves and external drawers — timeless storage with a hand-finished matte surface.",
  images: [img(POOL.wardrobes[2]), img(POOL.wardrobes[3]), img(POOL.wardrobes[0])],
  materials: ["Engineered Wood", "Matte Laminate"],
  colors: [colorSwatch.teak, colorSwatch.ivory],
  dimensions: { width: 135, depth: 55, height: 200 },
  weight: 95,
  warranty: "5-Year Warranty",
  inStock: true
}),
build({
  slug: "horizon-floating-tv-unit",
  name: "Horizon Floating TV Unit",
  category: "tv-units",
  price: 27990,
  mrp: 35990,
  rating: 4.7,
  reviews: 134,
  shortDescription: "Wall-mounted TV unit with LED niche.",
  description:
  "A sleek wall-mounted media console with push-to-open drawers, an open display niche and concealed cable management — it makes your wall float.",
  images: [img(POOL.storage[1]), img(POOL.living[3]), img(POOL.storage[2])],
  materials: ["Engineered Wood", "PU Finish"],
  colors: [colorSwatch.charcoal, colorSwatch.walnut],
  dimensions: { width: 180, depth: 35, height: 40 },
  weight: 42,
  warranty: "3-Year Warranty",
  badges: ["Best Seller"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "meridian-floor-tv-unit",
  name: "Meridian Floor TV Unit",
  category: "tv-units",
  price: 23990,
  mrp: 30990,
  rating: 4.5,
  reviews: 76,
  shortDescription: "Spacious floor-standing entertainment unit.",
  description:
  "Generous storage for media, consoles and decor with a mix of closed cabinets and open shelves on a warm wood base.",
  images: [img(POOL.storage[2]), img(POOL.storage[3]), img(POOL.living[3])],
  materials: ["Sheesham", "Glass Inserts"],
  colors: [colorSwatch.walnut, colorSwatch.teak],
  dimensions: { width: 150, depth: 40, height: 55 },
  weight: 50,
  warranty: "3-Year Warranty",
  inStock: true
}),
build({
  slug: "scholar-study-table",
  name: "Scholar Study Table",
  category: "study-tables",
  price: 14990,
  mrp: 19990,
  rating: 4.6,
  reviews: 158,
  shortDescription: "Compact study desk with shelf and drawers.",
  description:
  "An efficient study table with an overhead shelf, two drawers and cable routing — built for focus in homes and dorms alike.",
  images: [img(POOL.office[3]), img(POOL.office[1]), img(POOL.storage[0])],
  materials: ["Engineered Wood", "Laminate"],
  colors: [colorSwatch.teak, colorSwatch.ivory],
  dimensions: { width: 110, depth: 55, height: 75 },
  weight: 32,
  warranty: "2-Year Warranty",
  badges: ["Best Seller"],
  bestSeller: true,
  inStock: true
}),
build({
  slug: "atlas-bookshelf-5-tier",
  name: "Atlas 5-Tier Bookshelf",
  category: "storage-furniture",
  price: 16990,
  mrp: 22990,
  rating: 4.7,
  reviews: 92,
  shortDescription: "Tall solid-wood bookshelf.",
  description:
  "A sturdy five-tier bookshelf in solid wood with anti-tip hardware — equal parts library and display, ready for a lifetime of stories.",
  images: [img(POOL.storage[0]), img(POOL.storage[3]), img(POOL.living[0])],
  materials: ["Solid Sheesham"],
  colors: [colorSwatch.walnut, colorSwatch.teak],
  dimensions: { width: 90, depth: 35, height: 180 },
  weight: 44,
  warranty: "3-Year Warranty",
  inStock: true
}),
build({
  slug: "stride-shoe-rack-cabinet",
  name: "Stride Shoe Rack Cabinet",
  category: "storage-furniture",
  price: 11990,
  mrp: 15990,
  rating: 4.5,
  reviews: 110,
  shortDescription: "Enclosed shoe cabinet with flip drawers.",
  description:
  "Keep the entryway pristine with flip-down compartments that store up to 18 pairs behind a clean, slim profile.",
  images: [img(POOL.storage[3]), img(POOL.storage[2]), REAL.p4],
  materials: ["Engineered Wood", "Metal Hinges"],
  colors: [colorSwatch.ivory, colorSwatch.walnut],
  dimensions: { width: 80, depth: 24, height: 110 },
  weight: 28,
  warranty: "2-Year Warranty",
  isNew: true,
  inStock: true
}),
build({
  slug: "crest-crockery-unit",
  name: "Crest Crockery Unit",
  category: "storage-furniture",
  price: 32990,
  mrp: 42990,
  rating: 4.8,
  reviews: 47,
  shortDescription: "Glass-front crockery display cabinet.",
  description:
  "Display your finest with toughened glass doors, interior lighting provision and a solid base of drawers — a dining-room jewel box.",
  images: [img(POOL.storage[2]), img(POOL.dining[1]), img(POOL.storage[0])],
  materials: ["Sheesham", "Toughened Glass"],
  colors: [colorSwatch.walnut, colorSwatch.teak],
  dimensions: { width: 100, depth: 45, height: 185 },
  weight: 70,
  warranty: "5-Year Warranty",
  badges: ["Premium"],
  inStock: true
}),
build({
  slug: "nest-bedside-table",
  name: "Nest Bedside Table",
  category: "storage-furniture",
  price: 7990,
  mrp: 10990,
  rating: 4.6,
  reviews: 203,
  shortDescription: "Two-drawer bedside table.",
  description:
  "A compact bedside companion with two soft-close drawers and a display top — the perfect pair for any bed.",
  images: [img(POOL.storage[3]), img(POOL.beds[1]), img(POOL.storage[0])],
  materials: ["Engineered Wood"],
  colors: [colorSwatch.walnut, colorSwatch.ivory, colorSwatch.teak],
  dimensions: { width: 45, depth: 40, height: 55 },
  weight: 14,
  warranty: "2-Year Warranty",
  bestSeller: true,
  inStock: true
}),
build({
  slug: "visitor-chair-set-of-2",
  name: "Visitor Chair (Set of 2)",
  category: "office-furniture",
  price: 9990,
  mrp: 13990,
  rating: 4.5,
  reviews: 88,
  shortDescription: "Cantilever visitor chairs with cushioned seat.",
  description:
  "A pair of sturdy cantilever visitor chairs with cushioned seats and a chrome frame — boardroom comfort for guests.",
  images: [img(POOL.chairs[2]), img(POOL.office[0]), img(POOL.chairs[1])],
  materials: ["Chrome Frame", "Leatherette"],
  colors: [colorSwatch.charcoal],
  dimensions: { width: 55, depth: 60, height: 90 },
  weight: 12,
  warranty: "1-Year Warranty",
  inStock: true
}),
build({
  slug: "tea-table-nesting-trio",
  name: "Nesting Tea Table Trio",
  category: "storage-furniture",
  price: 13990,
  mrp: 18990,
  rating: 4.7,
  reviews: 71,
  shortDescription: "Set of three nesting tables.",
  description:
  "Three solid-wood tables that tuck neatly together — endlessly flexible for tea, snacks and surprise guests.",
  images: [img(POOL.living[2]), img(POOL.dining[3]), img(POOL.living[0])],
  materials: ["Solid Mango Wood"],
  colors: [colorSwatch.walnut, colorSwatch.teak],
  dimensions: { width: 50, depth: 40, height: 55 },
  weight: 16,
  warranty: "2-Year Warranty",
  isNew: true,
  inStock: true
}),
build({
  slug: "regal-2-seater-loveseat",
  name: "Regal 2-Seater Loveseat",
  category: "sofas",
  price: 38990,
  mrp: 49990,
  rating: 4.7,
  reviews: 96,
  shortDescription: "Compact loveseat with deep buttoning.",
  description:
  "A refined two-seater with deep-buttoned cushions and brass-tipped legs — intimate seating with a heritage feel.",
  images: [img(POOL.sofas[3]), img(POOL.sofas[0]), img(POOL.living[1])],
  materials: ["Hardwood Frame", "Premium Fabric"],
  colors: [colorSwatch.forest, colorSwatch.rust, colorSwatch.grey],
  dimensions: { width: 150, depth: 88, height: 84 },
  weight: 40,
  warranty: "5-Year Frame Warranty",
  inStock: true
}),
build({
  slug: "workstation-2-person",
  name: "Twin Workstation (2-Person)",
  category: "office-furniture",
  price: 44990,
  mrp: 57990,
  rating: 4.6,
  reviews: 39,
  shortDescription: "Back-to-back workstation with privacy screen.",
  description:
  "A space-efficient two-person workstation with a central privacy screen, cable trays and lockable pedestals — scale your office in style.",
  images: [img(POOL.office[2]), img(POOL.office[1]), img(POOL.office[3])],
  materials: ["Engineered Wood", "Steel Legs"],
  colors: [colorSwatch.ivory, colorSwatch.walnut],
  dimensions: { width: 240, depth: 120, height: 75 },
  weight: 96,
  warranty: "3-Year Warranty",
  inStock: false
}),
build({
  slug: "bespoke-custom-piece",
  name: "Bespoke Custom Piece",
  category: "custom-furniture",
  price: 0,
  rating: 5.0,
  reviews: 58,
  shortDescription: "Designed and built to your exact brief.",
  description:
  "From a one-of-a-kind dining table to a full home fit-out, our workshop builds bespoke furniture to your dimensions, materials and finish. Share your vision and our designers will bring it to life. Request a quote to begin.",
  images: [img(POOL.hero[1]), img(POOL.gallery[7]), img(POOL.gallery[8])],
  materials: ["Your choice of wood", "Custom upholstery"],
  colors: [colorSwatch.walnut, colorSwatch.teak, colorSwatch.charcoal, colorSwatch.ivory],
  dimensions: { width: 0, depth: 0, height: 0 },
  warranty: "Up to 7-Year Warranty",
  badges: ["Made to Order"],
  inStock: true,
  specs: [
  { label: "Lead Time", value: "4–6 weeks" },
  { label: "Materials", value: "Sheesham, Teak, Acacia, Engineered Wood" },
  { label: "Finish", value: "Any RAL / wood stain" },
  { label: "Design", value: "Free design consultation" }]

})];

export const productBySlug = (slug) =>
products.find((p) => p.slug === slug);

export const productsByCategory = (slug) =>
products.filter((p) => p.category === slug);

export const bestSellers = () => products.filter((p) => p.bestSeller);

export const allMaterials = Array.from(
  new Set(products.flatMap((p) => p.materials))
).sort();

export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
);

export const priceRange = {
  min: 0,
  max: Math.max(...products.map((p) => p.price))
};
