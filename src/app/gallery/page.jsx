
import { galleryItems, galleryCategories } from "@/data/gallery";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gallery",
  description:
  "Explore real homes and projects furnished by Himalayan Furniture Mart — living rooms, bedrooms, dining spaces and offices across India.",
  path: "/gallery"
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" }]
        )} />
      
      <PageHeader
        eyebrow="Customer Gallery"
        title="Spaces we've transformed"
        description="A curated look at real projects across India — from compact apartments to grand villas and modern offices."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Gallery", href: "/gallery" }]
        } />
      
      <Container className="py-14">
        <MasonryGallery
          items={galleryItems}
          showFilter
          categories={galleryCategories} />
        
      </Container>
    </>);

}
