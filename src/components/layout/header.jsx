"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Heart,
  GitCompareArrows,
  ShoppingBag,
  Phone,
  ChevronRight,
  ChevronDown } from
"lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/site";
import { DEFAULT_STORE_CONFIG, telLink, whatsappLink } from "@/lib/store-config";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/product/enquiry-dialog";
import { useWishlist, useCompare } from "@/store/wishlist";
import { useCart, cartCount } from "@/store/cart";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useMounted } from "@/lib/use-mounted";

export function Header({ config = DEFAULT_STORE_CONFIG }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const pathname = usePathname();
  const mounted = useMounted();
  const wishCount = useWishlist((s) => s.items.length);
  const compareCount = useCompare((s) => s.items.length);
  const cartQty = useCart(cartCount);
  const { categories } = useCatalog();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Admin pages use their own chrome
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-dark text-white">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 py-2 text-xs sm:px-8 lg:px-12">
          <p className="font-medium tracking-wide">
            ✦ High Quality · Low Cost · No Compromise — Pan-India Delivery
          </p>
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href={telLink(config)}
              className="flex items-center gap-1.5 transition-colors hover:text-charcoal">

              <Phone size={13} /> {config.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="transition-colors hover:text-charcoal">
              
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-surface transition-shadow duration-300",
          scrolled ? "border-border/80 shadow-soft" : "border-transparent"
        )}
        onMouseLeave={() => setMegaOpen(false)}>
        
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {MAIN_NAV.map((item) =>
            item.hasMega ?
            <div key={item.href} className="flex items-center">
                  <Link
                href={item.href}
                prefetch
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  pathname?.startsWith("/products") ?
                  "text-brand" :
                  "text-charcoal hover:text-brand"
                )}>
                
                    {item.label}
                  </Link>
                  <button
                onClick={() => setMegaOpen((v) => !v)}
                aria-label="Toggle categories menu"
                aria-expanded={megaOpen}
                className={cn(
                  "flex h-8 w-7 items-center justify-center rounded-full transition-colors hover:text-brand",
                  megaOpen ? "text-brand" : "text-charcoal"
                )}>
                
                    <ChevronDown
                  size={15}
                  className={cn("transition-transform", megaOpen && "rotate-180")} />
                
                  </button>
                </div> :

            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ?
                "text-brand" :
                "text-charcoal hover:text-brand"
              )}>
              
                  {item.label}
                </Link>

            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <IconLink href="/wishlist" label="Wishlist" count={mounted ? wishCount : 0}>
              <Heart size={19} />
            </IconLink>
            <IconLink href="/compare" label="Compare" count={mounted ? compareCount : 0}>
              <GitCompareArrows size={19} />
            </IconLink>
            <IconLink href="/cart" label="Cart" count={mounted ? cartQty : 0}>
              <ShoppingBag size={19} />
            </IconLink>
            <EnquiryDialog
              trigger={
              <Button size="sm" className="ml-1 hidden sm:inline-flex">
                  Enquire
                </Button>
              } />

            <button
              className="ml-0.5 flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-beige lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu">
              
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mega menu (opens on click of the caret) */}
        <AnimatePresence>
          {megaOpen &&
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full hidden border-t border-border bg-surface shadow-elevated lg:block">
            
              <div className="mx-auto grid max-w-[88rem] grid-cols-12 gap-8 px-12 py-7">
                <div className="col-span-7">
                  <p className="eyebrow mb-3">Shop by Category</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                    {categories.map((c) =>
                  <Link
                    key={c.slug}
                    href={`/products?category=${c.slug}`}
                    className="group flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-beige">
                    
                        <span>
                          <span className="block text-sm font-semibold text-charcoal group-hover:text-brand">
                            {c.name}
                          </span>
                          <span className="block text-xs text-muted">{c.tagline}</span>
                        </span>
                        <ChevronRight
                      size={16}
                      className="text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    
                      </Link>
                  )}
                  </div>
                  <Link
                  href="/products"
                  onClick={(e) => {
                    setMegaOpen(false);
                    // Already on the shop page: force a clean refresh so every
                    // filter and dropdown resets back to the full catalogue.
                    if (pathname === "/products") {
                      e.preventDefault();
                      window.location.href = "/products";
                    }
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">

                    View all products <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="col-span-5">
                  <p className="eyebrow mb-3">Featured Collections</p>
                  <div className="grid grid-cols-2 gap-3">
                    {collections.map((col) =>
                  <Link
                    key={col.slug}
                    href={`/collections/${col.slug}`}
                    className="group relative overflow-hidden rounded-2xl">
                    
                        <div className="relative aspect-[4/3]">
                          <Image
                        src={col.image}
                        alt={col.name}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                          <div className="absolute inset-0 gradient-overlay" />
                          <span className="absolute bottom-2 left-3 text-sm font-semibold text-white">
                            {col.name.replace(" Collection", "")}
                          </span>
                        </div>
                      </Link>
                  )}
                  </div>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} config={config} />
    </>);

}

function IconLink({
  href,
  label,
  count,
  children

}) {
  return (
    <Link
      href={href}
      aria-label={`${label}${count ? ` (${count})` : ""}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-beige hover:text-brand">
      
      {children}
      {count > 0 &&
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[0.6rem] font-bold text-white">
          {count}
        </span>
      }
    </Link>);

}

function MobileDrawer({ open, onClose, config = DEFAULT_STORE_CONFIG }) {
  const [shopOpen, setShopOpen] = React.useState(false);
  const { categories } = useCatalog();
  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm lg:hidden" />
        
          <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
          className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-surface shadow-elevated lg:hidden">
          
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo />
              <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-beige">
              
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <div className="flex items-center">
                <Link
                href="/products"
                onClick={onClose}
                className="flex-1 rounded-xl px-4 py-3 text-base font-semibold text-charcoal hover:bg-beige hover:text-brand">
                
                  Shop
                </Link>
                <button
                onClick={() => setShopOpen((v) => !v)}
                aria-label="Toggle categories"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-beige">
                
                  <ChevronDown
                  size={18}
                  className={cn("transition-transform", shopOpen && "rotate-180")} />
                
                </button>
              </div>
              <AnimatePresence>
                {shopOpen &&
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                
                    <div className="space-y-0.5 py-1 pl-4">
                      {categories.map((c) =>
                  <Link
                    key={c.slug}
                    href={`/products?category=${c.slug}`}
                    onClick={onClose}
                    className="block rounded-lg px-4 py-2 text-sm text-warmbrown hover:bg-beige hover:text-brand">
                    
                          {c.name}
                        </Link>
                  )}
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
              {MAIN_NAV.filter((i) => !i.hasMega).map((item) =>
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block rounded-xl px-4 py-3 text-base font-semibold text-charcoal hover:bg-beige hover:text-brand">
              
                  {item.label}
                </Link>
            )}
            </nav>
            <div className="space-y-2 border-t border-border p-4">
              <Button asChild variant="whatsapp" className="w-full">
                <a href={whatsappLink(config)} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={telLink(config)}>Call {config.phoneDisplay}</a>
              </Button>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}
