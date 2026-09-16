import Link from "next/link";
import type { ProductView } from "@/lib/store-types";
import ProductViewer from "./product-viewer";
import ProductSpecs from "./product-specs";
import ProductCard from "./product-card";
import BackButton from "./back-button";
import { getRelatedProducts } from "@/lib/store-data";

export default function ProductDetail({ product }: { product: ProductView }) {
  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 text-white">
      {/* Breadcrumb */}
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-6 lg:px-14">
        <BackButton
          href={`/products?collection=${product.collection.slug}`}
          label={`Kembali ke ${product.collection.name}`}
        />
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-white/40">
          <span>Katalog</span>
          <span className="text-white/20">/</span>
          <span className="text-emerald-400">{product.collection.name}</span>
        </nav>
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
            className="text-xs uppercase tracking-wider text-white/50 transition hover:text-emerald-400"
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