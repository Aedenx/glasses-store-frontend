"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Mountain,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";
import { getSiteSettings } from "@/lib/site-data";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  const { totalItems } = useCart();

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSiteSettings(data);
    });
  }, []);

  const siteName = siteSettings.site_name || "IDVISION";
  const logoPath = siteSettings.site_logo || siteSettings.logo;
  const logoUrl = logoPath ? `http://localhost:8000/storage/${logoPath}` : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* KIRI: Logo Brand Dinamis + Nama Toko Stack Vertikal */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-white group py-1"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              className="h-6 w-auto object-contain transition-transform group-hover:scale-105 md:h-7"
            />
          ) : (
            <Mountain className="h-5 w-5 text-emerald-400" />
          )}

          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 md:text-[10px]">
            <span className="text-emerald-400">{siteName.substring(0, 2)}</span>
            {siteName.substring(2)}
          </span>
        </Link>

        {/* TENGAH: Menu Navigasi Desktop */}
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-300 md:flex">
          <Link href="/" className="transition hover:text-emerald-400">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-emerald-400">
            About
          </Link>
          <Link href="/products" className="transition hover:text-emerald-400">
            Katalog
          </Link>

          {/* DROPDOWN MENU GENDER */}
          <div className="relative group">
            <button
              onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
              className="flex items-center gap-1 transition hover:text-emerald-400 py-2 focus:outline-none"
            >
              <span>Gender</span>
              <ChevronDown
                size={14}
                className="transition-transform group-hover:rotate-180"
              />
            </button>

            {/* Submenu Hover & Click */}
            <div className="absolute left-0 top-full hidden w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl group-hover:block">
              <Link
                href="/products?gender=pria"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-emerald-400"
              >
                Kacamata Pria
              </Link>
              <Link
                href="/products?gender=wanita"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-emerald-400"
              >
                Kacamata Wanita
              </Link>
            </div>
          </div>

          <Link href="/promo" className="transition hover:text-emerald-400">
            Promo
          </Link>
          <Link href="/store" className="transition hover:text-emerald-400">
            Store
          </Link>
        </nav>

        {/* KANAN: Ikon Akses & Hamburger Menu Mobile */}
        <div className="flex items-center gap-4 text-white">
          <button
            aria-label="Search"
            className="transition hover:text-emerald-400"
          >
            <Search size={19} />
          </button>

          {/* Tombol Keranjang */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="relative transition hover:text-emerald-400"
          >
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href="/login"
            aria-label="Account"
            className="hidden transition hover:text-emerald-400 sm:block"
          >
            <User size={19} />
          </Link>

          {/* Tombol Hamburger Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="text-zinc-300 transition hover:text-white md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* DRAWER MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-300 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition hover:text-emerald-400"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition hover:text-emerald-400"
            >
              About
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition hover:text-emerald-400"
            >
              Katalog
            </Link>

            {/* Menu Gender di Mobile Drawer */}
            <div className="flex flex-col space-y-2 border-l-2 border-emerald-500/40 pl-3">
              <span className="text-[10px] font-bold text-emerald-400 tracking-widest">
                KATEGORI GENDER
              </span>
              <Link
                href="/products?gender=pria"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 transition hover:text-emerald-400"
              >
                Kacamata Pria
              </Link>
              <Link
                href="/products?gender=wanita"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 transition hover:text-emerald-400"
              >
                Kacamata Wanita
              </Link>
            </div>

            <Link
              href="/promo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition hover:text-emerald-400"
            >
              Promo
            </Link>
            <Link
              href="/store"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition hover:text-emerald-400"
            >
              Store
            </Link>
          </div>
        </div>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
