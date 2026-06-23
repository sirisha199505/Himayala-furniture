"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAdminAuth, DEMO_ACCOUNTS } from "@/store/admin-auth";
import { useMounted } from "@/lib/use-mounted";
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

  function onSubmit(e) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) router.replace("/admin");else
    setError(res.error ?? "Login failed");
  }

  function quickFill(role) {
    const acc = DEMO_ACCOUNTS.find((a) => a.role === role);
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between bg-charcoal p-12 text-white lg:flex">
        <Logo dark />
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight">
            Admin Console
          </h1>
          <p className="mt-3 max-w-sm text-white/70">
            Manage products, gallery, content and leads for Himalayan Furniture
            Mart — all in one place.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-bronze" /> Role-based access
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-bronze" /> Add gallery images by URL
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-bronze" /> Full content management
            </li>
          </ul>
        </div>
        <p className="text-xs text-white/40">
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

            <Button type="submit" size="lg" className="w-full">
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Demo accounts
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => quickFill("super")}
                className="rounded-lg border border-border px-3 py-2 text-left text-sm hover:border-brand">
                
                <span className="font-medium text-charcoal">Super Admin</span>
                <span className="block text-xs text-muted">admin@himalayanfurnituremart.in · admin123</span>
              </button>
              <button
                onClick={() => quickFill("content")}
                className="rounded-lg border border-border px-3 py-2 text-left text-sm hover:border-brand">
                
                <span className="font-medium text-charcoal">Content Manager</span>
                <span className="block text-xs text-muted">content@himalayanfurnituremart.in · content123</span>
              </button>
            </div>
          </div>

          <Link href="/" className="mt-6 block text-center text-sm text-muted hover:text-brand">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>);

}
