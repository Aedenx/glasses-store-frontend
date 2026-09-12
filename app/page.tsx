import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import CollectionGrid from "@/components/collection-grid";
import Lookbook from "@/components/lookbook";
import Features from "@/components/features";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Navbar />

      <Hero />

      <CollectionGrid />

      <Lookbook />

      <Features />

      <Footer />

    </main>
  );
}