"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Filter, ShoppingBag } from "lucide-react";
import { formatIDR } from "@/lib/store-types";
import type { ProductView } from "@/lib/store-types";
import { useCart } from "@/components/cart/cart-provider"; // <-- TAMBAHKAN BARIS INI

interface ProductsCatalogProps {
  products: ProductView[];
  query?: string;
}

const ITEMS_PER_PAGE = 8;

const categories = [
  { slug: "all", label: "Semua Kategori" },
  { slug: "summit", label: "Summit" },
  { slug: "coast", label: "Coast" },
  { slug: "solar", label: "Solar" },
  { slug: "trail", label: "Trail" },
  { slug: "dune", label: "Dune" },
  { slug: "tide", label: "Tide" },
  { slug: "apex", label: "Apex" },
  { slug: "noir", label: "Noir" },
  { slug: "nomad", label: "Nomad" },
];

export default function ProductsCatalog({
  products = [],
  query,
}: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const genderParam = searchParams.get("gender");

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category & gender from URL search params (Navbar clicks)
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
    } else {
      setSelectedCategory("all");
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Filter products based on search, category, and gender (Aman dari properti undefined)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p) return false;

      const q = searchQuery.toLowerCase();
      const pName = p.name?.toLowerCase() ?? "";
      const pDesc = p.description?.toLowerCase() ?? "";
      const colName = p.collection?.name?.toLowerCase() ?? "";

      // 1. Search matching
      const matchesSearch =
        !searchQuery ||
        pName.includes(q) ||
        pDesc.includes(q) ||
        colName.includes(q);

      // 2. Category matching
      const cat = selectedCategory.toLowerCase();
      const matchesCategory =
        selectedCategory === "all" ||
        colName.includes(cat) ||
        pName.includes(cat);

      // 3. Gender matching
      const g = genderParam ? genderParam.toLowerCase() : "";
      const matchesGender =
        !genderParam ||
        pName.includes(g) ||
        colName.includes(g);

      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [products, searchQuery, selectedCategory, genderParam]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <div className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
          Semua Produk
        </h1>
        <p className="mt-2 text-zinc-400">
          Jelajahi koleksi kacamata premium IDVISION
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter size={16} className="text-emerald-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat.slug
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 md:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Reset Filter Button */}
        {(selectedCategory !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-emerald-400 transition hover:border-emerald-500 hover:text-emerald-300"
          >
            <X size={16} />
            Reset Filter
          </button>
        )}
      </div>

      {/* Results Count */}
      <p className="mb-6 text-sm text-zinc-500">
        Menampilkan {startItem}-{endItem} dari {filteredProducts.length} produk
        {selectedCategory !== "all" && (
          <span className="ml-2 text-emerald-400">
            kategori &quot;{selectedCategory.toUpperCase()}&quot;
          </span>
        )}
      </p>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950">
          <Search size={48} className="mb-4 text-zinc-600" />
          <h3 className="text-lg font-bold text-white">Tidak ada produk ditemukan</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Coba pilih kategori lain atau reset kata kunci pencarian
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  currentPage === pageNum
                    ? "border-2 border-emerald-500 bg-emerald-500 text-black"
                    : "border border-zinc-700 bg-zinc-800 text-white hover:border-emerald-500 hover:bg-emerald-500 hover:text-black"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex h-10 items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 text-sm font-bold text-white transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
function ProductCard({ product }: { product: ProductView }) {
  const { addToCart } = useCart();

  const imageUrl =
    product.primary_image ||
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop";

  const price = product.lowest_price || product.base_price;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.product_id.toString(),
      name: product.name,
      price: price,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/80 bg-[#111213] p-2.5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
      <Link href={`/products/${product.slug}`} className="block flex-1">
        <div className="relative h-36 w-full overflow-hidden rounded-lg bg-zinc-900 md:h-40">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.collection && (
            <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              {product.collection.name}
            </span>
          )}
        </div>

        <div className="mt-2.5 px-1">
          <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-extrabold text-emerald-400">
            {formatIDR(price)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="relative z-30 mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-[11px] font-extrabold uppercase tracking-wider text-black transition hover:bg-emerald-400 active:scale-95 cursor-pointer"
      >
        <ShoppingBag size={13} />
        <span>+ Keranjang</span>
      </button>
    </div>
  );
}