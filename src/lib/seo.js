
import { SITE } from "./site";
import { img, POOL } from "@/data/images";

export const DEFAULT_OG = img(POOL.hero[0], 1200);

/** Build page metadata with sensible premium defaults + OG/Twitter. */
export function pageMeta({
  title,
  description,
  path = "/",
  image,
  type = "website"

}) {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? DEFAULT_OG;
  const fullTitle =
  path === "/" ? `${SITE.name} — ${SITE.tagline}` : `${title} | ${SITE.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage]
    }
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/og.jpg`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng
    },
    openingHours: "Mo-Su 10:00-20:00",
    sameAs: Object.values(SITE.social),
    slogan: SITE.tagline,
    foundingDate: String(SITE.foundingYear),
    areaServed: "India"
  };
}

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`
    }))
  };
}

export function productLd(p) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.shortDescription,
    image: p.images,
    sku: p.slug,
    brand: { "@type": "Brand", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.reviews
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${p.slug}`,
      priceCurrency: "INR",
      price: p.price || undefined,
      availability: p.inStock ?
      "https://schema.org/InStock" :
      "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE.name }
    }
  };
}

export function faqLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };
}

export function articleLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` }
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`
  };
}
