
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Wrench,
  Ruler,
  Check,
  MessageCircle,
  FileText } from
"lucide-react";
import { getProduct, getProducts, getCategories } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductActions } from "@/components/product/product-actions";
import { ProductSlider } from "@/components/product/product-slider";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { BuyActions } from "@/components/product/buy-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd, breadcrumbLd, pageMeta } from "@/lib/seo";

// Render product pages on demand (ISR) rather than all at build time — the
// catalog is DB-driven and can be large, and building every page against the
// API is slow/fragile. Pages are generated on first request and cached, then
// revalidated. generateStaticParams intentionally returns [] (pre-render none).
export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params

}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return pageMeta({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.images[0]
  });
}

export default async function ProductPage({
  params

}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === product.category);
  const all = await getProducts();
  const related = all.
  filter((p) => p.category === product.category && p.slug !== product.slug).
  slice(0, 8);
  const filler = all.filter((p) => p.slug !== product.slug).slice(0, 8);
  const relatedList = (related.length >= 4 ? related : filler).slice(0, 8);

  const discount =
  product.mrp && product.mrp > product.price ?
  Math.round((product.mrp - product.price) / product.mrp * 100) :
  0;

  return (
    <>
      <JsonLd
        data={[
        productLd(product),
        breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Shop", url: "/products" },
        { name: category?.name ?? "", url: `/products?category=${product.category}` },
        { name: product.name, url: `/products/${product.slug}` }]
        )]
        } />
      

      <Container className="py-6">
        <Breadcrumbs
          items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/products" },
          {
            name: category?.name ?? "Category",
            href: `/products?category=${product.category}`
          },
          { name: product.name, href: `/products/${product.slug}` }]
          } />
        
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {product.badges?.map((b) =>
              <Badge key={b} variant={b === "New" ? "dark" : "brand"}>
                  {b}
                </Badge>
              )}
              {category &&
              <Link href={`/products?category=${product.category}`}>
                  <Badge variant="soft">{category.name}</Badge>
                </Link>
              }
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3">
              <Rating value={product.rating} reviews={product.reviews} size={16} />
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              {product.price > 0 ?
              <>
                  <span className="font-display text-3xl font-bold text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 &&
                <>
                      <span className="pb-1 text-lg text-muted line-through">
                        {formatPrice(product.mrp)}
                      </span>
                      <Badge variant="gold" className="mb-1.5">
                        Save {discount}%
                      </Badge>
                    </>
                }
                </> :

              <span className="font-display text-3xl font-bold text-brand">
                  Price on Request
                </span>
              }
            </div>
            <p className="mt-1 text-sm text-muted">
              Inclusive of all taxes · Free installation
            </p>

            <p className="mt-5 text-pretty leading-relaxed text-warmbrown/85">
              {product.description}
            </p>

            {/* Colours */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-charcoal">
                Available Finishes
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) =>
                <span
                  key={c.name}
                  title={c.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3 text-sm">
                  
                    <span
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }} />
                  
                    {c.name}
                  </span>
                )}
              </div>
            </div>

            {/* Quick specs */}
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <QuickSpec
                icon={<Ruler size={18} />}
                label="Dimensions"
                value={
                product.dimensions.width ?
                `${product.dimensions.width}×${product.dimensions.depth}×${product.dimensions.height} cm` :
                "Made to order"
                } />
              
              <QuickSpec
                icon={<ShieldCheck size={18} />}
                label="Warranty"
                value={product.warranty} />
              
            </dl>

            {/* CTAs */}
            <div className="mt-7 space-y-3">
              <BuyActions
                slug={product.slug}
                price={product.price}
                inStock={product.inStock !== false} />

              <div className="flex flex-col gap-3 sm:flex-row">
                <EnquiryDialog
                  productName={product.name}
                  trigger={
                  <Button size="lg" variant="outline" className="flex-1">
                      Enquire Now
                    </Button>
                  } />
                
                <EnquiryDialog
                  productName={product.name}
                  intent="Quote Request"
                  trigger={
                  <Button size="lg" variant="secondary" className="flex-1">
                      <FileText size={18} /> Request Quote
                    </Button>
                  } />
                
              </div>
              <Button asChild size="lg" variant="whatsapp" className="w-full">
                <a
                  href={whatsappLink(
                    `Hi, I'm interested in the ${product.name}. Please share details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </Button>
              <ProductActions slug={product.slug} />
            </div>

            {/* Trust row */}
            <div className="mt-7 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface p-4 text-center">
              <Trust icon={<Truck size={20} />} label="Free Delivery" />
              <Trust icon={<Wrench size={20} />} label="Expert Install" />
              <Trust icon={<ShieldCheck size={20} />} label="Warranty" />
            </div>
          </div>
        </div>

        {/* Detail sections */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Specifications
            </h2>
            <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-surface">
              {product.specs.map((s) =>
              <div
                key={s.label}
                className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="text-right font-medium text-charcoal">
                    {s.value}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                <dt className="text-muted">Materials</dt>
                <dd className="text-right font-medium text-charcoal">
                  {product.materials.join(", ")}
                </dd>
              </div>
              {product.weight &&
              <div className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                  <dt className="text-muted">Weight</dt>
                  <dd className="text-right font-medium text-charcoal">
                    {product.weight} kg
                  </dd>
                </div>
              }
            </dl>
          </div>

          <div className="space-y-4">
            <InfoCard
              icon={<Truck size={20} />}
              title="Delivery Information"
              points={[
              "Free pan-India delivery on most items",
              "Dispatched in 5–10 business days",
              "Live tracking & scheduled slot"]
              } />
            
            <InfoCard
              icon={<Wrench size={20} />}
              title="Installation"
              points={[
              "Expert assembly included",
              "Levelled & positioned for you",
              "All packaging removed"]
              } />
            
            <InfoCard
              icon={<ShieldCheck size={20} />}
              title="Warranty"
              points={[
              product.warranty,
              "Covers manufacturing defects",
              "Responsive after-sales support"]
              } />
            
          </div>
        </div>
      </Container>

      {/* Related */}
      <section className="bg-beige/60 py-16">
        <Container>
          <SectionHeading
            eyebrow="You may also like"
            title="Related Products"
            align="left"
            className="mb-12" />
          
          <ProductSlider products={relatedList} />
        </Container>
      </section>
    </>);

}

function QuickSpec({
  icon,
  label,
  value

}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand">
        {icon}
      </span>
      <span className="text-sm leading-tight">
        <span className="block text-muted">{label}</span>
        <span className="block font-semibold text-charcoal">{value}</span>
      </span>
    </div>);

}

function Trust({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-xs font-medium text-warmbrown">
      <span className="text-brand">{icon}</span>
      {label}
    </div>);

}

function InfoCard({
  icon,
  title,
  points

}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
        <span className="text-brand">{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {points.map((p) =>
        <li key={p} className="flex items-start gap-2 text-sm text-warmbrown/85">
            <Check size={16} className="mt-0.5 shrink-0 text-success" />
            {p}
          </li>
        )}
      </ul>
    </div>);

}
