"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { getProductViewBySlug } from "@/lib/store-data";
import { formatIDR } from "@/lib/store-types";
import { useCart } from "@/components/cart/cart-provider";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const product = getProductViewBySlug(slug);
  const { addToCart } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold uppercase">Produk Tidak Ditemukan</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Produk yang Anda cari mungkin sudah tidak tersedia.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-emerald-400"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants?.[selectedVariantIndex] || {
    price: product.base_price,
    variant_id: 1,
    frame_color: "Hitam",
    lens_color: "Smoke",
  };

  const currentPrice = selectedVariant.price || product.base_price;
  const imageUrl =
    product.primary_image ||
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800";

  const handleBuyNow = () => {
    addToCart({
      id: product.product_id.toString(),
      name: `${product.name} (${selectedVariant.frame_color} / ${selectedVariant.lens_color})`,
      price: currentPrice,
      image: imageUrl,
      quantity: 1,
    });
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.product_id.toString(),
      name: `${product.name} (${selectedVariant.frame_color} / ${selectedVariant.lens_color})`,
      price: currentPrice,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav Back */}
      <div className="border-b border-zinc-800 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Gambar Produk */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              {product.collection && (
                <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
                  {product.collection.name}
                </div>
              )}
            </div>
          </div>

          {/* Details & Varian */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <Star size={14} fill="currentColor" className="text-amber-400" />
                  <span>5.0 (Review Pilihan)</span>
                </div>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-3 text-2xl font-extrabold text-emerald-400">
                  {formatIDR(currentPrice)}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
                {product.description ||
                  "Kacamata gaya IDVision dengan perlindungan maksimal dari sinar UV400 dan lensa polarized tahan benturan."}
              </p>

              {/* Varian Warna */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Pilih Varian Frame & Lensa:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.variant_id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                          selectedVariantIndex === idx
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        {v.frame_color} / {v.lens_color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fitur Keunggulan */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Proteksi UV400</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Truck size={16} className="text-emerald-400 shrink-0" />
                  <span>Bisa Kirim Se-Indonesia</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-zinc-800">
              <button
                onClick={handleBuyNow}
                className="w-full rounded-xl bg-emerald-500 py-3.5 text-xs font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-emerald-400 active:scale-95"
              >
                Beli Sekarang (Langsung Checkout)
              </button>
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-zinc-800 active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>+ Masukkan Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}