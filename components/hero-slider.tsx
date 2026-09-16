"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    src: "/images/deni.jpg",
    alt: "Deni",
    title: "UPGRADE YOUR LOOK",
    desc: "Tampil Lebih Confident dengan Seri Kacamata Terbaru dari IDVISION",
    cta: "BELI SEKARANG",
    href: "/products",
  },
  {
    src: "/images/ikhwan.jpg",
    alt: "Ikhwan",
    title: "EXPLORE YOUR STYLE",
    desc: "Kacamata Premium untuk Aktivitas Outdoor & Sehari-hari",
    cta: "BELI SEKARANG",
    href: "/products",
  },
  {
    src: "/images/merbabu.jpg",
    alt: "Merbabu",
    title: "DEFINE YOUR IDENTITY",
    desc: "Koleksi Eksklusif IDVISION untuk Tampilan yang Berbeda",
    cta: "LIHAT KOLEKSI",
    href: "/products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Slide otomatis tiap 2 detik
  useEffect(() => {
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="px-4 py-4 md:px-8">
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[500px]">
        {/* Full Background Slider Image */}
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover object-center"
            />
            {/* Overlay tipis seragam biar teks tetep kebaca jelas */}
            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}

        {/* Text area di kiri bawah (gaya Eiger/Outlive) */}
        <div className="absolute bottom-8 left-6 z-20 max-w-lg text-left text-white md:bottom-12 md:left-12">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md md:text-5xl">
            {slide.title}
          </h2>
          <p className="mt-2 text-xs font-medium text-gray-100 drop-shadow md:text-sm">
            {slide.desc}
          </p>
        </div>

        {/* Tombol CTA di kanan bawah */}
        <div className="absolute bottom-8 right-6 z-20 md:bottom-12 md:right-12">
          <Link
            href={slide.href}
            className="inline-block rounded-md bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 hover:bg-gray-100 md:px-6 md:py-3 md:text-sm"
          >
            {slide.cta}
          </Link>
        </div>

        {/* Tombol panah navigasi kiri & kanan */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/60"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/60"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Titik navigasi slider di bagian bawah tengah */}
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}