import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { getProductViewBySlug, products } from "@/lib/store-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductViewBySlug(slug);

  if (!product || !product.is_active) {
    notFound();
  }

  return <ProductDetail product={product} />;
}