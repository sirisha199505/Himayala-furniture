import * as React from "react";
import { cn } from "@/lib/utils";

const styles = {
  brand: "bg-brand text-white",
  gold: "gradient-bronze text-white",
  dark: "bg-charcoal text-white",
  soft: "bg-beige text-warmbrown",
  outline: "border border-charcoal/20 text-charcoal",
  success: "bg-success/10 text-success"
};

export function Badge({
  variant = "soft",
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider",
        styles[variant],
        className
      )}
      {...props} />);

}
