"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { SortOption } from "@/lib/store-types";

const options: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Unggulan" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "name", label: "Nama A-Z" },
];

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = (searchParams.get("sort") as SortOption | null) ?? "featured";

  const onChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "featured") {
      next.delete("sort");
    } else {
      next.set("sort", value);
    }
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <label className="flex items-center gap-2">
      <span className="hidden text-xs uppercase tracking-wider text-white/40 sm:block">
        Urutkan
      </span>
      <span className="relative">
        <select
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-4 pr-10 text-xs font-semibold text-white outline-none transition focus:border-emerald-400/60"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-zinc-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
      </span>
    </label>
  );
}