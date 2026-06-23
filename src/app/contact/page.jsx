
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
import { SITE, telLink, whatsappLink } from "@/lib/site";
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

const branches = [
{
  city: "Hyderabad (Flagship)",
  address:
  "H, 490/25, opp. Hotel City Diamond, Huda Colony, Asif Nagar, Hyderabad, Telangana 500028",
  phone: SITE.phoneDisplay
},
{
  city: "Bengaluru",
  address: "Experience Centre, Bengaluru, Karnataka",
  phone: SITE.phoneDisplay
},
{
  city: "Chennai",
  address: "Experience Centre, Chennai, Tamil Nadu",
  phone: SITE.phoneDisplay
}];

export default function ContactPage() {
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
                    href={`mailto:${SITE.email}`}
                    className="break-all text-white/85 transition-colors hover:text-brand">

                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-white">Phone</dt>
                <dd>
                  <a
                    href={telLink()}
                    className="text-white/85 transition-colors hover:text-brand">

                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-white">Address</dt>
                <dd className="text-white/85">{SITE.address.full}</dd>
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
                value={SITE.phoneDisplay}
                href={telLink()} />
              
              <ContactCard
                icon={<MessageCircle size={22} />}
                title="WhatsApp"
                value="Chat with us"
                href={whatsappLink()}
                external />
              
              <ContactCard
                icon={<Mail size={22} />}
                title="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`} />
              
              <ContactCard
                icon={<Clock size={22} />}
                title="Hours"
                value={SITE.hours} />
              
            </div>

            {/* Branches */}
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Our Locations
              </h3>
              <ul className="mt-4 space-y-4">
                {branches.map((b) =>
                <li key={b.city} className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold text-charcoal">{b.city}</p>
                      <p className="text-sm text-warmbrown/80">{b.address}</p>
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
                <Social href={SITE.social.instagram} label="Instagram">
                  <Instagram size={20} />
                </Social>
                <Social href={SITE.social.facebook} label="Facebook">
                  <Facebook size={20} />
                </Social>
                <Social href={SITE.social.youtube} label="YouTube">
                  <Youtube size={20} />
                </Social>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
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
