/**
 * Gallery items backed by local project photos in /public/images/gallery.
 * `image` paths are served from the public folder root (drop the "public").
 */

export const galleryItems = [
  {
    id: "g-1",
    title: "Warm Living Room Retreat",
    category: "Living Room",
    image: "/images/gallery/sofa.jpg",
    span: "wide",
    location: "Hyderabad"
  },
  {
    id: "g-2",
    title: "Modern TV Wall Unit",
    category: "Living Room",
    image: "/images/gallery/tv-unit.jpg",
    span: "tall",
    location: "Bengaluru"
  },
  {
    id: "g-3",
    title: "Living Room Storage",
    category: "Living Room",
    image: "/images/gallery/storage.jpg",
    span: "normal",
    location: "Chennai"
  },
  {
    id: "g-4",
    title: "Designer Bedroom Suite",
    category: "Bedroom",
    image: "/images/gallery/designer-bed.jpg",
    span: "tall",
    location: "Hyderabad"
  },
  {
    id: "g-5",
    title: "Walk-in Wardrobe",
    category: "Bedroom",
    image: "/images/gallery/wardrobe.jpg",
    span: "normal",
    location: "Pune"
  },
  {
    id: "g-6",
    title: "Family Dining Space",
    category: "Dining",
    image: "/images/gallery/dining.jpg",
    span: "wide",
    location: "Mumbai"
  },
  {
    id: "g-7",
    title: "Elegant Dining Set",
    category: "Dining",
    image: "/images/gallery/dining-set.jpg",
    span: "normal",
    location: "Hyderabad"
  },
  {
    id: "g-8",
    title: "Open-plan Kitchen",
    category: "Dining",
    image: "/images/gallery/kitchen.jpg",
    span: "normal",
    location: "Vizag"
  },
  {
    id: "g-9",
    title: "Executive Home Office",
    category: "Office",
    image: "/images/gallery/home-office.jpg",
    span: "tall",
    location: "Hyderabad"
  },
  {
    id: "g-10",
    title: "Office Workstations",
    category: "Office",
    image: "/images/gallery/workstation.jpg",
    span: "wide",
    location: "Bengaluru"
  },
  {
    id: "g-11",
    title: "Conference Room",
    category: "Office",
    image: "/images/gallery/conference.jpg",
    span: "normal",
    location: "Chennai"
  },
  {
    id: "g-12",
    title: "Boutique Hotel Interior",
    category: "Commercial",
    image: "/images/gallery/hotel.jpg",
    span: "tall",
    location: "Hyderabad"
  },
  {
    id: "g-13",
    title: "Reception Lounge",
    category: "Commercial",
    image: "/images/gallery/reception.jpg",
    span: "normal",
    location: "Pune"
  },
  {
    id: "g-14",
    title: "Cafe Seating",
    category: "Commercial",
    image: "/images/gallery/cafe.jpg",
    span: "wide",
    location: "Mumbai"
  },
  {
    id: "g-15",
    title: "Corporate Cafeteria",
    category: "Commercial",
    image: "/images/gallery/cafeteria.jpg",
    span: "normal",
    location: "Hyderabad"
  },
  {
    id: "g-16",
    title: "Imported Furniture Showcase",
    category: "Living Room",
    image: "/images/gallery/imported.jpg",
    span: "tall",
    location: "Hyderabad"
  }
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((g) => g.category)))
];
