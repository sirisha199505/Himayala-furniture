
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
  "Explore completed furniture projects by Himalayan Furniture Mart — homes, offices and bespoke fit-outs across India, with the requirements, challenges, solutions and outcomes.",
  path: "/case-studies"
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Case Studies", url: "/case-studies" }]
        )} />
      
      <PageHeader
        eyebrow="Our Work"
        title="Projects we're proud of"
        description="From villas to startup offices — see how we turn briefs into beautiful, lasting spaces, with measurable outcomes."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Case Studies", href: "/case-studies" }]
        } />
      
      <Container className="py-14">
        <div className="space-y-8">
          {caseStudies.map((cs, i) =>
          <Reveal key={cs.slug} delay={i * 0.05}>
              <Link
              href={`/case-studies/${cs.slug}`}
              className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:shadow-elevated lg:grid-cols-2">
              
                <div
                className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px] ${i % 2 ? "lg:order-2" : ""}`}>
                
                  <Image
                  src={cs.cover}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3">
                    <Badge variant="brand">{cs.category}</Badge>
                    <span className="flex items-center gap-1 text-sm text-muted">
                      <MapPin size={14} /> {cs.location}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                    {cs.title}
                  </h2>
                  <p className="mt-3 text-pretty leading-relaxed text-warmbrown/80">
                    {cs.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    {cs.stats.map((s) =>
                  <div key={s.label}>
                        <div className="font-display text-lg font-bold text-brand">
                          {s.value}
                        </div>
                        <div className="text-[0.7rem] text-muted">{s.label}</div>
                      </div>
                  )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand transition-all group-hover:gap-3">
                    Read case study <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Container>
    </>);

}
