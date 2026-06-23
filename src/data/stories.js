
import { img, POOL } from "./images";

export const stories = [
{
  slug: "our-journey",
  title: "Our Journey",
  kicker: "Where it began",
  excerpt:
  "From a single workshop to pan-India delivery — the story of how Himalayan Furniture Mart redefined affordable luxury.",
  cover: img(POOL.hero[1], 1400),
  body: `Himalayan Furniture Mart began with a simple conviction: beautiful, well-made furniture shouldn't be a privilege of the few.

We started as a small workshop with a handful of master craftsmen and an obsession with detail. Word spread — not through advertising, but through the quiet satisfaction of customers whose furniture simply lasted, and looked better than pieces costing twice as much.

Today we serve families and businesses across India, but the conviction hasn't changed. Every piece still carries the same promise we started with: **high quality, low cost, no compromise.**`
},
{
  slug: "our-craftsmanship",
  title: "Our Craftsmanship",
  kicker: "The making",
  excerpt:
  "Kiln-dried hardwoods, time-honoured joinery and a finish you can feel. Inside the craft that defines every piece.",
  cover: img(POOL.dining[0], 1400),
  body: `Craftsmanship is not a marketing word for us — it's a daily discipline.

Every piece begins with timber selection. We kiln-dry our hardwoods to the precise moisture content for the Indian climate, so your furniture stays stable for decades. Joints are cut and reinforced by hand. Surfaces are sanded through multiple grits before a hand-rubbed matte finish brings out the grain.

The result is furniture that doesn't just look premium on day one — it earns its place in your home for a lifetime.`
},
{
  slug: "behind-the-workshop",
  title: "Behind the Workshop",
  kicker: "Inside the atelier",
  excerpt:
  "A look behind the curtain at the people, tools and rituals that turn raw timber into heirlooms.",
  cover: img(POOL.office[2], 1400),
  body: `Step into our workshop and you'll hear it before you see it — the rhythm of planes, the hum of sanders, the quiet focus of people who love what they make.

Our workshop pairs traditional hand-skills with modern precision tooling. Master craftsmen mentor apprentices, passing down techniques that no machine can replicate. Quality checks happen at every stage, not just at the end.

We believe the care that goes in is the comfort that comes out.`
},
{
  slug: "meet-our-team",
  title: "Meet Our Team",
  kicker: "The people",
  excerpt:
  "Designers, craftsmen and consultants united by one goal: furniture you'll love for years.",
  cover: img(POOL.living[1], 1400),
  body: `Behind every piece is a team that cares deeply.

Our designers translate your vision into buildable beauty. Our master craftsmen bring decades of woodworking experience to every joint and finish. Our consultants guide you from idea to installation, and our delivery teams treat your home with respect.

Together, we're united by one goal: to make furniture you'll love for years — and a buying experience that feels as premium as the products.`
},
{
  slug: "customer-success-stories",
  title: "Customer Success Stories",
  kicker: "In their words",
  excerpt:
  "Real homes, real businesses, real transformations — the people who let us be part of their spaces.",
  cover: img(POOL.living[0], 1400),
  body: `The truest measure of our work is the homes and businesses we've helped transform.

From compact apartments made spacious to startup offices furnished in days, from heirloom dining tables to bespoke wardrobes — our customers' stories are the reason we do what we do.

Explore our case studies to see how we've turned briefs into beautiful, lasting spaces across India.`
}];

export const storyBySlug = (slug) =>
stories.find((s) => s.slug === slug);
