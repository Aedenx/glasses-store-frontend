import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import { formatIDR } from "@/lib/store-types";
import ProductMedia from "./product-media";
import BuyBox from "./buybox";
import ProductSpecs from "./product-specs";
import ProductCard from "./product-card";
import { getRelatedProducts } from "@/lib/store-data";

export default function ProductDetail({ product }: { product: ProductView }) {
  const images = Array.from(
    new Set([product.image, product.collection.image])
  );

  const priceRange =
    product.variants.length > 1 &&
    product.variants.some((v) => v.price !== product.variants[0].price);

  return (
    <main className="min-h-screen bg-[#111213] pt-28 text-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 transition hover:text-emerald-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Katalog
        </Link>
      </div>

      {/* Product hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductMedia images={images} alt={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                {product.collection.code}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
                {product.gender}
              </span>
              {product.is_polarized && (
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                  <BadgeCheck className="h-3 w-3 text-emerald-400" />
                  Polarized
                </span>
              )}
              {product.is_prescription_available && (
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
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

            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-white/50">
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                {product.material.name}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                {product.shape.name}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                {product.lensType.name}
              </span>
              <span className="ml-auto text-white/30">SKU {product.sku}</span>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-300">
                  {formatIDR(product.lowest_price)}
                </span>
                {priceRange && (
                  <span className="text-sm text-white/40">
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

              <BuyBox product={product} />
            </div>
          </div>
        </div>
      </section>

      <ProductSpecs
        specification={product.specification}
        material={product.material}
        shape={product.shape}
        lensType={product.lensType}
      />

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Produk Serupa
          </h2>
          <Link
            href="/products"
            className="text-xs uppercase tracking-wider text-white/50 transition hover:text-emerald-300"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {getRelatedProducts(product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}