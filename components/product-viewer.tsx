"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";
import ProductMedia from "./product-media";
import BuyBox from "./buybox";

export default function ProductViewer({
  product,
}: {
  product: ProductView;
}) {
  const [variantId, setVariantId] = useState<number | null>(null);

  const selected =
    product.variants.find((v) => v.id === variantId) ??
    product.variants.find((v) => v.stock_quantity > 0) ??
    product.variants[0];

  const items = product.variants.map((v) => ({
    src: v.image || product.image,
    label: `${v.frame_color} · ${v.lens_color}`,
    out: v.stock_quantity === 0,
  }));

  const activeIndex = Math.max(
    0,
    product.variants.findIndex((v) => v.id === selected?.id)
  );

  const priceRange =
    product.variants.length > 1 &&
    product.variants.some((v) => v.price !== product.variants[0].price);

  if (items.length === 0 || !selected) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <ProductMedia
        items={items}
        activeIndex={activeIndex}
        onSelect={(i) => setVariantId(product.variants[i].id)}
      />

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
            {product.collection.code}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
            {product.gender}
          </span>
          {product.is_polarized && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              <BadgeCheck className="h-3 w-3 text-emerald-400" />
              Polarized
            </span>
          )}
          {product.is_prescription_available && (
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
              Lensa resep tersedia
            </span>
          )}
        </div>

        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
          {product.name}
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">
          <span className="rounded-full border border-white/15 px-3 py-1.5">
            {product.material.name}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1.5">
            {product.shape.name}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1.5">
            {product.lensType.name}
          </span>
          <span className="ml-auto text-white/40">SKU {product.sku}</span>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-3xl font-black text-emerald-400">
              {formatIDR(selected.price)}
            </span>
            {priceRange && (
              <span className="text-sm text-white/50">
                s.d.{" "}
                {formatIDR(
                  product.variants.reduce(
                    (max, v) => Math.max(max, v.price),
                    product.lowest_price
                  )
                )}
              </span>
            )}
          </div>

          <BuyBox
            product={product}
            selectedVariant={selected}
            onSelectVariant={setVariantId}
          />
        </div>
      </div>
    </div>
  );
}