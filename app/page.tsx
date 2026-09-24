"use client";

import DashboardHero from "@/components/home/dashboard-hero";
import RunningText from "@/components/home/running-text";
import HeroSlider from "@/components/layout/hero-slider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white space-y-8 pb-12">
      {/* Banner Utama */}
      <DashboardHero />

      {/* Running Text Marquee Standar E-Commerce */}
      <RunningText />

      {/* Slider Gambar */}
      <HeroSlider />
    </main>
  );
}
