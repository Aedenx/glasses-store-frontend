"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBanners, Banner } from "@/lib/site-data";

export default function HeroSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  // Ref untuk fitur Swipe Layar HP
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    getBanners().then((data) => {
      if (data && data.length > 0) {
        setBanners(data);
      }
    });
  }, []);

  const next = useCallback(() => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Slide Otomatis tiap 4 detik
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, banners.length]);

  // Handler Usap/Swipe Layar HP
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    // Geser Kiri -> Next, Geser Kanan -> Prev
    if (distance > 50) {
      next();
    } else if (distance < -50) {
      prev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (banners.length === 0) return null;

  const slide = banners[current];

  return (
    <section className="px-3 py-2 md:px-8 md:py-4">
      <div
        className="relative h-[480px] sm:h-[520px] w-full overflow-hidden rounded-2xl md:h-[550px] select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* LAYER 1: Gambar Banner Carousel */}
        {banners.map((s, i) => {
          const imgUrl = s.image.startsWith("http")
            ? s.image
            : `http://localhost:8000/storage/${s.image}`;

          return (
            <div
              key={s.id || i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            >
              <img
                src={imgUrl}
                alt={s.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          );
        })}

        {/* LAYER 2: Overlay Gelap Vertikal */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* LAYER 3: Konten Teks & Tombol (Vertikal Rapi di Mobile) */}
        <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col items-start gap-3 text-left text-white md:bottom-12 md:left-12 md:right-auto md:max-w-xl">
          {/* Judul Banner */}
          <h2 className="text-2xl font-black uppercase tracking-tight drop-shadow-md sm:text-3xl md:text-5xl leading-tight">
            {slide.title}
          </h2>

          {/* Subjudul */}
          {slide.subtitle && (
            <p className="text-xs font-medium text-zinc-300 drop-shadow line-clamp-2 sm:text-sm md:text-base">
              {slide.subtitle}
            </p>
          )}

          {/* Tombol CTA */}
          {slide.cta_label && (
            <div className="pt-1">
              <Link
                href={slide.cta_link || "/products"}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all hover:bg-emerald-400 active:scale-95 md:px-6 md:py-3 md:text-sm"
              >
                {slide.cta_label}
              </Link>
            </div>
          )}
        </div>

        {/* LAYER 4: Panah Navigasi (KHUSUS DESKTOP / HIDDEN DI HP) */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="hidden md:flex absolute left-4 top-1/2 z-30 h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-emerald-500 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="hidden md:flex absolute right-4 top-1/2 z-30 h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-emerald-500 hover:text-black"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* LAYER 5: Titik Indikator Slider (Pojok Kanan Bawah di HP) */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 right-4 z-30 flex gap-1.5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-4">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 bg-emerald-400"
                    : "w-1.5 bg-white/40 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
