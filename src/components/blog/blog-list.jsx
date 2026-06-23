"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { cn, readingTime } from "@/lib/utils";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function BlogList() {
  const [active, setActive] = React.useState("All");
  const cats = ["All", ...blogCategories];
  const posts =
  active === "All" ?
  blogPosts :
  blogPosts.filter((p) => p.category === active);

  const [featured, ...rest] = posts;

  return (
    <div>
      {/* Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {cats.map((c) =>
        <button
          key={c}
          onClick={() => setActive(c)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            active === c ?
            "bg-brand text-white shadow-soft" :
            "border border-border bg-surface text-charcoal hover:border-brand hover:text-brand"
          )}>
          
            {c}
          </button>
        )}
      </div>

      {featured &&
      <Link
        href={`/blog/${featured.slug}`}
        className="group mb-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:shadow-elevated lg:grid-cols-2">
        
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <Image
            src={featured.cover}
            alt={featured.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {featured.category}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-warmbrown/80">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted">
              <span>{featured.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(featured.date)}
              </span>
              <span>{readingTime(featured.content)} min read</span>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand transition-all group-hover:gap-3">
              Read article <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      }

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) =>
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-soft">
          
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110" />
            
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold leading-snug text-charcoal group-hover:text-brand">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-warmbrown/80">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {formatDate(post.date)}
                </span>
                <span>·</span>
                <span>{readingTime(post.content)} min</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>);

}
