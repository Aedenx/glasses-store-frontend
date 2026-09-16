import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import Hero from "@/components/hero";
import CollectionGrid from "@/components/collection-grid";
import Lookbook from "@/components/lookbook";
import Features from "@/components/features";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <HeroBanner />

      <Hero />

      <CollectionGrid />

      <Lookbook />

      <Features />

      <Footer />
    </main>
  );
}