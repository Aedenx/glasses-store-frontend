import { Glasses, Layers, Ruler, ShieldCheck, Weight } from "lucide-react";
import type {
  FrameMaterial,
  FrameShape,
  LensType,
  ProductSpecification,
} from "@/lib/store-types";

export default function ProductSpecs({
  specification,
  material,
  shape,
  lensType,
}: {
  specification: ProductSpecification | null;
  material: FrameMaterial;
  shape: FrameShape;
  lensType: LensType;
}) {
  const dimensions = specification
    ? [
        { icon: Ruler, value: `${specification.lens_width_mm} mm`, label: "Lebar Lensa" },
        { icon: Layers, value: `${specification.bridge_width_mm} mm`, label: "Bridge" },
        { icon: Glasses, value: `${specification.temple_length_mm} mm`, label: "Temple" },
        { icon: Weight, value: `${specification.weight_grams} g`, label: "Berat Frame" },
      ]
    : [];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-14">
      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 md:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Spesifikasi Teknis
          </h2>
          <span className="rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            {specification?.uv_protection ?? "UV400"}
          </span>
        </div>

        {specification ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {dimensions.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <d.icon className="h-5 w-5 text-emerald-400" />
                <p className="mt-3 text-xl font-black">{d.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                  {d.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/50">
            Spesifikasi teknis belum tersedia untuk produk ini.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          <Chip icon={ShieldCheck} text={`UV ${lensType.uv_protection}`} />
          <Chip icon={Weight} text={material.name} />
          <Chip icon={Glasses} text={shape.name} />
          <Chip icon={Ruler} text={lensType.name} />
        </div>
      </div>
    </section>
  );
}

function Chip({ icon: Icon, text }: { icon: typeof Weight; text: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
      <Icon className="h-3.5 w-3.5 text-emerald-400" />
      {text}
    </span>
  );
}