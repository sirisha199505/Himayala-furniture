"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(

  ({ className, ...props }, ref) =>
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "overflow-hidden rounded-2xl border border-border bg-surface transition-colors data-[state=open]:border-brand/30 data-[state=open]:shadow-soft",
      className
    )}
    {...props} />

);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(

  ({ className, children, ...props }, ref) =>
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-charcoal transition-colors hover:text-brand sm:text-lg",
        className
      )}
      {...props}>
      
      {children}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige text-brand transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:bg-brand group-data-[state=open]:text-white">
        <ChevronDown size={18} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(

  ({ className, children, ...props }, ref) =>
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-warmbrown/85 data-[state=closed]:animate-[accordion-up_0.25s_ease] data-[state=open]:animate-[accordion-down_0.25s_ease]"
    {...props}>
    
    <div className={cn("px-6 pb-6 pt-0 leading-relaxed", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
