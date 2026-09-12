export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-[radial-gradient(circle_at_top,#9da3a8_0%,#505458_100%)] px-6 pb-10 pt-32 text-white lg:px-14"
    >

      <div className="grid min-h-[80vh] items-center gap-10 lg:grid-cols-3">

        {/* LEFT */}
        <div className="max-w-md">

          <div className="mb-6 flex gap-2">

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20">
              ←
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20">
              →
            </button>

          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-2px] md:text-6xl">
            See Clear
            <br />
            Live Bold
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/75">
            Bukan sekadar pelindung mata. Ini adalah tentang
            mengekspresikan karakter unik Anda. Dirancang dengan
            frame titanium ultra-ringan dan lensa polarized
            anti-UV premium.
          </p>

          <a
            href="#lookbook"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-wide text-black transition hover:-translate-y-1"
          >
            Lihat Pemakaian
            <span>↓</span>
          </a>

        </div>


        {/* CENTER */}
        <div className="flex flex-col items-center justify-center">

          <div className="relative w-full max-w-xl">

            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"
              alt="Kacamata Premium"
              className="w-full drop-shadow-[0_30px_25px_rgba(0,0,0,0.4)] transition duration-500 hover:scale-105"
            />

          </div>

          <p className="mt-6 text-center text-sm uppercase tracking-[2px] text-white/60">
            Kejelasan pandangan, terbungkus gaya.
          </p>

        </div>


        {/* RIGHT */}
        <div className="flex flex-row items-center justify-between gap-8 lg:flex-col lg:items-end">

          {/* PRICE */}
          <div className="text-left lg:text-right">

            <span className="block text-3xl font-extrabold">
              Rp 1.499k
            </span>

            <span className="block text-xl text-white/40 line-through">
              Rp 1.999k
            </span>

          </div>


          {/* SIZE */}
          <div>

            <span className="mb-3 block text-xs uppercase tracking-wide text-white/70">
              Ukuran Frame
            </span>

            <div className="flex gap-2">

              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                S
              </button>

              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm font-semibold">
                M
              </button>

              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm font-semibold">
                L
              </button>

            </div>

          </div>


          {/* THUMBNAIL */}
          <div className="hidden h-20 w-20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 lg:block">

            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300&auto=format&fit=crop"
              alt="Varian Kacamata"
              className="h-full w-full object-cover"
            />

          </div>

        </div>

      </div>


      {/* SCROLL */}
      <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[2px] text-white/50">
        ↓ Scroll untuk eksplorasi Lookbook
      </div>

    </section>
  );
}