import Header from "@/components/header";
import HeroBanner from "@/components/hero-banner";
import CategorySlider from "@/components/category-slider";
import CollectionGrid from "@/components/collection-grid";
import Lookbook from "@/components/lookbook";
import Features from "@/components/features";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111213]">

      <Header />

      <HeroBanner />

      <CategorySlider />

      <section id="collections" className="bg-[#121212]">
        <CollectionGrid />
      </section>

      <Lookbook />

      <Features />

      <Footer />

    </main>
  );
}
