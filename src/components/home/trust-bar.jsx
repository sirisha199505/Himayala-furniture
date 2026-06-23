import { Truck, ShieldCheck, Hammer, Headset, Ruler, Gem } from "lucide-react";

const items = [
{ icon: Truck, label: "Free Pan-India Delivery" },
{ icon: ShieldCheck, label: "Up to 7-Year Warranty" },
{ icon: Hammer, label: "Expert Craftsmanship" },
{ icon: Ruler, label: "Custom Furniture" },
{ icon: Headset, label: "Dedicated Support" },
{ icon: Gem, label: "Premium Materials" }];

export function TrustBar() {
  return (
    <div className="border-y border-border bg-surface py-5">
      <div className="relative flex overflow-hidden mask-fade-r">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {[...items, ...items].map((it, i) =>
          <span
            key={i}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-warmbrown">
            
              <it.icon size={20} className="text-brand" />
              {it.label}
            </span>
          )}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          
          {[...items, ...items].map((it, i) =>
          <span
            key={i}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-warmbrown">
            
              <it.icon size={20} className="text-brand" />
              {it.label}
            </span>
          )}
        </div>
      </div>
    </div>);

}
