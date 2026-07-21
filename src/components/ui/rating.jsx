import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviews,
  size = 14,
  className

}) {
  // Tolerate string values (e.g. a BigDecimal rating serialized from the DB).
  const rating = Number(value) || 0;
  const reviewCount = Number(reviews) || 0;

  // No ratings yet — show a clear message instead of a misleading "0.0".
  if (rating <= 0 && reviewCount <= 0) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) =>
          <Star
            key={i}
            width={size}
            height={size}
            className="fill-none text-charcoal/20" />

          )}
        </div>
        <span className="text-sm text-muted">No ratings yet</span>
      </div>);

  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) =>
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(
            i < Math.round(rating) ?
            "fill-bronze text-bronze" :
            "fill-none text-charcoal/25"
          )} />

        )}
      </div>
      <span className="text-sm font-medium text-warmbrown">
        {rating.toFixed(1)}
        {reviews !== undefined &&
        <span className="text-muted"> ({reviewCount})</span>
        }
      </span>
    </div>);

}
