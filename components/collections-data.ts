export type Collection = {
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  styleAttributes: string;
  image: string;
};

// Gambar masih placeholder dari Unsplash — ganti field `image` masing-masing
// koleksi ke path lokal (misal "/images/collections/summit.jpg") begitu aset
// asli sudah tersedia di public/images/collections/.
export const collections: Collection[] = [
  {
    code: "SUMMIT",
    slug: "summit",
    name: "Summit",
    tagline: "Conquer every peak",
    description:
      "Untuk pendakian gunung & hiking. Rugged, sporty, lensa polarized.",
    styleAttributes: "Rugged, Sporty, Polarized",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "COAST",
    slug: "coast",
    name: "Coast",
    tagline: "Catch the horizon",
    description: "Terinspirasi pantai & laut. Santai, segar, penuh warna.",
    styleAttributes: "Relaxed, Fresh, Colorful",
    image:
      "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "METRO",
    slug: "metro",
    name: "Metro",
    tagline: "Own the streets",
    description: "Gaya urban & kota. Clean, modern, streetwear.",
    styleAttributes: "Clean, Modern, Streetwear",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "DUNE",
    slug: "dune",
    name: "Dune",
    tagline: "Wander the wild",
    description: "Tema gurun & travel. Earthy, vintage, oversized.",
    styleAttributes: "Earthy, Vintage, Oversized",
    image:
      "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "TRAIL",
    slug: "trail",
    name: "Trail",
    tagline: "Built for the outdoors",
    description: "Untuk outdoor & camping. Fungsional dan tangguh.",
    styleAttributes: "Functional, Outdoorsy",
    image:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "TIDE",
    slug: "tide",
    name: "Tide",
    tagline: "Ride every wave",
    description: "Untuk olahraga air. Teknis dan performa tinggi.",
    styleAttributes: "Technical, Performance",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "APEX",
    slug: "apex",
    name: "Apex",
    tagline: "Speed redefined",
    description: "Terinspirasi motorsport & kecepatan. Aerodinamis, futuristik.",
    styleAttributes: "Aerodynamic, Futuristic",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "NOIR",
    slug: "noir",
    name: "Noir",
    tagline: "Embrace the night",
    description: "Gaya malam hari & fashion. Misterius, premium, bold.",
    styleAttributes: "Mysterious, Premium, Bold",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "NOMAD",
    slug: "nomad",
    name: "Nomad",
    tagline: "Wherever you roam",
    description: "Travel serbaguna. Versatile dan timeless.",
    styleAttributes: "Versatile, Timeless",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop",
  },
  {
    code: "SOLAR",
    slug: "solar",
    name: "Solar",
    tagline: "Everyday essential",
    description: "Lifestyle harian. Minimal dan mudah dipakai setiap saat.",
    styleAttributes: "Minimal, Daily Wear",
    image:
      "https://images.unsplash.com/photo-1508296695146-3e58822566cd?q=80&w=800&auto=format&fit=crop",
  },
];
