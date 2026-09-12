"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductMedia({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [images[0] ?? ""];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-white/10">
        <Image
          src={safeImages[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
          {active + 1} / {safeImages.length}
        </span>
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {safeImages.map((image, index) => (
            <button
              key={image + index}
              type="button"
              aria-label={`Lihat gambar ${index + 1}`}
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-xl ring-2 transition ${
                active === index
                  ? "ring-emerald-400"
                  : "ring-white/10 hover:ring-white/30"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}