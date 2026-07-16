"use client";

import * as React from "react";
import { Package, Truck, Wrench, ShieldCheck, Ruler, RotateCcw, HelpCircle } from "lucide-react";
import { faqs as STATIC_FAQS } from "@/data/faqs";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent } from
"@/components/ui/accordion";

const ICONS = {
  Products: Package,
  Delivery: Truck,
  Installation: Wrench,
  Warranty: ShieldCheck,
  Customization: Ruler,
  Returns: RotateCcw
};

export function FaqExplorer({ items = STATIC_FAQS }) {
  const faqCategories = React.useMemo(
    () => Array.from(new Set(items.map((f) => f.category))),
    [items]
  );
  const [active, setActive] = React.useState(faqCategories[0] ?? "Products");
  const list = items.filter((f) => f.category === active);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Category rail */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4">Categories</p>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {faqCategories.map((c) => {
              const Icon = ICONS[c] ?? HelpCircle;
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all",
                    isActive ?
                    "border-brand bg-brand text-white shadow-soft" :
                    "border-border bg-surface text-charcoal hover:border-brand/40"
                  )}>
                  
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      isActive ? "bg-white/20" : "bg-brand-50 text-brand"
                    )}>
                    
                    <Icon size={18} />
                  </span>
                  {c}
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      isActive ? "text-white/70" : "text-muted"
                    )}>
                    
                    {items.filter((f) => f.category === c).length}
                  </span>
                </button>);

            })}
          </div>
        </div>
      </aside>

      {/* Questions */}
      <div className="lg:col-span-8">
        <h2 className="mb-5 font-display text-2xl font-semibold text-charcoal">
          {active}
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {list.map((f) =>
          <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>);

}
