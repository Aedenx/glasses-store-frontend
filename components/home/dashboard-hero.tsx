"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="px-3 md:px-8 lg:px-14">
      <div className="relative h-[550px] w-full overflow-hidden rounded-2xl sm:h-[580px] md:h-[600px]">
        {/* Background Image */}
        <img
          src="/images/summit-model.jpg"
          alt="Summit Collection Model"
          className="h-full w-full object-cover object-center"
        />

        {/* Overlay Gradasi Atas & Bawah agar Tengah/Model Terbuka Jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/90 md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:justify-center md:p-12 lg:p-16">
          {/* BAGIAN ATAS: Badge & Judul */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Summit Collection
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg leading-none">
              Conquer Every
              <br />
              <span className="text-emerald-400">Peak</span>
            </h1>

            {/* Description (Tampil di Desktop, Disembunyikan / Diperpendek di Mobile agar Model Kelihatan) */}
            <p className="mt-3 hidden max-w-md text-xs leading-relaxed text-gray-200 sm:block md:text-base">
              Koleksi kacamata outdoor untuk pendakian dengan proteksi UV tinggi
              dan desain tahan banting. Ringan, nyaman, dan siap menemani
              petualangan Anda.
            </p>
          </div>

          {/* BAGIAN BAWAH: Tombol CTA & Deskripsi Singkat Mobile */}
          <div className="max-w-xl">
            {/* Deskripsi Singkat khusus Mobile */}
            <p className="mb-4 text-xs font-medium text-gray-200 sm:hidden drop-shadow-md">
              Kacamata outdoor pendakian dengan proteksi UV400 & frame
              ultra-ringan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-4">
              <Link
                href="/products?collection=SUMMIT"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 active:scale-95 sm:rounded-full md:text-sm"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-black/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 active:scale-95 sm:rounded-full md:text-sm"
              >
                Semua Produk
              </Link>
            </div>
          </div>
        </div>

        {/* Stats (Desktop Only) */}
        <div className="absolute bottom-8 right-8 hidden items-center gap-8 md:flex">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">10+</p>
            <p className="text-xs text-gray-300">Produk</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-xs text-gray-300">Koleksi</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white">UV400</p>
            <p className="text-xs text-gray-300">Proteksi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
