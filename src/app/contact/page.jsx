
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
  address: "Showroom & Workshop, Hyderabad, Telangana 500001",
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
      
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's craft your space"
        description="Have a question or a project in mind? Reach out — our team is ready to help you find or build the perfect furniture."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" }]
        } />
      

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact info */}
          <div className="space-y-4 lg:col-span-5">
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
            src="https://www.google.com/maps?q=Hyderabad,Telangana,India&output=embed"
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
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        {icon}
      </span>
      <span>
        <span className="block text-sm text-muted">{title}</span>
        <span className="block break-all font-semibold text-charcoal">
          {value}
        </span>
      </span>
    </>;

  const cls =
  "group flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-brand/30 hover:shadow-soft";
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
