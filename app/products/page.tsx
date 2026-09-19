"use client";

import { Suspense } from "react";
import ProductsCatalog from "@/components/product/products-catalog";
import { queryProducts } from "@/lib/store-data";

export default function ProductsPage() {
  const allProducts = queryProducts({});

  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-8">Loading katalog...</div>}>
      <ProductsCatalog products={allProducts} />
    </Suspense>
  );
}