import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { img, POOL } from "@/data/images";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-charcoal px-6 py-16 text-center sm:px-12 sm:py-24">
            <Image
              src={img(POOL.hero[2], 1600)}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow mb-4 text-bronze">Let's Begin</p>
              <h2 className="text-balance font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                Transform Your Space With Himalayan Furniture Mart
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-white/75 sm:text-lg">
                Book a free consultation with our design team, or tell us what
                you're dreaming of. Premium furniture, crafted and delivered
                across India.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Contact Us <ArrowRight size={18} />
                  </Link>
                </Button>
                <EnquiryDialog
                  intent="Consultation"
                  trigger={
                  <Button size="lg" variant="light">
                      Book Consultation
                    </Button>
                  } />
                
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>);

}
