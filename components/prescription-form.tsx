"use client";

import { Eye } from "lucide-react";
import type { Prescription } from "@/lib/store-types";

const EMPTY: Prescription = {
  sphere_od: 0,
  cylinder_od: 0,
  axis_od: 0,
  sphere_os: 0,
  cylinder_os: 0,
  axis_os: 0,
  pd_mm: 62,
};

export default function PrescriptionForm({
  value,
  onChange,
  disabled = false,
}: {
  value: Prescription | null;
  onChange: (value: Prescription | null) => void;
  disabled?: boolean;
}) {
  const enabled = value !== null;

  const toggle = (next: boolean) => onChange(next ? { ...EMPTY } : null);

  if (disabled) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-sm text-white/50">
        Produk ini belum mendukung lensa resep (minus/silinder).
      </div>
    );
  }

  const setField = (field: keyof Prescription, fieldValue: number) => {
    if (!value) return;
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
      <button
        type="button"
        onClick={() => toggle(!enabled)}
        className="flex w-full items-center justify-between gap-3"
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-white">
          <Eye className="h-4 w-4 text-emerald-400" />
          Gunakan Resep Mata (Minus/Silinder)
        </span>
        <span
          role="switch"
          aria-checked={enabled}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled ? "bg-emerald-500" : "bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
              enabled ? "left-[22px]" : "left-0.5"
            }`}
          />
        </span>
      </button>

      {enabled && value && (
        <div className="mt-5 space-y-4">
          <RxEye
            label="OD — Mata Kanan (Right Eye)"
            values={{ sphere: value.sphere_od, cylinder: value.cylinder_od, axis: value.axis_od }}
            onChange={(field, v) =>
              setField(field === "sphere" ? "sphere_od" : field === "cylinder" ? "cylinder_od" : "axis_od", v)
            }
          />
          <RxEye
            label="OS — Mata Kiri (Left Eye)"
            values={{ sphere: value.sphere_os, cylinder: value.cylinder_os, axis: value.axis_os }}
            onChange={(field, v) =>
              setField(field === "sphere" ? "sphere_os" : field === "cylinder" ? "cylinder_os" : "axis_os", v)
            }
          />

          <p className="text-[11px] leading-5 text-white/40">
            Jumlah lensa pada OD/OS akan dipakai sebagai snapshot varian saat
            dimasukkan ke keranjang.
          </p>
        </div>
      )}
    </div>
  );
}

function RxEye({
  label,
  values,
  onChange,
}: {
  label: string;
  values: { sphere: number; cylinder: number; axis: number };
  onChange: (field: "sphere" | "cylinder" | "axis", value: number) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/60">
        {label}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <RxField
          label="Sphere"
          step={0.25}
          min={-10}
          max={6}
          value={values.sphere}
          onChange={(v) => onChange("sphere", v)}
        />
        <RxField
          label="Cylinder"
          step={0.25}
          min={-6}
          max={0}
          value={values.cylinder}
          onChange={(v) => onChange("cylinder", v)}
        />
        <RxField
          label="Axis"
          step={1}
          min={0}
          max={180}
          value={values.axis}
          onChange={(v) => onChange("axis", v)}
        />
      </div>
    </div>
  );
}

function RxField({
  label,
  step,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  step: number;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2.5 text-center text-sm text-white outline-none transition focus:border-emerald-400/60"
      />
    </label>
  );
}