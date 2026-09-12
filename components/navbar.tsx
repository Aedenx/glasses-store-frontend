"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Mountain, Search, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "Collections", href: "/#collections" },
  { label: "Best Seller", href: "/#lookbook" },
  { label: "About", href: "/#contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between gap-4 px-6 py-5 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl">
            <Mountain className="h-5 w-5 text-emerald-400" />
          </span>
          <span className="text-sm font-black uppercase tracking-[3px] text-white">
            Ikhwan
            <span className="text-emerald-400">Vision</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-black/30 p-1.5 backdrop-blur-xl lg:flex">
          {navLinks.map((link, index) => {
            const active =
              link.href === "/products"
                ? pathname?.startsWith("/products")
                : false;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                  active || index === 0
                    ? "bg-white text-black"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={onSearch}
          className="hidden w-full max-w-[220px] items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 backdrop-blur-xl transition focus-within:border-emerald-400/60 md:flex"
        >
          <Search className="h-4 w-4 shrink-0 text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kacamata..."
            className="w-full bg-transparent text-xs font-medium text-white placeholder-white/40 outline-none"
          />
        </form>

        {/* Icons */}
        <div className="flex items-center gap-2.5">
          <button
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition hover:border-white/40"
          >
            <Heart className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-black">
              3
            </span>
          </button>

          <button
            aria-label="Keranjang"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition hover:border-white/40"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </button>

          <button
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition hover:border-white/40 lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}