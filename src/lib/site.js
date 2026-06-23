/**
 * Global site configuration — single source of truth for brand, contact,
 * navigation and SEO defaults. Values sourced from himalayanfurnituremart.in.
 */

export const SITE = {
  name: "Himalayan Furniture Mart",
  shortName: "Himalayan Furniture",
  legalName: "Himalayan Furniture Mart",
  tagline: "Crafted For Beautiful Living",
  description:
  "Himalayan Furniture Mart designs and crafts premium furniture for beautiful living — sofas, beds, dining sets, office furniture, wardrobes and bespoke pieces. Luxury look, everyday comfort, with pan-India delivery and expert installation.",
  url: "https://himalayanfurnituremart.in",
  locale: "en_IN",
  phone: "+918977392288",
  phoneDisplay: "+91 89773 92288",
  whatsapp: "918977392288",
  email: "himalayanfurnituremart@gmail.com",
  foundingYear: 2015,
  promises: ["High Quality", "Low Cost", "No Compromise"],
  address: {
    street: "Showroom & Workshop",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500001",
    country: "IN",
    full: "Hyderabad, Telangana, India"
  },
  geo: { lat: 17.385, lng: 78.4867 },
  hours: "Mon–Sun: 10:00 AM – 8:00 PM",
  social: {
    instagram: "https://instagram.com/himalayanfurnituremart",
    facebook: "https://facebook.com/himalayanfurnituremart",
    youtube: "https://youtube.com/@himalayanfurnituremart",
    pinterest: "https://pinterest.com/himalayanfurnituremart"
  }
};

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message ?? `Hi ${SITE.name}, I'd like to know more about your furniture.`
  );
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export function telLink() {
  return `tel:${SITE.phone}`;
}

export const MAIN_NAV = [
{ label: "Shop", href: "/products", hasMega: true },
{ label: "Collections", href: "/collections" },
{ label: "Gallery", href: "/gallery" },
{ label: "Our Story", href: "/stories" },
{ label: "Case Studies", href: "/case-studies" },
{ label: "Blog", href: "/blog" },
{ label: "FAQ", href: "/faq" },
{ label: "Contact", href: "/contact" }];
