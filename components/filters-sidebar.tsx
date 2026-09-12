"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { frameMaterials, frameShapes, lensTypes, collections } from "@/lib/store-data";

type ParamKey =
  | "material"
  | "shape"
  | "lens"
  | "polarized"
  | "gender"
  | "collection"
  | "sort";

const genders = ["Men", "Women", "Unisex", "Kids"];

function toggleValue(
  current: URLSearchParams,
  key: ParamKey,
  value: string
): string {
  const next = new URLSearchParams(current);
  if (next.get(key) === value) {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  return next.toString();
}

export default function FiltersSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const apply = (query: string) => {
    router.push(`${pathname}?${query}`);
  };

  const activeCount = [
    "material",
    "shape",
    "lens",
    "polarized",
    "gender",
    "collection",
  ].filter((key) => (searchParams.get(key) ?? "") !== "").length;

  const toggle = (key: ParamKey, value: string) =>
    apply(toggleValue(searchParams, key, value));

  const clearAll = () =>
    apply(new URLSearchParams({ sort: searchParams.get("sort") ?? "" }).toString());

  return (
    <div className="space-y-6 text-white">
      <div className="mb-6 lg:hidden">
        <details className="group">
          <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest">
            <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
            Filter ({activeCount})
            <ChevronDown className="ml-auto h-4 w-4 text-white/40 transition group-open:rotate-180" />
          </summary>
          <div className="mt-5 space-y-6">
            <FilterGroups searchParams={searchParams} toggle={toggle} />
          </div>
        </details>
      </div>

      <div className="hidden space-y-6 lg:block">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
            Filter
          </span>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-[11px] text-white/50 transition hover:text-emerald-300"
            >
              <RotateCcw className="h-3 w-3" /> Hapus ({activeCount})
            </button>
          )}
        </div>
        <FilterGroups searchParams={searchParams} toggle={toggle} />
      </div>
    </div>
  );
}

function FilterGroups({
  searchParams,
  toggle,
}: {
  searchParams: URLSearchParams;
  toggle: (key: ParamKey, value: string) => void;
}) {
  return (
    <>
      <FilterGroup title="Koleksi">
        {collections.map((c) => (
          <FilterOption
            key={c.slug}
            label={c.name}
            active={searchParams.get("collection") === c.slug}
            onClick={() => toggle("collection", c.slug)}
            dotClass={c.accent}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Material Frame">
        {frameMaterials.map((m) => (
          <FilterOption
            key={m.id}
            label={m.name}
            active={searchParams.get("material") === String(m.id)}
            onClick={() => toggle("material", String(m.id))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Bentuk Frame">
        {frameShapes.map((s) => (
          <FilterOption
            key={s.id}
            label={s.name}
            active={searchParams.get("shape") === String(s.id)}
            onClick={() => toggle("shape", String(s.id))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tipe Lensa">
        {lensTypes.map((l) => (
          <FilterOption
            key={l.id}
            label={l.name}
            active={searchParams.get("lens") === String(l.id)}
            onClick={() => toggle("lens", String(l.id))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Polarized">
        <FilterOption
          label="Ya, hanya polarized"
          active={searchParams.get("polarized") === "1"}
          onClick={() => toggle("polarized", "1")}
        />
      </FilterGroup>

      <FilterGroup title="Gender Target">
        {genders.map((g) => (
          <FilterOption
            key={g}
            label={g}
            active={searchParams.get("gender") === g}
            onClick={() => toggle("gender", g)}
          />
        ))}
      </FilterGroup>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/40">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterOption({
  label,
  active,
  onClick,
  dotClass,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dotClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition ${
        active
          ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
          : "border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white"
      }`}
    >
      {dotClass && (
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      )}
      {label}
      {active && <Check className="h-3 w-3" />}
    </button>
  );
}