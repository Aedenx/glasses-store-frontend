"use client";

import { useState } from "react";
import { Copy, Check, Tag, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const promoItems = [
  {
    id: 1,
    title: "SUMMER OUTDOOR SALE",
    discount: "DISKON 30%",
    code: "SUMMER30",
    description: "Khusus untuk semua koleksi kacamata outdoor seri Summit dan Trail. Persiapan pendakian lebih maksimal!",
    validUntil: "30 September 2026",
    badge: "Paling Populer",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
  },
  {
    id: 2,
    title: "PROMO MEMBER BARU",
    discount: "POTONGAN Rp 50.000",
    code: "NEWVISION",
    description: "Tanpa minimum pembelian untuk pengguna pertama aplikasi & website IDVision. Berlaku untuk seluruh produk.",
    validUntil: "31 Desember 2026",
    badge: "Member Baru",
    category: "Umum",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
  },
  {
    id: 3,
    title: "BUY 1 GET 1 LENS CLEANER",
    discount: "FREE GIFT",
    code: "FREECLEAN",
    description: "Dapatkan pembersih lensa kacamata microfiber eksklusif setiap pembelian frame kacamata seri Noir atau Apex.",
    validUntil: "15 Oktober 2026",
    badge: "Bonus Gratis",
    category: "Aksesoris",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800",
  },
  {
    id: 4,
    title: "FLASH SALE SOLAR SERIES",
    discount: "DISKON 50%",
    code: "SOLAR50",
    description: "Diskon setengah harga khusus kacamata polarized seri Solar. Stok sangat terbatas!",
    validUntil: "25 September 2026",
    badge: "Limited Offer",
    category: "Polarized",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800",
  },
];

export default function PromoPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Halaman Promo */}
      <section className="relative border-b border-zinc-800 bg-zinc-950/50 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Penawaran Terbatas
            </span>
          </div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            Promo & Voucher Eksklusif
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
            Gunakan kode voucher di bawah ini saat checkout untuk mendapatkan potongan harga spesial pada produk kacamata favoritmu.
          </p>
        </div>
      </section>

      {/* Main Content: Grid Kartu Promo */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {promoItems.map((promo) => (
            <div
              key={promo.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Gambar Promo */}
                <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 bg-zinc-800 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-md">
                    {promo.badge}
                  </div>
                </div>

                {/* Informasi Promo */}
                <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                      <Tag size={14} />
                      <span>{promo.category}</span>
                    </div>

                    <h2 className="text-xl font-black uppercase text-white tracking-wide">
                      {promo.title}
                    </h2>

                    <p className="mt-1 text-lg font-extrabold text-emerald-400">
                      {promo.discount}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {promo.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Clock size={13} />
                        <span>Berlaku s/d {promo.validUntil}</span>
                      </div>
                    </div>

                    {/* Tombol Copy Kode Voucher */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-lg border border-dashed border-zinc-700 bg-zinc-950 px-3 py-2 text-center text-xs font-mono font-bold tracking-widest text-emerald-300">
                        {promo.code}
                      </div>

                      <button
                        onClick={() => copyToClipboard(promo.code)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-emerald-400 active:scale-95"
                      >
                        {copiedCode === promo.code ? (
                          <>
                            <Check size={14} />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA ke Katalog Produk */}
        <div className="mt-12 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 p-8 text-center md:p-12">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
            Sudah Punya Kode Vouchernya?
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Pilih kacamata impianmu sekarang dan gunakan kodenya saat melakukan pembayaran.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-block rounded-full bg-emerald-500 px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-emerald-400 hover:shadow-emerald-500/20 active:scale-95"
            >
              Belanja Sekarang
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}