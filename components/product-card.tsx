import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";

export default function ProductCard({ product }: { product: ProductView }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-[#16181a] ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:ring-white/30"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f10]/80 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-xl">
          {product.collection.code}
        </span>

        {product.is_polarized && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-xl">
            <BadgeCheck className="h-3 w-3 text-emerald-400" /> Polarized
          </span>
        )}

        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold uppercase tracking-wide">{product.name}</h3>
        </div>

        <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
          {product.material.name} · {product.shape.name} ·{" "}
          {product.gender}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-base font-black text-emerald-300">
              {formatIDR(product.lowest_price)}
            </span>
            {product.variants.length > 1 && (
              <span className="text-[10px] text-white/40"> / varian</span>
            )}
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-emerald-300">
            <ShoppingBag className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}