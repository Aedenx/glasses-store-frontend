import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { collections, queryProducts } from "@/lib/store-data";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  return {
    title: collection
      ? `${collection.name} - ID VISION`
      : "Koleksi - ID VISION",
    description: collection?.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const products = queryProducts({ collection: slug });

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] md:h-[520px]">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/50 to-black/30" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-14">
              <span className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-400">
                {collection.code} Collection
              </span>
              <h1 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-6xl">
                {collection.name}
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[2px] text-white/70">
                {collection.tagline}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                {collection.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40">
              {products.length} produk
            </p>
            <h2 className="mt-1 text-2xl font-bold uppercase tracking-tight md:text-3xl">
              Produk {collection.name}
            </h2>
          </div>
          <Link
            href={`/products?collection=${collection.slug}`}
            className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-emerald-300 transition duration-300 hover:bg-emerald-400 hover:text-black"
          >
            Lihat di Katalog
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}