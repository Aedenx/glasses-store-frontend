"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Layers, Moon, Compass, Sun } from "lucide-react";

const categories = [
  { slug: "", label: "All Frames", icon: Layers },
  { slug: "solar", label: "Solar Outdoor", icon: Sun },
  { slug: "noir", label: "Noir Classic", icon: Moon },
  { slug: "nomad", label: "Digital Nomad", icon: Compass },
];

export default function CategoryFilter({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = searchParams.get("collection") ?? "";

  const select = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    for (const key of [
      "collection",
      "material",
      "shape",
      "lens",
      "polarized",
      "gender",
    ]) {
      next.delete(key);
    }
    if (slug) next.set("collection", slug);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
        Kategori
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {categories.map((category) => {
          const isActive = active === category.slug;
          const Icon = category.icon;
          return (
            <button
              key={category.label}
              onClick={() => select(category.slug)}
              className={`group relative flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition duration-300 ${
                isActive
                  ? "border-emerald-400/80 bg-emerald-400/15 text-emerald-300"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-emerald-400/40 hover:bg-emerald-400/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition ${
                  isActive ? "text-emerald-400" : "text-white/40 group-hover:text-emerald-400/70"
                }`}
              />
              {category.label}
              <span
                className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-black ${
                  isActive
                    ? "bg-emerald-400 text-black"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {counts[category.slug] ?? 0}
              </span>
              <span
                className={`absolute -bottom-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-emerald-400 transition duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}