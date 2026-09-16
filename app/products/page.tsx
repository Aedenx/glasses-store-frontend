import ProductsCatalog from "@/components/products-catalog";
import { getProductViews, queryProducts } from "@/lib/store-data";
import type { ProductFilters, SortOption } from "@/lib/store-types";

const SORTS: SortOption[] = ["featured", "price-asc", "price-desc", "name"];

function first(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const filters: ProductFilters = {
    material: first(sp.material),
    shape: first(sp.shape),
    lens: first(sp.lens),
    polarized: first(sp.polarized),
    gender: first(sp.gender),
    collection: first(sp.collection),
    q: first(sp.q),
    sort: undefined,
  };

  const sort = first(sp.sort);
  if (sort && SORTS.includes(sort as SortOption)) {
    filters.sort = sort as SortOption;
  }

  const products = queryProducts(filters);

  const categoryCounts = {
    all: getProductViews().length,
    solar: queryProducts({ collection: "solar" }).length,
    noir: queryProducts({ collection: "noir" }).length,
    nomad: queryProducts({ collection: "nomad" }).length,
  };

  return (
    <ProductsCatalog
      products={products}
      query={filters.q}
      categoryCounts={categoryCounts}
    />
  );
}