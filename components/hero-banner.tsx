"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

const slides: Slide[] = [
  {
    eyebrow: "NEW LAUNCH",
    title: "UV COLLECTION",
    subtitle: "GET YOURS NOW →",
    href: "/products?collection=uv",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
  },
  {
    eyebrow: "BEST SELLER",
    title: "SUMMIT SERIES",
    subtitle: "EXPLORE NOW →",
    href: "/products?collection=summit",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    eyebrow: "EXCLUSIVE DROP",
    title: "OUTDOOR EYEWEAR SERIES",
    subtitle: "SHOP THE COLLECTION →",
    href: "/products?collection=outdoor",
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="px-6 pt-6 lg:px-14">
      <div className="relative mx-auto max-w-7xl">
        {/* Banner Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Image */}
          <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Text Overlay – Kiri Tengah */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
            <span className="mb-3 text-sm font-bold uppercase tracking-[3px] text-emerald-400 sm:text-base">
              {slide.eyebrow}
            </span>
            <h2 className="text-4xl font-black uppercase leading-tight text-white drop-shadow sm:text-5xl lg:text-7xl">
              {slide.title}
            </h2>
            <Link
              href={slide.href}
              className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[2px] text-white transition hover:text-emerald-400 sm:text-base"
            >
              {slide.subtitle}
            </Link>
          </div>

          {/* Prev Button */}
          <button
            aria-label="Slide sebelumnya"
            onClick={prev}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-md transition hover:bg-black/80 md:h-12 md:w-12"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Next Button */}
          <button
            aria-label="Slide berikutnya"
            onClick={next}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-md transition hover:bg-black/80 md:h-12 md:w-12"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
