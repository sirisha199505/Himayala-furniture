import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { img, POOL } from "@/data/images";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

const ideas = [
{
  title: "Living Room Ideas",
  desc: "Warm, inviting layouts that bring people together.",
  image: img(POOL.living[0], 900),
  href: "/collections/living-room"
},
{
  title: "Bedroom Designs",
  desc: "Serene, clutter-free retreats for better rest.",
  image: img(POOL.beds[1], 900),
  href: "/collections/bedroom"
},
{
  title: "Workspace Inspiration",
  desc: "Productive, ergonomic spaces with boardroom polish.",
  image: img(POOL.office[0], 900),
  href: "/collections/workspace"
},
{
  title: "Dining Space Concepts",
  desc: "Gather-worthy settings crafted in solid wood.",
  image: img(POOL.dining[0], 900),
  href: "/collections/dining"
}];

export function Inspiration() {
  return (
    <section className="bg-charcoal py-20 text-white sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Interior Design Inspiration"
          title="Ideas to spark your space"
          description="Browse curated inspiration for every room and discover how to bring it home."
          dark />
        
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map((idea, i) =>
          <Reveal key={idea.title} delay={i * 0.07}>
              <Link
              href={idea.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
              
                <Image
                src={idea.image}
                alt={idea.title}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="flex items-center justify-between font-display text-xl font-semibold text-white">
                    {idea.title}
                    <ArrowUpRight
                    size={20}
                    className="text-bronze opacity-0 transition-all group-hover:opacity-100" />
                  
                  </h3>
                  <p className="mt-1.5 text-sm text-white/70">{idea.desc}</p>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Container>
    </section>);

}
