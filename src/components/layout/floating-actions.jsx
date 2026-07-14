"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { DEFAULT_STORE_CONFIG, telLink, whatsappLink } from "@/lib/store-config";

export function FloatingActions({ config = DEFAULT_STORE_CONFIG }) {
  const pathname = usePathname();
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <AnimatePresence>
        {showTop &&
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white shadow-elevated transition-colors hover:bg-warmbrown">
          
            <ArrowUp size={20} />
          </motion.button>
        }
      </AnimatePresence>

      <a
        href={telLink(config)}
        aria-label={`Call ${config.phoneDisplay}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-elevated transition-transform hover:scale-110 sm:h-13 sm:w-13">

        <Phone size={21} />
      </a>

      <a
        href={whatsappLink(config)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-110">
        
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle size={26} />
      </a>
    </div>);

}
