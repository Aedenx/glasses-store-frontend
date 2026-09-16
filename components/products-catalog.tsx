import { Suspense } from "react";
import { PackageSearch } from "lucide-react";
import type { ProductView } from "@/lib/store-types";
import ProductCard from "./product-card";
import FiltersSidebar from "./filters-sidebar";
import SortSelect from "./sort-select";
import CategoryFilter from "./category-filter";
import BackButton from "./back-button";
import ScrollToTop from "./scroll-to-top";

export default function ProductsCatalog({
  products,
  query,
  categoryCounts = {},
}: {
  products: ProductView[];
  query?: string;
  categoryCounts?: Record<string, number>;
}) {
  return (
    <section className="min-h-screen bg-[#0d0d0d] px-6 pb-6 pt-4 text-white lg:px-14">
      <div className="mx-auto max-w-7xl">
        <ScrollToTop />

        {/* Breadcrumb / Back */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <BackButton href="/" label="Beranda" />
          <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-white/40">
            <span>Beranda</span>
            <span className="text-white/20">/</span>
            <span className="text-emerald-400">Katalog Produk</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-4 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-400">
            Outdoor Eyewear · Built for Higher Ground
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight md:text-3xl">
            Katalog Kacamata
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/60">
            Temukan frame yang cocok dengan gaya hidupmu — filter berdasarkan
            material, bentuk frame, tipe lensa, polarized, dan gender target.
          </p>

          {query && (
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              Hasil untuk “{query}”
            </span>
          )}
        </div>

        {/* Category quick-filter bar */}
        <div className="mb-4">
          <Suspense
            fallback={
              <p className="text-xs text-white/40">Memuat kategori…</p>
            }
          >
            <CategoryFilter counts={categoryCounts} />
          </Suspense>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Sidebar (client) */}
          <div className="lg:w-72 lg:shrink-0">
            <Suspense
              fallback={<p className="text-xs text-white/40">Memuat filter…</p>}
            >
              <FiltersSidebar />
            </Suspense>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-3 flex items-center justify-between gap-4">
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
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}