"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="px-4 md:px-8 lg:px-14">
      <div className="relative h-[500px] w-full overflow-hidden rounded-2xl md:h-[600px]">
        {/* Background Image */}
        <img
          src="/images/summit-model.jpg"
          alt="Summit Collection Model"
          className="h-full w-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl px-8 md:px-12">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Summit Collection
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              Conquer Every
              <br />
              <span className="text-emerald-400">Peak</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-200 md:text-base">
              Koleksi kacamata outdoor untuk pendakian dengan proteksi UV tinggi
              dan desain tahan banting. Ringan, nyaman, dan siap menemani
              petualangan Anda.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products?collection=SUMMIT"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Lihat Koleksi
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
              >
                Semua Produk
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
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
