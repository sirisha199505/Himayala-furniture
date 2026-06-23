"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts } from "@/data/products";
import { categories as seedCategories } from "@/data/categories";
import { galleryItems as seedGallery } from "@/data/gallery";
import { faqs as seedFaqs } from "@/data/faqs";
import { blogPosts as seedBlogs } from "@/data/blog";
import { caseStudies as seedCases } from "@/data/caseStudies";
import { stories as seedStories } from "@/data/stories";

const seedLeads = [
{ id: "L-1042", name: "Ananya Reddy", phone: "+91 98xxxx2210", product: "Himalaya 3-Seater Sofa", status: "New", date: "2026-06-20", city: "Hyderabad" },
{ id: "L-1041", name: "Rajesh Kumar", phone: "+91 99xxxx1180", product: "Twin Workstation", status: "Contacted", date: "2026-06-19", city: "Bengaluru" },
{ id: "L-1040", name: "Priya Menon", phone: "+91 90xxxx7745", product: "Vault Sliding Wardrobe", status: "Quoted", date: "2026-06-18", city: "Chennai" },
{ id: "L-1039", name: "Vikram Singh", phone: "+91 97xxxx3321", product: "Kashmir King Bed", status: "Won", date: "2026-06-16", city: "Pune" },
{ id: "L-1038", name: "Sneha Iyer", phone: "+91 96xxxx9982", product: "Aria 4-Seater Dining", status: "New", date: "2026-06-15", city: "Mumbai" }];

const seedUsers = [
{ id: "u-1", name: "Sirisha", email: "admin@himalayanfurnituremart.in", role: "super", status: "Active" },
{ id: "u-2", name: "Content Manager", email: "content@himalayanfurnituremart.in", role: "content", status: "Active" }];

const seedSeo = [
{ id: "home", page: "Home", title: "Himalayan Furniture Mart — Crafted For Beautiful Living", description: "Premium furniture designed to transform every corner of your home.", keywords: "premium furniture, luxury furniture India" },
{ id: "products", page: "Shop", title: "Shop All Furniture", description: "Browse premium furniture — sofas, beds, dining, office and more.", keywords: "buy furniture online, sofas, beds" },
{ id: "gallery", page: "Gallery", title: "Gallery", description: "Real homes and projects furnished by Himalayan Furniture Mart.", keywords: "furniture gallery, interior projects" }];

function withIds(arr) {
  return arr.map((x, i) => ({ ...x, id: x.id ?? x.slug ?? `item-${i}` }));
}

function seed() {
  return {
    products: withIds(seedProducts),
    categories: withIds(seedCategories),
    gallery: withIds(seedGallery),
    faqs: withIds(seedFaqs),
    blogs: withIds(seedBlogs),
    caseStudies: withIds(seedCases),
    stories: withIds(seedStories),
    leads: seedLeads,
    users: seedUsers,
    seo: seedSeo
  };
}

let counter = 0;
function newId() {
  counter += 1;
  return `new-${Date.now().toString(36)}-${counter}`;
}

export const useAdminData = create()(
  persist(
    (set) => ({
      data: seed(),
      add: (entity, record) =>
      set((s) => ({
        data: {
          ...s.data,
          [entity]: [{ ...record, id: record.id ?? newId() }, ...s.data[entity]]
        }
      })),
      update: (entity, id, patch) =>
      set((s) => ({
        data: {
          ...s.data,
          [entity]: s.data[entity].map((r) => r.id === id ? { ...r, ...patch } : r)
        }
      })),
      remove: (entity, id) =>
      set((s) => ({
        data: { ...s.data, [entity]: s.data[entity].filter((r) => r.id !== id) }
      })),
      reset: () => set({ data: seed() })
    }),
    { name: "hfm-admin-data", version: 1 }
  )
);
