"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";
import { getLensType } from "@/lib/store-data";
import { useCart } from "./cart-provider";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop";

const FRAME_SWATCHES: Record<string, string> = {
  "Matte Black": "#1c1c1e",
  Black: "#0d0d0d",
  "Army Green": "#4a5d3a",
  Gunmetal: "#4a4e54",
  "Desert Sand": "#c2b280",
  "Burnt Orange": "#cc5500",
  Gold: "#d4af37",
  Silver: "#c8ccd0",
  "Pink Tortoise": "#e8b4a0",
  White: "#f4f4f5",
  "Honey Tortoise": "#c98a4b",
  Navy: "#1f3a5f",
  "Transparent Clear": "#e5e5e5",
  "Antique Gold": "#b8860b",
  "Rose Gold": "#b76e79",
  "Camo Green": "#5f6b4a",
  "Ocean Blue": "#1f5fbf",
  "Carbon Black": "#2b2b2b",
  "Neon Yellow": "#d9ff00",
  Burgundy: "#6e2c33",
  Tortoise: "#9c6b3f",
  "Titanium Grey": "#7c848c",
  Rose: "#f4c2c2",
  Olive: "#708238",
  Blue: "#2563eb",
  Red: "#dc2626",
  Green: "#16a34a",
};

const LIGHT_COLORS = new Set([
  "White",
  "Silver",
  "Rose",
  "Transparent Clear",
]);

export default function CollectionProductCard({
  product,
}: {
  product: ProductView;
}) {
  const { addItem } = useCart();
  const [imageSrc, setImageSrc] = useState(product.image);
  const [added, setAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.stock_quantity > 0) ?? null;
  const soldOut = !activeVariant;
  const lensType = activeVariant
    ? getLensType(activeVariant.lens_type_id)
    : null;

  const handleQuickAdd = () => {
    if (!activeVariant) return;
    addItem(
      {
        product_id: product.id,
        product_slug: product.slug,
        product_name: product.name,
        product_image: activeVariant.image,
        variant_id: activeVariant.id,
        frame_color: activeVariant.frame_color,
        lens_color: activeVariant.lens_color,
        lens_type: lensType?.name ?? "-",
        unit_price: activeVariant.price,
        prescription: null,
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const uniqueColors = [
    ...new Set(product.variants.filter((v) => v.stock_quantity > 0).map((v) => v.frame_color)),
  ].slice(0, 4);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-lg transition duration-500 hover:-translate-y-1 hover:border-emerald-500/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FALLBACK_IMAGE) {
              setImageSrc(FALLBACK_IMAGE);
              target.src = FALLBACK_IMAGE;
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Collection badge */}
        <span className="absolute left-3 top-3 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-xl">
          {product.collection.code}
        </span>

        {/* Polarized / UV400 badges */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {product.is_polarized && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-xl">
              Polarized
            </span>
          )}
          <span className="rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-xl">
            UV400
          </span>
        </div>

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-5">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
            {product.gender} · {product.lensType.name}
          </p>
          <h3 className="truncate text-base font-extrabold uppercase tracking-wide text-white">
            {product.name}
          </h3>
        </div>

        {/* Frame color swatches */}
        <div className="flex items-center gap-1.5">
          {uniqueColors.map((color) => (
            <span
              key={color}
              title={color}
              className={`h-4 w-4 shrink-0 rounded-full ${LIGHT_COLORS.has(color) ? "ring-1 ring-white/30" : ""}`}
              style={{ backgroundColor: FRAME_SWATCHES[color] ?? "#8a8f98" }}
            />
          ))}
          {uniqueColors.length > 0 && (
            <span className="text-[10px] text-white/40">{uniqueColors.length} warna</span>
          )}
        </div>

        {/* Price + Quick Add */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Mulai dari</p>
            <span className="text-base font-black text-emerald-400">
              {formatIDR(product.lowest_price)}
            </span>
          </div>

          {!soldOut && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuickAdd();
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition duration-300 ${
                added
                  ? "bg-emerald-400 text-black"
                  : "bg-white/10 text-white hover:bg-emerald-400 hover:text-black"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Ditambahkan
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Quick Add
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
