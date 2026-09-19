"use client";

import { useState } from "react";
import { MapPin, Phone, Search } from "lucide-react";

const stores = [
  {
    id: 1,
    city: "Magelang",
    address: "Jl. Pahlawan No. 15, Magelang, Jawa Tengah 56111",
    phone: "+62 274-888123",
    whatsapp: "+62 812-3456-7890",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600",
    description: "Cabang Magelang menawarkan koleksi kacamata terlengkap di kota Magelang.",
    mapUrl: "https://maps.google.com/maps?q=Magelang&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 2,
    city: "Solo",
    address: "Jl. Slamet Riyadi No. 45, Solo, Jawa Tengah 57132",
    phone: "+62 271-999456",
    whatsapp: "+62 813-9876-5432",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    description: "Cabang Solo terletak di pusat perbelanjaan dengan akses mudah.",
    mapUrl: "https://maps.google.com/maps?q=Surakarta&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 3,
    city: "Lampung",
    address: "Jl. A. Yani No. 102, Bandar Lampung, Lampung 35123",
    phone: "+62 721-888789",
    whatsapp: "+62 815-5555-4444",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600",
    description: "Cabang Lampung memberikan pelayanan terbaik kami di Provinsi Lampung.",
    mapUrl: "https://maps.google.com/maps?q=Bandar%20Lampung&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
];

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeStore, setActiveStore] = useState(stores[0]);

  const filteredStores = stores.filter((store) => {
    const matchesCity = selectedCity === "all" || store.city === selectedCity;
    const matchesSearch =
      !searchQuery ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Halaman */}
      <header className="border-b border-zinc-800 px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">
            Store Locations
          </h1>
          <span className="text-sm text-zinc-400">
            Total Cabang: {filteredStores.length}
          </span>
        </div>
      </header>

      {/* Main Content 2 Kolom */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Kolom Kiri: Filters & Cards */}
          <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-5">
            {/* Filter Search & Select */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari lokasi..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-sm placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">Semua Kota</option>
                <option value="Magelang">Magelang</option>
                <option value="Solo">Solo</option>
                <option value="Lampung">Lampung</option>
              </select>
            </div>

            {/* List Store (Scrollable) */}
            <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => setActiveStore(store)}
                  className={`cursor-pointer overflow-hidden rounded-xl border bg-zinc-900/50 transition-all ${
                    activeStore.id === store.id
                      ? "border-emerald-500 ring-1 ring-emerald-500"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-32 bg-zinc-800 sm:w-36 shrink-0">
                      <img
                        src={store.image}
                        alt={store.city}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4">
                      <div>
                        <h3 className="font-bold text-white">{store.city}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{store.address}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs">
                        <a
                          href={`tel:${store.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-1 text-emerald-400 hover:underline"
                        >
                          <Phone size={14} /> {store.phone}
                        </a>
                        <a
                          href={`https://wa.me/${store.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-emerald-400 hover:underline"
                        >
                          <MapPin size={14} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Google Maps View */}
              <div className="sticky top-20 h-[360px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl md:h-[420px] lg:col-span-6 lg:h-[480px] xl:col-span-7">
  <iframe
    title="Store Location Map"
    src={activeStore.mapUrl}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={false}
    loading="lazy"
    className="h-full w-full rounded-2xl"
  />
      </div>

        </div>
      </main>
    </div>
  );
}