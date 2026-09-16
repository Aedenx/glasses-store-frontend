import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";

export default function ProductCard({ product }: { product: ProductView }) {
  return (
<Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-lg transition duration-500 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-emerald-500/20"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-xl">
          {product.collection.code}
        </span>

        {product.is_polarized && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 backdrop-blur-xl">
            <BadgeCheck className="h-3 w-3 text-emerald-400" /> Polarized
          </span>
        )}

        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
            {product.gender} · {product.lensType.name}
          </p>
          <h3 className="truncate text-base font-extrabold uppercase tracking-wide text-white">
            {product.name}
          </h3>
        </div>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/70">
            {product.material.name}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/70">
            {product.shape.name}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              Mulai dari
            </p>
            <span className="text-base font-black text-emerald-400">
              {formatIDR(product.lowest_price)}
            </span>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-emerald-400">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}