const features = [
  {
    icon: "◈",
    title: "Perlindungan UV400",
    description:
      "Memblokir sinar UVA & UVB berbahaya untuk perlindungan mata maksimal.",
  },
  {
    icon: "✦",
    title: "Ultra Ringan",
    description:
      "Menggunakan material ringan untuk memberikan kenyamanan sepanjang hari.",
  },
  {
    icon: "◉",
    title: "Lensa Anti-Silau",
    description:
      "Teknologi polarized membantu mengurangi silau saat berkendara.",
  },
  {
    icon: "→",
    title: "Bebas Pengembalian",
    description:
      "Garansi tukar ukuran atau pengembalian sesuai kebijakan toko.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/5 bg-[#111213] px-6 py-20 text-white lg:px-14"
    >

      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
          >

            <div className="mb-8 text-2xl">
              {feature.icon}
            </div>

            <h3 className="font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/50">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}