import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  dark = false

}) {
  return (
    <Link
      href="/"
      aria-label="Himalayan Furniture Mart — Home"
      className={cn("group flex flex-col leading-none", className)}>
      
      <span className="font-display text-xl font-bold tracking-tight sm:text-[1.6rem]">
        <span className="text-brand">Himalayan</span>{" "}
        <span className={dark ? "text-white" : "text-charcoal"}>Furniture</span>
      </span>
      <span
        className={cn(
          "mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.42em]",
          dark ? "text-white/60" : "text-warmbrown/70"
        )}>
        
        Mart
      </span>
    </Link>);

}
