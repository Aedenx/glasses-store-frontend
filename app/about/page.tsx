"use client";

import { Award, Eye, Mountain, ShieldCheck, Target, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Container utama sejajar (Max Width 7XL) */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        
        {/* Header Singkat Top Bar */}
        <div className="mb-8 flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <Mountain size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider text-white md:text-2xl">
              Tentang IDVision
            </h1>
            <p className="text-xs text-zinc-400">
              Redefining Outdoor & Urban Eyewear Protection
            </p>
          </div>
        </div>

        {/* Grid 2 Kolom Sejajar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* KOLOM KIRI: Foto & Visual Utama */}
          <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-5">
            <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:min-h-[500px]">
              {/* Foto Kamu Sendiri (Ganti path /images/merbabu.jpg dengan foto kamu di folder public) */}
              <img
                src="/images/deni.jpg"
                alt="IDVision Brand Story"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-black">
                  Crafted for Adventure
                </span>
                <h2 className="mt-3 text-xl font-black uppercase text-white drop-shadow-md md:text-2xl">
                  Perlindungan Lensa Optimal di Setiap Medan
                </h2>
                <p className="mt-1 text-xs text-zinc-300">
                  Didukung material frame ultralight & lensa polarized UV400.
                </p>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Cerita, Misi, & Poin Keunggulan Sejajar */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 lg:col-span-6 xl:col-span-7">
            <div className="space-y-4">
              <div className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Misi Kami
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                Kacamata Tangguh untuk Aktivitas Outdoor & Harian
              </h2>
              <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
                Berawal dari kebutuhan akan kacamata yang tahan banting saat pendakian gunung dan olahraga ekstrem, IDVision dirancang khusus untuk kenyamanan jangka panjang. Kami menggabungkan estetika urban modern dengan teknologi proteksi radiasi UV400 penuh.
              </p>

              {/* Grid 2 Poin Keunggulan */}
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-black/50 p-3.5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h3 className="text-xs font-bold uppercase text-white">100% Proteksi UV400</h3>
                    <p className="mt-0.5 text-[11px] text-zinc-400">Perlindungan penuh dari paparan sinar UVA & UVB.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-black/50 p-3.5">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h3 className="text-xs font-bold uppercase text-white">Material Ultralight</h3>
                    <p className="mt-0.5 text-[11px] text-zinc-400">Ringan dan nyaman dipakai seharian tanpa tekanan.</p>
                  </div>
                </div>
              </div>

              {/* 3 Nilai Utama */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-3">
                  <Target size={18} className="mx-auto text-emerald-400 mb-1" />
                  <p className="text-[10px] font-extrabold uppercase text-white">Inovasi</p>
                </div>
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-3">
                  <Eye size={18} className="mx-auto text-emerald-400 mb-1" />
                  <p className="text-[10px] font-extrabold uppercase text-white">Kejernihan</p>
                </div>
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-3">
                  <Users size={18} className="mx-auto text-emerald-400 mb-1" />
                  <p className="text-[10px] font-extrabold uppercase text-white">Komunitas</p>
                </div>
              </div>
            </div>

            {/* Tombol Navigasi Bawah */}
            <div className="flex flex-wrap items-center gap-3 border-t border-zinc-800/80 pt-5">
              <Link
                href="/products"
                className="flex-1 rounded-xl bg-emerald-500 py-3 text-center text-xs font-extrabold uppercase tracking-wider text-black transition hover:bg-emerald-400 active:scale-95"
              >
                Lihat Katalog
              </Link>
              <Link
                href="/store"
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-center text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-zinc-700 active:scale-95"
              >
                Cari Lokasi Toko
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}