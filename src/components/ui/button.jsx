import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
        "bg-brand text-white shadow-soft hover:bg-brand-dark hover:shadow-elevated",
        secondary:
        "bg-charcoal text-white hover:bg-warmbrown shadow-soft",
        outline:
        "border border-charcoal/20 bg-transparent text-charcoal hover:border-brand hover:text-brand",
        ghost: "bg-transparent text-charcoal hover:bg-beige",
        gold: "gradient-bronze text-white shadow-soft hover:shadow-elevated",
        light:
        "bg-white text-charcoal shadow-soft hover:bg-ivory border border-border",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5b] shadow-soft"
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-6 text-sm",
        lg: "h-14 rounded-full px-8 text-base",
        icon: "h-11 w-11 rounded-full"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props} />);

  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
