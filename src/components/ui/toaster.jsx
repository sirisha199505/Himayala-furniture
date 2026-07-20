"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, CircleCheck, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/store/toast";
import { useMounted } from "@/lib/use-mounted";

const ICONS = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert
};

export function Toaster() {
  const mounted = useMounted();
  const { toasts, dismiss } = useToast();

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.variant] ?? Info;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ y: -24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.96 }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.25 }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-elevated backdrop-blur-xl">

              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  t.variant === "success" ?
                  "text-success" :
                  t.variant === "warning" ?
                  "text-brand" :
                  "text-charcoal"
                )}>

                <Icon size={18} />
              </span>
              <p className="flex-1 text-sm font-medium leading-snug text-charcoal">
                {t.message}
              </p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="shrink-0 text-muted transition-colors hover:text-charcoal">

                <X size={16} />
              </button>
            </motion.div>);

        })}
      </AnimatePresence>
    </div>);

}
