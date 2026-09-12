export type Collection = {
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  styleAttributes: string;
  accent: string;
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
    accent: "bg-amber-400",
    image:
      "https://i.pinimg.com/1200x/99/1f/6c/991f6ce9640c86d45ebaa41c0f94d26e.jpg",
  },
  {
    code: "COAST",
    slug: "coast",
    name: "Coast",
    tagline: "Catch the horizon",
    description: "Terinspirasi pantai & laut. Santai, segar, penuh warna.",
    styleAttributes: "Relaxed, Fresh, Colorful",
    accent: "bg-cyan-400",
    image:
      "https://i.pinimg.com/1200x/e2/59/4c/e2594ccc3a04fc8be84a072aa1d8a893.jpg",
  },
  {
    code: "METRO",
    slug: "metro",
    name: "Metro",
    tagline: "Own the streets",
    description: "Gaya urban & kota. Clean, modern, streetwear.",
    styleAttributes: "Clean, Modern, Streetwear",
    accent: "bg-violet-400",
    image:
      "https://i.pinimg.com/1200x/12/84/44/1284442243125ec2955705e030c6b317.jpg",
  },
  {
    code: "DUNE",
    slug: "dune",
    name: "Dune",
    tagline: "Wander the wild",
    description: "Tema gurun & travel. Earthy, vintage, oversized.",
    styleAttributes: "Earthy, Vintage, Oversized",
    accent: "bg-orange-400",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=900&auto=format&fit=crop",
  },
  {
    code: "TRAIL",
    slug: "trail",
    name: "Trail",
    tagline: "Built for the outdoors",
    description: "Untuk outdoor & camping. Fungsional dan tangguh.",
    styleAttributes: "Functional, Outdoorsy",
    accent: "bg-lime-400",
    image:
      "https://i.pinimg.com/1200x/39/8f/38/398f382a71a8dbaf72343c24d7b0b368.jpg",
  },
  {
    code: "TIDE",
    slug: "tide",
    name: "Tide",
    tagline: "Ride every wave",
    description: "Untuk olahraga air. Teknis dan performa tinggi.",
    styleAttributes: "Technical, Performance",
    accent: "bg-sky-400",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop",
  },
  {
    code: "APEX",
    slug: "apex",
    name: "Apex",
    tagline: "Speed redefined",
    description: "Terinspirasi motorsport & kecepatan. Aerodinamis, futuristik.",
    styleAttributes: "Aerodynamic, Futuristic",
    accent: "bg-rose-400",
    image:
      "https://i.pinimg.com/1200x/82/e8/cd/82e8cda735240752bac4365a6efb9e3c.jpg",
  },
  {
    code: "NOIR",
    slug: "noir",
    name: "Noir",
    tagline: "Embrace the night",
    description: "Gaya malam hari & fashion. Misterius, premium, bold.",
    styleAttributes: "Mysterious, Premium, Bold",
    accent: "bg-stone-400",
    image:
      "https://i.pinimg.com/736x/a2/db/ff/a2dbffc400354b96e4f9675885985848.jpg",
  },
  {
    code: "NOMAD",
    slug: "nomad",
    name: "Nomad",
    tagline: "Wherever you roam",
    description: "Travel serbaguna. Versatile dan timeless.",
    styleAttributes: "Versatile, Timeless",
    accent: "bg-teal-400",
    image:
      "https://i.pinimg.com/736x/81/bf/c3/81bfc39a84f88d1bc6f00daad5d485a9.jpg",
  },
 {
  code: "SOLAR",
  slug: "solar",
  name: "Solar",
  tagline: "Everyday essential",
  description: "Lifestyle harian. Minimal dan mudah dipakai setiap saat.",
  styleAttributes: "Minimal, Daily Wear",
  accent: "bg-yellow-400",
  image: "https://i.pinimg.com/1200x/2c/30/cd/2c30cd3028d1c22afdbe58f51b033aab.jpgs",
}
];
