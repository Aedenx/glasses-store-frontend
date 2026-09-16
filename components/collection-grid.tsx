"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Layers,
  Mountain,
  Waves,
  Zap,
} from "lucide-react";
import { collections } from "./collections-data";
import { getProductViews } from "@/lib/store-data";

type ActivityKey = "all" | "mountain" | "water" | "urban" | "speed";

const ACTIVITIES: {
  key: ActivityKey;
  label: string;
  icon: typeof Mountain;
}[] = [
  { key: "all", label: "Semua Aktivitas", icon: Layers },
  { key: "mountain", label: "Mountain & Hiking", icon: Mountain },
  { key: "water", label: "Water & Beach", icon: Waves },
  { key: "urban", label: "Urban & Lifestyle", icon: Building2 },
  { key: "speed", label: "Speed & Motorsport", icon: Zap },
];

const ACTIVITY_MAP: Record<string, ActivityKey> = {
  summit: "mountain",
  coast: "water",
  metro: "urban",
  dune: "mountain",
  trail: "mountain",
  tide: "water",
  apex: "speed",
  noir: "urban",
  nomad: "urban",
  solar: "urban",
};

const ACTIVITY_LABEL: Record<ActivityKey, string> = {
  all: "ALL",
  mountain: "MOUNTAIN",
  water: "WATER",
  urban: "URBAN",
  speed: "MOTORSPORT",
};

const allViews = getProductViews();

const collectionSpecs: Record<string, string[]> = Object.fromEntries(
  collections.map((c) => {
    const prods = allViews.filter((p) => p.collection.slug === c.slug);
    const specs: string[] = [];
    if (prods.some((p) => p.is_polarized)) specs.push("POLARIZED");
    specs.push("UV400");
    const mat = [...new Set(prods.map((p) => p.material.name))];
    if (mat.length > 0) specs.push(mat[0].toUpperCase());
    return [c.slug, specs.slice(0, 3)];
  }),
);

export default function CollectionGrid() {
  const [active, setActive] = useState<ActivityKey>("all");

  const filtered =
    active === "all"
      ? collections
      : collections.filter((c) => ACTIVITY_MAP[c.slug] === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-white lg:px-14">
      {/* ── Section Header ── */}
      <div className="mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-400">
          Explore by Activity / Terrain
        </span>
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Pilih Berdasarkan
          <br />
          Aktivitas
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
          Dari puncak gunung sampai jalanan kota — pilih koleksi yang sesuai
          dengan aktivitas outdoor kamu.
        </p>
      </div>

      {/* ── Activity Filter Tabs ── */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {ACTIVITIES.map((a) => {
          const isActive = active === a.key;
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              onClick={() => setActive(a.key)}
              className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition duration-300 ${
                isActive
                  ? "border-emerald-400/80 bg-emerald-400/15 text-emerald-300"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-emerald-400/40 hover:bg-emerald-400/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition ${isActive ? "text-emerald-400" : "text-white/40 group-hover:text-emerald-400/70"}`}
              />
              {a.label}
            </button>
          );
        })}
      </div>

      {/* ── Collection Grid ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {filtered.map((collection) => (
          <CollectionCard key={collection.code} collection={collection} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Collection Card — Eiger Outdoor Style
   ───────────────────────────────────────────── */

function CollectionCard({
  collection,
}: {
  collection: (typeof collections)[number];
}) {
  const activityKey = ACTIVITY_MAP[collection.slug] ?? "all";
  const specs = collectionSpecs[collection.slug] ?? [];

  return (
    <Link
      href={`/products?collection=${collection.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 transition duration-500 hover:border-emerald-500/50 hover:shadow-[0_24px_48px_-24px_rgba(16,185,129,0.4)]"
    >
      {/* Image */}
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* ── Top Badge: Activity ── */}
      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[9px] font-black uppercase tracking-[2px] text-white backdrop-blur-xl">
        {collection.code}
        <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
        {ACTIVITY_LABEL[activityKey]}
      </span>

      {/* ── Bottom Content Panel ── */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {/* Tech-spec micro badges */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {specs.map((spec) => (
            <span
              key={spec}
              className="rounded border border-emerald-500/30 bg-black/70 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-400"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Emerald accent line */}
        <span className="mb-2 block h-1 w-8 rounded-full bg-emerald-400 transition-all duration-500 group-hover:w-full" />

        <span className="text-[10px] uppercase tracking-[2px] text-white/60">
          {collection.tagline}
        </span>

        <h3 className="mt-1 text-xl font-bold uppercase tracking-wide transition duration-300 group-hover:tracking-widest">
          {collection.name}
        </h3>

        {/* Hover CTA — slides up from below */}
        <div className="mt-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black transition duration-200 hover:bg-emerald-400">
            Lihat Koleksi
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}