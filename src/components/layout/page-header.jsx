import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((c, i) =>
        <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="opacity-50" />}
            {i === items.length - 1 ?
          <span className="font-medium text-charcoal">{c.name}</span> :

          <Link href={c.href} className="transition-colors hover:text-brand">
                {c.name}
              </Link>
          }
          </li>
        )}
      </ol>
    </nav>);

}

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs

}) {
  return (
    <section className="border-b border-border bg-beige/50">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-5 max-w-3xl">
          {eyebrow &&
          <Reveal>
              <p className="eyebrow mb-3">{eyebrow}</p>
            </Reveal>
          }
          <Reveal delay={0.05}>
            <h1 className="text-balance font-display text-4xl font-bold leading-tight text-charcoal sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {description &&
          <Reveal delay={0.1}>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-warmbrown/80">
                {description}
              </p>
            </Reveal>
          }
        </div>
      </Container>
    </section>);

}
