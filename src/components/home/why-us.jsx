import { Gem, Hammer, Ruler, BadgeIndianRupee, Wrench, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { whyPoints, stats } from "@/data/why";

const ICONS = { Gem, Hammer, Ruler, BadgeIndianRupee, Wrench, ShieldCheck, Truck };
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function WhyUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Himalayan Furniture Mart"
          title="Affordable luxury, built to last"
          description="High quality, low cost, no compromise — the promise behind every piece we craft." />
        

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((p) => {
            const Icon = ICONS[p.icon] ?? Sparkles;
            return (
              <StaggerItem key={p.title}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warmbrown/80">
                    {p.description}
                  </p>
                </div>
              </StaggerItem>);

          })}
        </Stagger>

        {/* Stats */}
        <Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border lg:grid-cols-4">
            {stats.map((s) =>
            <div key={s.label} className="bg-charcoal px-6 py-8 text-center">
                <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-white/60">{s.label}</div>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>);

}
