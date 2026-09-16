"use client";

import Link from "next/link";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop";

interface Category {
  name: string;
  slug: string;
  image: string;
}

const categories: Category[] = [
  {
    name: "SUMMIT",
    slug: "summit",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "TRAIL",
    slug: "trail",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "DUNE",
    slug: "dune",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "COAST",
    slug: "coast",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "URBAN",
    slug: "urban",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "CLASSIC",
    slug: "classic",
    image:
      "https://images.unsplash.com/photo-1574259126836-e0fb1b4ca8d3?q=80&w=600&auto=format&fit=crop",
  },
];

export default function CategorySlider() {
  return (
    <section className="px-6 py-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[2px] text-white/70">
            Kategori Populer
          </h3>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group flex w-[140px] flex-shrink-0 cursor-pointer flex-col items-center gap-3 sm:w-[170px]"
            >
              <div className="relative h-[120px] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 transition group-hover:border-emerald-400/50 sm:h-[150px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={`Koleksi ${cat.name} — kacamata outdoor ID VISION`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_IMAGE) {
                      target.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-white/70 transition group-hover:text-white">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}