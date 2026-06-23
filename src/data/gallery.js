
import { img, POOL, REAL } from "./images";

const spans = ["tall", "normal", "wide", "normal", "normal", "tall", "normal", "wide"];

const titles = [
"Warm Living Room Retreat",
"Master Bedroom Suite",
"Family Dining Space",
"Executive Home Office",
"Reading Nook",
"Modern TV Wall",
"Walk-in Wardrobe",
"Apartment Living",
"Boutique Hotel Lobby",
"Luxury Bedroom Makeover",
"Compact Studio Setup",
"Open-plan Kitchen Dining"];

const cats = [
"Living Room", "Bedroom", "Dining", "Office", "Living Room", "Living Room",
"Bedroom", "Living Room", "Commercial", "Bedroom", "Living Room", "Dining"];

const locations = [
"Hyderabad", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Mumbai",
"Hyderabad", "Vizag", "Hyderabad", "Bengaluru", "Hyderabad", "Chennai"];

export const galleryItems = POOL.gallery.map((id, i) => ({
  id: `g-${i + 1}`,
  title: titles[i] ?? `Project ${i + 1}`,
  category: cats[i] ?? "Living Room",
  image: img(id, 900),
  span: spans[i % spans.length],
  location: locations[i] ?? "India"
}));

// Mix a few real product photos into the gallery
galleryItems.splice(2, 0, {
  id: "g-real-1",
  title: "Bespoke Wardrobe Build",
  category: "Bedroom",
  image: REAL.p2,
  span: "tall",
  location: "Hyderabad"
});
galleryItems.splice(6, 0, {
  id: "g-real-2",
  title: "Custom Living Project",
  category: "Living Room",
  image: REAL.p1,
  span: "normal",
  location: "Hyderabad"
});

export const galleryCategories = [
"All",
...Array.from(new Set(galleryItems.map((g) => g.category)))];
