"use client";

import { Bell, Mountain, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-provider";

const navLinks = [
  { label: "Pria", href: "/products?gender=Men" },
  { label: "Wanita", href: "/products?gender=Women" },
  { label: "Anak", href: "/products?gender=Kids" },
  { label: "Equipment", href: "/#collections" },
  { label: "Koleksi", href: "/#collections" },
  { label: "Best Buy Before Bye", href: "/#lookbook" },
  { label: "International Brand", href: "/#lookbook" },
];

export default function Navbar() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 h-16 bg-black px-6 text-white">
      <div className="flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Mountain className="h-5 w-5 text-white" size={20} />
          <span className="text-xl font-extrabold uppercase tracking-widest">
            <span className="text-emerald-300">ID</span>Vision
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition hover:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            onClick={() => router.push("/products")}
            className="cursor-pointer transition hover:text-gray-300"
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Notifikasi"
            className="cursor-pointer transition hover:text-gray-300"
          >
            <Bell size={20} />
          </button>
          <button
            aria-label="Keranjang"
            onClick={openCart}
            className="relative cursor-pointer transition hover:text-gray-300"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label="Akun"
            className="cursor-pointer transition hover:text-gray-300"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}