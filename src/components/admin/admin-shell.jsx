"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Sofa, Tag, Images, HelpCircle, Newspaper, Briefcase,
  BookOpen, Search, Users, Settings, LogOut, Menu, X, Inbox, ShoppingCart,
  UserRound, BarChart3, Boxes, ExternalLink, ShieldAlert, MapPin, Layers } from
"lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth, canAccess, ROLE_LABELS } from "@/store/admin-auth";
import { useMounted } from "@/lib/use-mounted";
import { Logo } from "@/components/layout/logo";

const NAV = [
{ module: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
{ module: "products", label: "Products", href: "/admin/products", icon: Sofa },
{ module: "categories", label: "Categories", href: "/admin/categories", icon: Tag },
{ module: "collections", label: "Collections", href: "/admin/collections", icon: Layers },
{ module: "gallery", label: "Gallery", href: "/admin/gallery", icon: Images },
{ module: "faqs", label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
{ module: "blogs", label: "Blogs", href: "/admin/blogs", icon: Newspaper },
{ module: "case-studies", label: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
{ module: "stories", label: "Stories", href: "/admin/stories", icon: BookOpen },
{ module: "locations", label: "Locations", href: "/admin/locations", icon: MapPin },
{ module: "seo", label: "SEO", href: "/admin/seo", icon: Search },
{ module: "leads", label: "Leads", href: "/admin/leads", icon: Inbox },
{ module: "orders", label: "Orders", href: "/admin/orders", icon: ShoppingCart },
{ module: "customers", label: "Customers", href: "/admin/customers", icon: UserRound },
{ module: "analytics", label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
{ module: "inventory", label: "Inventory", href: "/admin/inventory", icon: Boxes },
{ module: "users", label: "User Management", href: "/admin/users", icon: Users },
{ module: "settings", label: "Settings", href: "/admin/settings", icon: Settings }];

const GROUPS = [
{ title: "Content", modules: ["dashboard", "products", "categories", "collections", "gallery", "faqs", "blogs", "case-studies", "stories", "locations", "seo"] },
{ title: "Commerce", modules: ["leads", "orders", "customers", "analytics", "inventory"] },
{ title: "Admin", modules: ["users", "settings"] }];

export function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const { user, logout } = useAdminAuth();
  const [open, setOpen] = React.useState(false);

  const isLogin = pathname === "/admin/login";

  React.useEffect(() => {
    if (mounted && !user && !isLogin) router.replace("/admin/login");
  }, [mounted, user, isLogin, router]);

  React.useEffect(() => setOpen(false), [pathname]);

  if (isLogin) return <>{children}</>;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-muted">
        Loading admin…
      </div>);

  }

  if (!user) return null;

  // Current page module access guard
  const current = NAV.find((n) => n.href === pathname) ?? NAV.find((n) => pathname.startsWith(n.href) && n.href !== "/admin");
  const denied = current && !canAccess(user.role, current.module);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Sidebar */}
      <Sidebar role={user.role} pathname={pathname} open={open} onClose={() => setOpen(false)} onLogout={() => {logout();router.replace("/admin/login");}} userName={user.name} />

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-beige lg:hidden"
            aria-label="Open menu">
            
            <Menu size={20} />
          </button>
          <div className="hidden text-sm text-muted lg:block">
            {current?.label ?? "Admin"}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-charcoal hover:border-brand hover:text-brand">
              
              <ExternalLink size={13} /> View Site
            </Link>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-bronze text-sm font-semibold text-white">
                {user.name.charAt(0)}
              </span>
              <span className="hidden text-sm sm:block">
                <span className="block font-medium leading-tight text-charcoal">{user.name.split(" ")[0]}</span>
                <span className="block text-xs capitalize text-muted">{ROLE_LABELS[user.role] ?? "Admin"}</span>
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {denied ?
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-border bg-surface p-10 text-center">
              <ShieldAlert size={40} className="mx-auto text-brand" />
              <h2 className="mt-4 font-display text-2xl font-semibold">Access restricted</h2>
              <p className="mt-2 text-warmbrown/80">
                This module is available to Super Admins only. Contact your administrator for access.
              </p>
              <Link href="/admin" className="mt-6 inline-block font-semibold text-brand hover:underline">
                Back to Dashboard
              </Link>
            </div> :

          children
          }
        </main>
      </div>
    </div>);

}

function Sidebar({
  role, pathname, open, onClose, onLogout, userName

}) {
  const content =
  <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <Logo />
        <button onClick={onClose} className="lg:hidden" aria-label="Close menu">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar">
        {GROUPS.map((g) => {
        const items = NAV.filter(
          (n) => g.modules.includes(n.module) && canAccess(role, n.module)
        );
        if (!items.length) return null;
        return (
          <div key={g.title} className="mb-5">
              <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                {g.title}
              </p>
              <div className="space-y-0.5">
                {items.map((n) => {
                const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      active ?
                      "bg-brand text-white shadow-soft" :
                      "text-warmbrown hover:bg-beige hover:text-charcoal"
                    )}>
                    
                      <n.icon size={18} />
                      {n.label}
                    </Link>);

              })}
              </div>
            </div>);

      })}
      </nav>
      <div className="border-t border-border p-3">
        <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-warmbrown transition-colors hover:bg-beige hover:text-brand">
        
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>;

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-surface lg:block">
        {content}
      </aside>
      {/* Mobile */}
      {open &&
      <>
          <div className="fixed inset-0 z-40 bg-charcoal/60 lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85%] bg-surface lg:hidden">
            {content}
          </aside>
        </>
      }
    </>);

}
