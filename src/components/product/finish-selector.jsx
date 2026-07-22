"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductMedia } from "@/components/product/product-media";

export function FinishSelector({ colors = [] }) {
  const { active, setActive, imageCount, setOverrideSrc } = useProductMedia();
  const [selected, setSelected] = React.useState(0);

  if (!colors.length) return null;

  // Prefer a finish's own photo when the admin has set one; otherwise fall back
  // to mapping the finish to the gallery image at the same index (clamped).
  function choose(i) {
    setSelected(i);
    const img = colors[i]?.image;
    if (img) {
      setOverrideSrc?.(img);
    } else {
      setOverrideSrc?.(null);
      setActive(Math.min(i, Math.max(0, imageCount - 1)));
    }
  }

  // Keep the highlighted swatch in sync when the gallery image changes elsewhere
  // (only when no finish is pinning its own override image).
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
