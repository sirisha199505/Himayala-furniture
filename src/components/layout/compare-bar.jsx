"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, GitCompareArrows } from "lucide-react";
import { useCompare } from "@/store/wishlist";
import { useMounted } from "@/lib/use-mounted";
import { useCatalog } from "@/components/providers/catalog-provider";
import { Button } from "@/components/ui/button";

export function CompareBar() {
  const mounted = useMounted();
  const pathname = usePathname();
  const { items, toggle, clear } = useCompare();
  const { productBySlug } = useCatalog();

  if (!mounted || pathname?.startsWith("/admin")) return null;
  const products = items.map(productBySlug).filter(Boolean);

  return (
    <AnimatePresence>
      {products.length > 0 &&
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 shadow-elevated backdrop-blur-xl">
        
          <div className="mx-auto flex max-w-[88rem] items-center gap-4 px-5 py-3 sm:px-8 lg:px-12">
            <div className="hidden items-center gap-2 text-sm font-semibold text-charcoal sm:flex">
              <GitCompareArrows size={18} className="text-brand" />
              Compare ({products.length})
            </div>
            <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
              {products.map(
              (p) =>
              p &&
              <div
                key={p.slug}
                className="group relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
                
                      <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="56px"
                  className="object-cover" />
                
                      <button
                  onClick={() => toggle(p.slug)}
                  aria-label={`Remove ${p.name}`}
                  className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-bl-lg bg-charcoal/80 text-white">
                  
                        <X size={12} />
                      </button>
                    </div>

            )}
            </div>
            <button
            onClick={clear}
            className="hidden text-sm text-muted hover:text-brand sm:block">
            
              Clear
            </button>
            <Button asChild size="sm">
              <Link href="/compare">Compare</Link>
            </Button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
