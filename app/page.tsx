"use client";

import DashboardHero from "@/components/home/dashboard-hero";
import HeroSlider from "@/components/layout/hero-slider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white space-y-8 pb-12">
      {/* Banner Utama */}
      <DashboardHero />

      {/* Slider Gambar */}
      <HeroSlider />
    </main>
  );
}