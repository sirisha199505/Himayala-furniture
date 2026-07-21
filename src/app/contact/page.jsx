
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube } from
"lucide-react";
import { getStoreConfig, telLink, whatsappLink } from "@/lib/store-config";
import { getLocations } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { img, POOL } from "@/data/images";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
  "Get in touch with Himalayan Furniture Mart. Call, WhatsApp, email or visit us. Book a free consultation for premium and custom furniture, delivered across India.",
  path: "/contact"
});

export const revalidate = 30;

export default async function ContactPage() {
  const config = await getStoreConfig();
  const branches = await getLocations();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }]
        )} />
      
      {/* Hero — full-bleed image with contact details overlaid (matches reference) */}
      <section className="relative min-h-[78vh] w-full overflow-hidden bg-charcoal">
        <Image
          src={img("1768393992748-8e58b9ab321d", 2000)}
          alt="Light wood shelving"
          fill
          priority
          sizes="100vw"
          className="object-cover" />

        <div
          className="absolute inset-0"
          style={{
            background:
            "linear-gradient(90deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.15) 100%)"
          }} />

        <Container className="relative z-10 flex min-h-[78vh] flex-col justify-center py-16 sm:py-20">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Contact Us
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
              Feel free to contact us with any questions or concerns. You can use
              the form on our website or email us directly. We appreciate your
              interest and look forward to hearing from you.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-lg font-semibold text-white">Email</dt>
                <dd>
                  <a
                    href={`mailto:${config.email}`}
                    className="break-all text-white/85 transition-colors hover:text-brand">

                    {config.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-white">Phone</dt>
                <dd>
                  <a
                    href={telLink(config)}
                    className="text-white/85 transition-colors hover:text-brand">

                    {config.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-white">Address</dt>
                <dd className="text-white/85">{config.address.full}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>


      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Contact info */}
          <div className="space-y-4 lg:col-span-5">
            <div>
              <p className="eyebrow mb-2">Reach Us</p>
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                Talk to our team
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ContactCard
                icon={<Phone size={22} />}
                title="Call Us"
                value={config.phoneDisplay}
                href={telLink(config)} />

              <ContactCard
                icon={<MessageCircle size={22} />}
                title="WhatsApp"
                value="Chat with us"
                href={whatsappLink(config)}
                external />

              <ContactCard
                icon={<Mail size={22} />}
                title="Email"
                value={config.email}
                href={`mailto:${config.email}`} />

              <ContactCard
                icon={<Clock size={22} />}
                title="Hours"
                value={config.hours} />
              
            </div>

            {/* Branches */}
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Our Locations
              </h3>
              <ul className="mt-4 space-y-4">
                {branches.map((b, i) =>
                <li key={b.id ?? b.name ?? b.city ?? i} className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold text-charcoal">{b.name ?? b.city}</p>
                      <p className="text-sm text-warmbrown/80">{b.address}</p>
                      {(b.phone || b.hours) &&
                    <p className="mt-0.5 text-xs text-muted">
                          {[b.phone, b.hours].filter(Boolean).join(" · ")}
                        </p>
                    }
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Social */}
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Follow Us
              </h3>
              <div className="mt-4 flex gap-3">
                <Social href={config.social.instagram} label="Instagram">
                  <Instagram size={20} />
                </Social>
                <Social href={config.social.facebook} label="Facebook">
                  <Facebook size={20} />
                </Social>
                <Social href={config.social.youtube} label="YouTube">
                  <Youtube size={20} />
                </Social>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm whatsappHref={whatsappLink(config)} />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-border">
          <iframe
            title="Himalayan Furniture Mart location"
            src="https://www.google.com/maps?q=Huda+Colony,Asif+Nagar,Hyderabad,Telangana+500028&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full" />
          
        </div>
      </Container>
    </>);

}

function ContactCard({
  icon,
  title,
  value,
  href,
  external

}) {
  const inner =
  <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase tracking-wide text-muted">
          {title}
        </span>
        <span className="block break-words font-semibold text-charcoal">
          {value}
        </span>
      </span>
    </>;

  const cls =
  "group flex items-center gap-3.5 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft";
  if (href)
  return (
    <a
      href={href}
      className={cls}
      {...external ? { target: "_blank", rel: "noopener noreferrer" } : {}}>
      
        {inner}
      </a>);

  return <div className={cls}>{inner}</div>;
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-charcoal transition-all hover:border-brand hover:bg-brand hover:text-white">
      
      {children}
    </a>);

}
