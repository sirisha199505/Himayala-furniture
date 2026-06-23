
import { img, POOL, REAL } from "./images";

export const caseStudies = [
{
  slug: "modern-villa-living-hyderabad",
  title: "A Modern Villa's Living Spaces",
  client: "The Reddy Residence",
  location: "Jubilee Hills, Hyderabad",
  category: "Residential",
  cover: img(POOL.living[0], 1400),
  gallery: [img(POOL.living[0]), img(POOL.living[1]), REAL.p1, img(POOL.sofas[0]), img(POOL.dining[0])],
  summary:
  "A complete living and dining fit-out for a 4,000 sq ft villa, blending warm minimalism with family-friendly durability.",
  requirement:
  "The family wanted a cohesive, magazine-worthy living and dining space that could withstand two young children and frequent entertaining — without feeling precious.",
  challenges: [
  "Double-height living room that risked feeling cold and cavernous",
  "Need for stain-resistant, child-safe materials",
  "Tight six-week timeline before a family celebration"],

  solution:
  "We anchored the double-height space with the Aspen L-shaped sectional in a performance weave, layered warm walnut TV and storage units, and paired the Everest 6-seater dining set with a Crest crockery unit. A consistent ivory-and-walnut palette tied the rooms together.",
  furnitureUsed: [
  "Aspen L-Shaped Sectional",
  "Everest 6-Seater Dining Set",
  "Horizon Floating TV Unit",
  "Crest Crockery Unit",
  "Nesting Tea Table Trio"],

  outcome:
  "Delivered and installed in five weeks — a day ahead of schedule. The family reports the space is both the most beautiful and the most used room in the home.",
  stats: [
  { label: "Area", value: "4,000 sq ft" },
  { label: "Timeline", value: "5 weeks" },
  { label: "Pieces", value: "18" },
  { label: "Satisfaction", value: "5.0 / 5" }]

},
{
  slug: "startup-office-fitout-bengaluru",
  title: "A Growing Startup's Office Fit-Out",
  client: "Nimbus Technologies",
  location: "Koramangala, Bengaluru",
  category: "Commercial",
  cover: img(POOL.office[0], 1400),
  gallery: [img(POOL.office[0]), img(POOL.office[1]), img(POOL.office[2]), img(POOL.chairs[1])],
  summary:
  "Furnishing a 60-seat office for a fast-scaling startup with ergonomic, durable and brand-aligned furniture.",
  requirement:
  "Nimbus needed to furnish a new 60-seat office quickly, with ergonomic seating, collaborative workstations and an executive cabin that reflected their ambition.",
  challenges: [
  "Aggressive two-week move-in deadline",
  "Budget discipline without compromising ergonomics",
  "Mix of open-plan, meeting and executive zones"],

  solution:
  "We deployed Twin Workstations across the floor, Ergo Mesh chairs for every desk, Executive Boss Chairs and a Summit desk for the leadership cabin, and Visitor Chair sets for meeting rooms — all in a unified charcoal-and-walnut scheme.",
  furnitureUsed: [
  "Twin Workstation (2-Person)",
  "Ergo Mesh Office Chair",
  "Executive Boss Chair Pro",
  "Summit Executive Office Desk",
  "Visitor Chair (Set of 2)"],

  outcome:
  "Fully installed in 11 days. Nimbus cut their furnishing budget by 28% versus competing quotes while upgrading ergonomics across the board.",
  stats: [
  { label: "Seats", value: "60" },
  { label: "Timeline", value: "11 days" },
  { label: "Budget saved", value: "28%" },
  { label: "Satisfaction", value: "4.9 / 5" }]

},
{
  slug: "boutique-bedroom-makeover-chennai",
  title: "A Boutique Bedroom Makeover",
  client: "The Iyer Apartment",
  location: "Adyar, Chennai",
  category: "Residential",
  cover: img(POOL.beds[1], 1400),
  gallery: [img(POOL.beds[1]), REAL.p2, img(POOL.wardrobes[0]), img(POOL.beds[0])],
  summary:
  "Transforming a compact master bedroom into a serene, storage-rich retreat.",
  requirement:
  "A couple wanted to convert a cramped 140 sq ft bedroom into a calm, hotel-like retreat with maximum storage and zero clutter.",
  challenges: [
  "Very limited floor area",
  "Need for extensive concealed storage",
  "Low ceiling height limiting wardrobe options"],

  solution:
  "We installed a Kashmir upholstered king bed with hydraulic storage, a Vault 4-door sliding wardrobe with a mirror panel to expand the space visually, and slim Nest bedside tables. A warm beige palette completed the boutique-hotel feel.",
  furnitureUsed: [
  "Kashmir Upholstered King Bed",
  "Vault 4-Door Sliding Wardrobe",
  "Nest Bedside Table"],

  outcome:
  "The couple gained 40% more storage and a dramatically more spacious-feeling room — all within a compact footprint and a four-week build.",
  stats: [
  { label: "Area", value: "140 sq ft" },
  { label: "Timeline", value: "4 weeks" },
  { label: "Extra storage", value: "+40%" },
  { label: "Satisfaction", value: "5.0 / 5" }]

}];

export const caseStudyBySlug = (slug) =>
caseStudies.find((c) => c.slug === slug);
