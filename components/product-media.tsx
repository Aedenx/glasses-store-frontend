"use client";

import Image from "next/image";

export interface MediaItem {
  src: string;
  label: string;
  out?: boolean;
}

export default function ProductMedia({
  items,
  activeIndex,
  onSelect,
}: {
  items: MediaItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  if (items.length === 0) return null;

  const safeIndex = Math.min(activeIndex, items.length - 1);
  const active = items[safeIndex];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-white/10">
        <Image
          src={active.src}
          alt={active.label}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover transition duration-500"
        />
        <div className="absolute inset-0 bg-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
          {safeIndex + 1} / {items.length}
        </span>

        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-xl">
          {active.label}
          {active.out && " · Habis"}
        </span>

        {active.out && (
          <div className="absolute inset-x-0 top-0 flex justify-center pt-5">
            <span className="rounded-full bg-red-500/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {items.map((item, index) => (
            <button
              key={item.src + index}
              type="button"
              aria-label={`Tampilkan ${item.label}`}
              onClick={() => onSelect(index)}
              className={`relative aspect-square overflow-hidden rounded-xl ring-2 transition ${
                safeIndex === index
                  ? "ring-emerald-400"
                  : "ring-white/10 hover:ring-white/30"
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
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