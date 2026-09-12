import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import ProductViewer from "./product-viewer";
import ProductSpecs from "./product-specs";
import ProductCard from "./product-card";
import { getRelatedProducts } from "@/lib/store-data";

export default function ProductDetail({ product }: { product: ProductView }) {
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
        <ProductViewer product={product} />
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