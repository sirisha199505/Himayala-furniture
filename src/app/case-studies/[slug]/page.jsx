
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Target, AlertTriangle, Lightbulb, Trophy, Check, ArrowRight } from "lucide-react";
import { caseStudies, caseStudyBySlug } from "@/data/caseStudies";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params

}) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  return pageMeta({
    title: cs.title,
    description: cs.summary,
    path: `/case-studies/${cs.slug}`,
    image: cs.cover,
    type: "article"
  });
}

export default async function CaseStudyPage({
  params

}) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Case Studies", url: "/case-studies" },
        { name: cs.title, url: `/case-studies/${cs.slug}` }]
        )} />
      

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={cs.cover}
          alt={cs.title}
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 hero-overlay" />
        <Container className="relative flex h-full flex-col justify-end pb-12">
          <Breadcrumbs
            items={[
            { name: "Home", href: "/" },
            { name: "Case Studies", href: "/case-studies" },
            { name: cs.title, href: `/case-studies/${cs.slug}` }]
            } />
          
          <div className="mt-5 flex items-center gap-3">
            <Badge variant="brand">{cs.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-white/80">
              <MapPin size={15} /> {cs.location}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {cs.title}
          </h1>
          <p className="mt-2 text-lg text-white/80">{cs.client}</p>
        </Container>
      </section>

      {/* Stats */}
      <div className="border-b border-border bg-surface">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {cs.stats.map((s) =>
            <div key={s.label} className="px-4 py-7 text-center">
                <div className="font-display text-3xl font-bold text-brand">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <article className="space-y-10 lg:col-span-2">
            <Block icon={<Target size={22} />} title="Client Requirement">
              <p>{cs.requirement}</p>
            </Block>
            <Block icon={<AlertTriangle size={22} />} title="Challenges">
              <ul className="space-y-2">
                {cs.challenges.map((c) =>
                <li key={c} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {c}
                  </li>
                )}
              </ul>
            </Block>
            <Block icon={<Lightbulb size={22} />} title="Our Solution">
              <p>{cs.solution}</p>
            </Block>
            <Block icon={<Trophy size={22} />} title="Outcome">
              <p>{cs.outcome}</p>
            </Block>

            {/* Gallery */}
            <div>
              <h2 className="mb-5 font-display text-2xl font-semibold text-charcoal">
                Project Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {cs.gallery.map((src, i) =>
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                  
                    <Image
                    src={src}
                    alt={`${cs.title} — view ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105" />
                  
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  Furniture Used
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {cs.furnitureUsed.map((f) =>
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-warmbrown">
                    
                      <Check size={16} className="mt-0.5 shrink-0 text-success" />
                      {f}
                    </li>
                  )}
                </ul>
              </div>
              <div className="rounded-3xl bg-charcoal p-6 text-white">
                <h3 className="font-display text-lg font-semibold">
                  Start your project
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Let us craft a space you'll love. Book a free consultation
                  today.
                </p>
                <EnquiryDialog
                  intent="Consultation"
                  trigger={
                  <Button className="mt-4 w-full">Book Consultation</Button>
                  } />
                
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">
              View all case studies <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </Container>
    </>);

}

function Block({
  icon,
  title,
  children

}) {
  return (
    <section>
      <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-charcoal">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-4 leading-relaxed text-warmbrown/85">{children}</div>
    </section>);

}
