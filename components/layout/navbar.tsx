"use client";

import { useState } from "react";
import Link from "next/link";
import { Mountain, ShoppingBag, Search, User, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <Mountain className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-black uppercase tracking-widest">
              <span className="text-emerald-400">ID</span>Vision
            </span>
          </Link>

          {/* Menu Navigasi Utama */}
          <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-300 md:flex">
            <Link href="/" className="hover:text-emerald-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition">
              About
            </Link>
            <Link href="/products" className="hover:text-emerald-400 transition">
              Katalog
            </Link>

            {/* Dropdown Menu Gender */}
            <div
              className="relative"
              onMouseEnter={() => setIsGenderOpen(true)}
              onMouseLeave={() => setIsGenderOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-emerald-400 transition py-1"
              >
                <span>Gender</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isGenderOpen ? "rotate-180 text-emerald-400" : ""}`} />
              </button>

              {/* Sub-menu Dropdown Pria & Wanita */}
              {isGenderOpen && (
                <div className="absolute top-full left-0 w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl backdrop-blur-lg">
                  <Link
                    href="/products?gender=pria"
                    onClick={() => setIsGenderOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-900 hover:text-emerald-400 transition"
                  >
                    Kacamata Pria
                  </Link>
                  <Link
                    href="/products?gender=wanita"
                    onClick={() => setIsGenderOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-900 hover:text-emerald-400 transition"
                  >
                    Kacamata Wanita
                  </Link>
                </div>
              )}
            </div>

            <Link href="/promo" className="hover:text-emerald-400 transition">
              Promo
            </Link>
            <Link href="/store" className="hover:text-emerald-400 transition">
              Store
            </Link>
          </div>

          {/* Akses Cepat Samping Kanan */}
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-zinc-400 hover:text-white transition">
              <Search size={18} />
            </Link>

            {/* Tombol Keranjang */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2 text-zinc-300 hover:text-white transition cursor-pointer"
              aria-label="Buka Keranjang"
            >
              <ShoppingBag size={20} className="text-emerald-400" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-black shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            <Link href="/about" className="text-zinc-400 hover:text-white transition">
              <User size={18} />
            </Link>
          </div>

        </div>
      </nav>

      {/* Drawer Keranjang */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}