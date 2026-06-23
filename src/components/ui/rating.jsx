import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviews,
  size = 14,
  className

}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) =>
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(
            i < Math.round(value) ?
            "fill-bronze text-bronze" :
            "fill-none text-charcoal/25"
          )} />

        )}
      </div>
      <span className="text-sm font-medium text-warmbrown">
        {value.toFixed(1)}
        {reviews !== undefined &&
        <span className="text-muted"> ({reviews})</span>
        }
      </span>
    </div>);

}
