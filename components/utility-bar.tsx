"use client";

import { Smartphone } from "lucide-react";
import Link from "next/link";

const utilityLinks = [
  { label: "Tentang", href: "/tentang" },
  { label: "Membership", href: "/membership" },
  { label: "Cari Toko", href: "/cari-toko" },
  { label: "Bantuan", href: "/bantuan" },
  { label: "Lifetime Warranty", href: "/warranty" },
  { label: "Corporate Order", href: "/corporate-order" },
];

export default function UtilityBar() {
  return (
    <div className="w-full bg-zinc-950 text-[11px] text-zinc-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-14">
        {/* Kiri: Download App */}
        <Link
          href="/download-app"
          className="flex items-center gap-2 py-2.5 text-zinc-300 transition hover:text-emerald-400"
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span className="font-medium">Download ID VISION App</span>
        </Link>

        {/* Kanan: Utility Links */}
        <div className="hidden items-center gap-1 md:flex">
          {utilityLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span className="mx-1.5 text-zinc-600">|</span>
              )}
              <Link
                href={link.href}
                className="py-2.5 font-medium transition hover:text-emerald-400"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
