import { Suspense } from "react";
import { ArrowLeft, PackageSearch } from "lucide-react";
import Link from "next/link";
import type { ProductView } from "@/lib/store-types";
import Navbar from "./navbar";
import ProductCard from "./product-card";
import FiltersSidebar from "./filters-sidebar";
import SortSelect from "./sort-select";

export default function ProductsCatalog({
  products,
  query,
}: {
  products: ProductView[];
  query?: string;
}) {
  return (
    <main className="min-h-screen bg-[#111213] text-white">
      <Navbar />

      <section className="px-6 py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[3px] text-white/40">
                Home / Products
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-400/20 hover:text-emerald-200 hover:shadow-lg hover:shadow-emerald-400/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              Katalog Kacamata
            </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
            Temukan frame yang cocok dengan gaya hidupmu — filter berdasarkan
            material, bentuk frame, tipe lensa, polarized, dan gender target.
          </p>

          {query && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs text-emerald-300">
              Hasil untuk “{query}”
            </span>
          )}
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar (client) */}
          <div className="lg:w-72 lg:shrink-0">
            <Suspense fallback={<p className="text-xs text-white/40">Memuat filter…</p>}>
              <FiltersSidebar />
            </Suspense>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-white/40">
                {products.length} produk ditemukan
              </p>
              <Suspense fallback={null}>
                <SortSelect />
              </Suspense>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] py-24 text-center">
                <PackageSearch className="h-10 w-10 text-white/30" />
                <p className="text-sm text-white/60">
                  Tidak ada produk yang cocok dengan filter ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </section>
    </main>
  );
}