"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductMedia } from "@/components/product/product-media";

export function FinishSelector({ colors = [] }) {
  const { active, setActive, imageCount } = useProductMedia();
  const [selected, setSelected] = React.useState(0);

  if (!colors.length) return null;

  // Colours aren't mapped 1:1 to images in the catalogue, so map each finish to
  // the gallery image at the same index (clamped) to give visual feedback.
  function choose(i) {
    setSelected(i);
    setActive(Math.min(i, Math.max(0, imageCount - 1)));
  }

  // Keep the highlighted swatch in sync when the gallery image changes elsewhere.
  React.useEffect(() => {
    if (active < colors.length) setSelected(active);
  }, [active, colors.length]);

  return (
    <div className="mt-6">
      <p className="mb-2 text-sm font-semibold text-charcoal">
        Available Finishes:{" "}
        <span className="font-normal text-warmbrown/80">
          {colors[selected]?.name}
        </span>
      </p>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={isSelected}
              title={c.name}
              className={cn(
                "flex items-center gap-2 rounded-full border bg-surface py-1.5 pl-1.5 pr-3 text-sm transition-all",
                isSelected ?
                "border-brand ring-2 ring-brand/30" :
                "border-border hover:border-brand/50"
              )}>

              <span
                className="relative flex h-6 w-6 items-center justify-center rounded-full border border-black/10"
                style={{ backgroundColor: c.hex }}>

                {isSelected &&
                <Check
                  size={14}
                  strokeWidth={3}
                  className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                }
              </span>
              <span className={cn(isSelected && "font-medium text-charcoal")}>
                {c.name}
              </span>
            </button>);

        })}
      </div>
    </div>);

}
