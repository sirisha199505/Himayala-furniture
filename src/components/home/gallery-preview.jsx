import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { Button } from "@/components/ui/button";

export function GalleryPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Customer Gallery"
          title="Real homes, real transformations"
          description="A glimpse into spaces we've helped craft across India — from cosy apartments to grand villas." />
        
        <div className="mt-12">
          <MasonryGallery items={galleryItems.slice(0, 8)} />
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">
                View Full Gallery <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>);

}
