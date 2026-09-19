import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDVision - Outdoor & Urban Eyewear",
  description: "High-quality, polarized, UV400 outdoor/urban eyewear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <CartProvider>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}