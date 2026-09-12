export default function Lookbook() {
  return (
    <section
      id="lookbook"
      className="bg-[#181a1b] px-6 py-24 text-white lg:px-14"
    >

      {/* TITLE */}
      <div className="mb-16 text-center">

        <span className="text-xs uppercase tracking-[3px] text-white/40">
          On-Person Experience
        </span>

        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          SERI SUMMIT
        </h2>

      </div>


      {/* FEATURED */}
      <div className="relative mx-auto mb-10 max-w-7xl overflow-hidden rounded-3xl">

        <div className="relative h-[70vh] w-full">

          <img
            src="/images/summit-model.jpg"
            alt="Foto Model Pakai Kacamata"
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#181a1b]/40 via-transparent to-[#181a1b]/90"></div>

          <div className="pointer-events-none absolute inset-0 mix-blend-color bg-[#181a1b]/30"></div>

          <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-[#2c2f31]/40 blur-3xl"></div>

        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-8 bg-gradient-to-t from-[#181a1b] via-[#181a1b]/70 to-transparent p-8 pt-32 lg:flex-row lg:items-end lg:p-14">

          <div className="max-w-xl">

            <h3 className="text-3xl font-bold">
              Kacamata Seri Gunung
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/70">
              Dirancang khusus untuk aktivitas outdoor ekstrem.
              Perlindungan maksimal dari paparan sinar UV serta
              ketahanan ekstra terhadap benturan dan cuaca.
            </p>

          </div>

          <button className="rounded-full bg-white px-7 py-4 text-xs font-bold uppercase text-black">
            Pesan Model Ini
          </button>

        </div>

      </div>


      {/* GALLERY */}
      <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">

        <GalleryCard
          image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
          title="Urban Outdoor Style"
          description="Lensa Tinted / Frame Gold"
        />

        <GalleryCard
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
          title="Minimalist Executive"
          description="Matte Black Frame"
        />

        <GalleryCard
          image="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
          title="Casual Daily Wear"
          description="Polarized Silver Edition"
        />

      </div>

    </section>
  );
}


function GalleryCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-[400px] overflow-hidden rounded-3xl">

      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">

        <h4 className="font-semibold">
          {title}
        </h4>

        <p className="mt-1 text-xs text-white/50">
          {description}
        </p>

      </div>

    </div>
  );
}