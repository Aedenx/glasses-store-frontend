import { ArrowRight, Mountain, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden bg-[#0d0f10] px-6 pb-16 pt-32 text-white lg:px-14"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop"
          alt="Pemandangan pegunungan"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f10]/80 via-[#0d0f10]/40 to-[#0d0f10]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(52,211,153,0.18),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[2px] text-white/70 backdrop-blur-xl">
            <Mountain className="h-3.5 w-3.5 text-emerald-400" />
            Outdoor Eyewear · Est. 2026
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-[-2px] md:text-7xl lg:text-8xl">
            Built for
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Higher Ground
            </span>
            <br />
            &amp; Bold Exploration
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/70 md:text-base">
            Kacamata outdoor yang dirancang untuk petualangan tinggi — frame
            titanium ultra-ringan, lensa polarized UV400, dan karakter yang
            siap menaklukkan peak mana pun.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition hover:-translate-y-1 hover:bg-emerald-300"
            >
              Explore Collections
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              UV400 Guarantee
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"
              alt="Kacamata outdoor premium"
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 lg:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <span className="text-[10px] uppercase tracking-[2px] text-white/60">
                  Summit Edition
                </span>
                <p className="mt-1 text-2xl font-bold">Rp 1.499k</p>
              </div>
              <span className="rounded-full bg-emerald-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black">
                Polarized
              </span>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -left-4 -top-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl lg:-left-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15">
              <Sparkles className="h-5 w-5 text-emerald-300" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">UV400</p>
              <p className="text-[10px] text-white/50">Full Protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / bottom strip */}
      <div className="relative z-10 mx-auto mt-16 grid w-full max-w-7xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
        {[
          ["10+", "Collections"],
          ["40g", "Ultra Ringan"],
          ["100%", "UV400 Guard"],
        ].map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-2xl font-black tracking-tight md:text-3xl">
              {value}
            </span>
            <span className="text-[10px] uppercase tracking-[2px] text-white/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}