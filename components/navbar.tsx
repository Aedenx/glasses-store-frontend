"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import LogoIcon from "./logo-icon";
import { useCart } from "./cart-provider";

const navLinks = [
  { label: "Pria", href: "/products?gender=pria" },
  { label: "Wanita", href: "/products?gender=wanita" },
  { label: "Anak", href: "/products?gender=anak" },
  { label: "Equipment", href: "/products?category=equipment" },
  { label: "Koleksi", href: "/#collections" },
  { label: "Best Seller", href: "/#summit" },
  { label: "International Brand", href: "/products?brand=international" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-14">
        {/* Logo – Stacked */}
        <Link
          href="/"
          className="flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1"
        >
          <LogoIcon className="h-8 w-8 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-white">
            ID
            <span className="text-emerald-500">VISION</span>
          </span>
        </Link>

        {/* Navigation – Desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href.startsWith("/products") && pathname?.startsWith("/products");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap px-3 py-2 text-[13px] font-semibold transition ${
                  isActive
                    ? "text-emerald-400"
                    : "text-zinc-300 hover:text-emerald-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search – Desktop */}
          <form
            onSubmit={onSearch}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 transition focus-within:border-emerald-400/60 md:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari..."
              className="w-32 bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
            />
          </form>

          {/* Notification */}
          <button
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-200 transition hover:bg-white/10 hover:text-emerald-400"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>

          {/* Cart */}
          <button
            aria-label="Keranjang"
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-200 transition hover:bg-white/10 hover:text-emerald-400"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <button
            aria-label="Akun Saya"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-200 transition hover:bg-white/10 hover:text-emerald-400"
          >
            <User className="h-4.5 w-4.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-200 transition hover:bg-white/10 hover:text-emerald-400 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-zinc-950 px-6 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-zinc-300 transition hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Search */}
          <form onSubmit={onSearch} className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kacamata..."
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
          </form>
        </nav>
      )}
    </header>
  );
}
