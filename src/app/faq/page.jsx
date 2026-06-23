
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { faqs } from "@/data/faqs";
import { SITE, telLink, whatsappLink } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FaqExplorer } from "@/components/faq/faq-explorer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqLd, breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
  "Answers about Himalayan Furniture Mart products, delivery, installation, warranty, customization and returns. Find everything you need before you buy.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
        faqLd(faqs),
        breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" }]
        )]
        } />
      
      <PageHeader
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        description="Everything you need to know about our furniture, delivery, installation, warranty and more — answered clearly."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "FAQ", href: "/faq" }]
        } />
      
      <Container className="py-14">
        <FaqExplorer />

        {/* Still need help */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-charcoal px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Our team is here to help you choose the perfect furniture for your
            space. Reach out anytime.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" variant="light">
              <a href={telLink()}>
                <Phone size={18} /> {SITE.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:border-white">
              <Link href="/contact">Contact Page</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>);

}
