import { HeroCarousel } from "@/components/home/hero-carousel";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { WhyUs } from "@/components/home/why-us";
import { PromiseBanner } from "@/components/home/promise-banner";
import { BestSellers } from "@/components/home/best-sellers";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { Inspiration } from "@/components/home/inspiration";
import { Testimonials } from "@/components/home/testimonials";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(faqs.slice(0, 5))} />
      <HeroCarousel />
      <TrustBar />
      <CategoryGrid />
      <FeaturedCollections />
      <WhyUs />
      <PromiseBanner />
      <BestSellers />
      <GalleryPreview />
      <Inspiration />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>);

}
