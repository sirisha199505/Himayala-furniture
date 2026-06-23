import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  dark = false

}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}>
      
      {eyebrow &&
      <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
        </Reveal>
      }
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]",
            dark ? "text-white" : "text-charcoal"
          )}>
          
          {title}
        </h2>
      </Reveal>
      {description &&
      <Reveal delay={0.1}>
          <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-warmbrown/80"
          )}>
          
            {description}
          </p>
        </Reveal>
      }
    </div>);

}
