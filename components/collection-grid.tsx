import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "./collections-data";

export default function CollectionGrid() {
  return (
    <section
      id="collections"
      className="bg-[#111213] px-6 py-24 text-white lg:px-14"
    >
      {/* TITLE */}
      <div className="mb-16 text-center">
        <span className="text-xs uppercase tracking-[3px] text-white/40">
          Shop by Collection
        </span>

        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          10 Koleksi, 1 Karakter
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
          Dari puncak gunung sampai jalanan kota — setiap koleksi dirancang
          untuk gaya hidup dan aktivitas yang berbeda.
        </p>
      </div>

      {/* GRID */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {collections.map((collection) => (
          <CollectionCard key={collection.code} collection={collection} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
}: {
  collection: (typeof collections)[number];
}) {
  return (
    <Link
      href={`/products?collection=${collection.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 hover:-translate-y-1.5 hover:ring-white/30"
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* BADGE */}
      <span
        className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[2px] text-black shadow-lg ${collection.accent}`}
      >
        {collection.code}
      </span>

      {/* ARROW CTA */}
      <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 text-white" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <span
          className={`mb-2 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-full ${collection.accent}`}
        />

        <span className="text-[10px] uppercase tracking-[2px] text-white/60">
          {collection.tagline}
        </span>

        <h3 className="mt-1 text-lg font-bold uppercase tracking-wide transition group-hover:tracking-widest">
          {collection.name}
        </h3>
      </div>
    </Link>
  );
}