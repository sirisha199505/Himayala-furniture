"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/store/admin-auth";
import { useMounted } from "@/lib/use-mounted";
import { img, POOL } from "@/data/images";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const mounted = useMounted();
  const { user, login } = useAdminAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (mounted && user) router.replace("/admin");
  }, [mounted, user, router]);

  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const res = await login(email, password);
    setSubmitting(false);
    if (res.ok) router.replace("/admin");else
    setError(res.error ?? "Login failed");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Brand panel — full-bleed furniture image with elegant overlay */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex">
        <Image
          src={img(POOL.hero[0], 1600)}
          alt="Himalayan Furniture Mart interior"
          fill
          priority
          sizes="50vw"
          className="object-cover" />

        {/* Legibility + brand gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/90 to-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />

        <div className="relative z-10">
          <Logo dark />
        </div>

        <div className="relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Admin Console
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Manage your store,<br />beautifully.
          </h1>
          <p className="mt-4 max-w-sm text-white/75">
            Products, gallery, content and leads for Himalayan Furniture Mart —
            all in one place.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/85">
            {[
            "Role-based access",
            "Add gallery images by URL",
            "Full content management"].
            map((f) =>
            <li key={f} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur">
                  <ShieldCheck size={15} className="text-bronze" />
                </span>
                {f}
              </li>
            )}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/50">
          © 2026 Himalayan Furniture Mart
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-ivory p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-charcoal">
            Welcome back
          </h2>
          <p className="mt-1 text-warmbrown/70">Sign in to your admin account.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@himalayanfurnituremart.in"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none focus:border-brand" />
                
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-charcoal">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none focus:border-brand" />
                
              </div>
            </div>

            {error &&
            <p className="rounded-lg bg-brand/10 px-3 py-2 text-sm text-brand">
                {error}
              </p>
            }

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : <>Sign In <ArrowRight size={18} /></>}
            </Button>
          </form>

          <Link href="/" className="mt-6 block text-center text-sm text-muted hover:text-brand">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>);

}
