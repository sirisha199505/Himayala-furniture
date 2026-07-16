"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ArrowRight } from
"lucide-react";
import { DEFAULT_STORE_CONFIG, telLink, whatsappLink } from "@/lib/store-config";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/components/providers/catalog-provider";

const company = [
{ label: "Our Story", href: "/stories" },
{ label: "Case Studies", href: "/case-studies" },
{ label: "Gallery", href: "/gallery" },
{ label: "Blog", href: "/blog" },
{ label: "FAQ", href: "/faq" },
{ label: "Contact", href: "/contact" }];

export function Footer({ config = DEFAULT_STORE_CONFIG }) {
  const pathname = usePathname();
  const { categories } = useCatalog();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-charcoal text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-6 px-5 py-12 text-center sm:px-8 lg:flex-row lg:px-12 lg:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Transform Your Space With Himalayan Furniture Mart
            </h2>
            <p className="mt-2 text-white/60">
              Premium furniture, expert craftsmanship, delivered across India.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="light">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[88rem] grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4 lg:grid-cols-12 lg:px-12">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {config.description}
          </p>
          <div className="mt-5 flex gap-2.5">
            <Social href={config.social.instagram} label="Instagram">
              <Instagram size={18} />
            </Social>
            <Social href={config.social.facebook} label="Facebook">
              <Facebook size={18} />
            </Social>
            <Social href={config.social.youtube} label="YouTube">
              <Youtube size={18} />
            </Social>
            <Social href={whatsappLink(config)} label="WhatsApp">
              <Send size={17} />
            </Social>
          </div>
        </div>

        {/* Shop */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-bronze">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 7).map((c) =>
            <li key={c.slug}>
                <Link
                href={`/products?category=${c.slug}`}
                className="text-sm text-white/65 transition-colors hover:text-white">
                
                  {c.name}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-bronze">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((c) =>
            <li key={c.href}>
                <Link
                href={c.href}
                className="text-sm text-white/65 transition-colors hover:text-white">
                
                  {c.label}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-bronze">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <a
                href={telLink(config)}
                className="flex items-center gap-2.5 transition-colors hover:text-white">

                <Phone size={16} className="text-bronze" /> {config.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 break-all transition-colors hover:text-white">

                <Mail size={16} className="text-bronze" /> {config.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-bronze" />
              {config.address.full}
            </li>
          </ul>
          <form
            className="mt-5"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup">
            
            <label className="text-xs text-white/50">Join our newsletter</label>
            <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none" />
              
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center bg-brand px-4 text-white transition-colors hover:bg-brand-dark">
                
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8 lg:px-12">
          <p>
            © {config.foundingYear}–2026 {config.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/faq" className="hover:text-white">
              Support
            </Link>
            <span>Powdered by Srinishtha Technologies LLP</span>
          </div>
        </div>
      </div>
    </footer>);

}

function Social({
  href,
  label,
  children

}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand hover:bg-brand hover:text-white">
      
      {children}
    </a>);

}
