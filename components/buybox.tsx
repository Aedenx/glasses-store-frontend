"use client";

import { useState, type CSSProperties } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Prescription, ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";
import { getLensType } from "@/lib/store-data";
import { useCart } from "./cart-provider";
import PrescriptionForm from "./prescription-form";

const SWATCHES: Record<string, string> = {
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

function swatchStyle(color: string): CSSProperties {
  const background = SWATCHES[color] ?? "#8a8f98";
  return { backgroundColor: background };
}

const lightColors = new Set(["White", "Silver", "Rose", "Transparent Clear"]);

export default function BuyBox({ product }: { product: ProductView }) {
  const { addItem } = useCart();

  const [variantId, setVariantId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [prescription, setPrescription] = useState<Prescription | null>(null);

  const selected =
    product.variants.find((v) => v.id === variantId) ??
    product.variants.find((v) => v.stock_quantity > 0) ??
    product.variants[0];

  const lensType = selected ? getLensType(selected.lens_type_id) : null;
  const soldOut = selected ? selected.stock_quantity === 0 : true;

  const addToCart = () => {
    if (!selected || soldOut) return;
    addItem(
      {
        product_id: product.id,
        product_slug: product.slug,
        product_name: product.name,
        product_image: product.image,
        variant_id: selected.id,
        frame_color: selected.frame_color,
        lens_color: selected.lens_color,
        lens_type: lensType?.name ?? "-",
        unit_price: selected.price,
        prescription,
      },
      quantity
    );
  };

  return (
    <div className="space-y-6">
      {/* Variants */}
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/40">
          Pilih Varian (frame + lensa)
        </p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => {
            const active = variant.id === selected?.id;
            const out = variant.stock_quantity === 0;
            return (
              <button
                key={variant.id}
                type="button"
                disabled={out}
                onClick={() => setVariantId(variant.id)}
                className={`group relative flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition ${
                  active
                    ? "border-emerald-400 bg-emerald-400/10"
                    : out
                      ? "cursor-not-allowed border-white/5 bg-white/[0.01] opacity-40"
                      : "border-white/15 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                <span
                  className={`h-4 w-4 shrink-0 rounded-full ${lightColors.has(variant.frame_color) ? "ring-1 ring-white/30" : ""}`}
                  style={swatchStyle(variant.frame_color)}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-white">
                    {variant.frame_color}
                  </span>
                  <span className="block text-[10px] text-white/40">
                    {variant.lens_color} · {getLensType(variant.lens_type_id).name}{" "}
                    {out ? "· Habis" : `· ${formatIDR(variant.price)}`}
                  </span>
                </span>
                {active && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price + stock + qty */}
      <div className="flex items-end justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">
            {selected.frame_color} · {selected.lens_color} ·{" "}
            {lensType?.name ?? "-"}
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-300">
            {formatIDR(selected.price)}
          </p>
          <p
            className={`mt-1 text-[11px] ${
              soldOut
                ? "text-rose-400"
                : selected.stock_quantity <= 5
                  ? "text-amber-300"
                  : "text-emerald-300/80"
            }`}
          >
            {soldOut
              ? "Stok habis"
              : selected.stock_quantity <= 5
                ? `Stok tersisa ${selected.stock_quantity}`
                : "Stok tersedia"}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
          <button
            type="button"
            aria-label="Kurangi"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold">{quantity}</span>
          <button
            type="button"
            aria-label="Tambah"
            onClick={() => setQuantity((q) => Math.min(selected.stock_quantity, q + 1))}
            disabled={soldOut || quantity >= selected.stock_quantity}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10 disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Prescription */}
      <PrescriptionForm
        value={prescription}
        onChange={setPrescription}
        disabled={!product.is_prescription_available}
      />

      {/* CTA */}
      <button
        type="button"
        disabled={soldOut}
        onClick={addToCart}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-emerald-400 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
      >
        <ShoppingBag className="h-4 w-4" />
        {soldOut ? "Stok Habis" : "Tambah ke Keranjang"}
      </button>

      <p className="text-center text-[11px] text-white/40">
        Gratis ongkir untuk pembelian di atas Rp 500.000.
      </p>
    </div>
  );
}