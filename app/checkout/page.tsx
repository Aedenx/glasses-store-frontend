"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Tag,
  QrCode,
  Building2,
  Check,
  Gift,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatIDR } from "@/lib/store-types";

// Master Voucher dari Halaman Promo
interface VoucherRule {
  code: string;
  type: "percent" | "nominal" | "freebie";
  value: number; // Diskon % atau Potongan Rp
  freebieName?: string;
  description: string;
}

const PROMO_VOUCHERS: Record<string, VoucherRule> = {
  SUMMER30: {
    code: "SUMMER30",
    type: "percent",
    value: 30,
    description: "Diskon 30% Summer Outdoor Sale",
  },
  NEWVISION: {
    code: "NEWVISION",
    type: "nominal",
    value: 50000,
    description: "Potongan Rp 50.000 Member Baru",
  },
  FREECLEAN: {
    code: "FREECLEAN",
    type: "freebie",
    value: 0,
    freebieName: "1x Lens Cleaner Microfiber Eksklusif",
    description: "Free Gift Lens Cleaner Eksklusif",
  },
  SOLAR50: {
    code: "SOLAR50",
    type: "percent",
    value: 50,
    description: "Diskon 50% Flash Sale Solar Series",
  },
};

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"qris" | "bank_transfer">("qris");

  // State Voucher Promo
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherRule | null>(null);
  const [voucherError, setVoucherError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logika Klaim Kode Voucher
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError("");

    const codeUpper = voucherInput.trim().toUpperCase();
    if (PROMO_VOUCHERS[codeUpper]) {
      setAppliedVoucher(PROMO_VOUCHERS[codeUpper]);
      setVoucherInput("");
    } else {
      setVoucherError("Kode voucher tidak ditemukan atau tidak valid.");
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherError("");
  };

  // Hitung Potongan Diskon
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.type === "percent") {
      discountAmount = (totalPrice * appliedVoucher.value) / 100;
    } else if (appliedVoucher.type === "nominal") {
      discountAmount = Math.min(appliedVoucher.value, totalPrice);
    }
  }

  const finalTotal = Math.max(0, totalPrice - discountAmount);

  // Send Order to WhatsApp
  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Harap isi Nama Lengkap, Nomor WhatsApp, dan Alamat Pengiriman!");
      return;
    }

    const paymentText =
      paymentMethod === "qris"
        ? "QRIS (Scan Barcode)"
        : "Transfer Bank (BCA / Mandiri / BRI)";

    let message = `*PESANAN BARU - IDVISION EYEWEAR*\n`;
    message += `-----------------------------------\n`;
    message += `*Nama:* ${formData.name}\n`;
    message += `*No. WA:* ${formData.phone}\n`;
    message += `*Kota:* ${formData.city}\n`;
    message += `*Alamat:* ${formData.address}\n`;
    if (formData.notes) message += `*Catatan:* ${formData.notes}\n`;
    message += `*Metode Bayar:* ${paymentText}\n`;
    message += `-----------------------------------\n\n`;
    message += `*DAFTAR PESANAN:*\n`;

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} x${item.quantity} = ${formatIDR(
        item.price * item.quantity
      )}\n`;
    });

    message += `\n*Subtotal:* ${formatIDR(totalPrice)}\n`;

    if (appliedVoucher) {
      if (appliedVoucher.type === "freebie") {
        message += `*Voucher (${appliedVoucher.code}):* BONUS ${appliedVoucher.freebieName}\n`;
      } else {
        message += `*Voucher (${appliedVoucher.code}):* -${formatIDR(
          discountAmount
        )}\n`;
      }
    }

    message += `*TOTAL PEMBAYARAN:* ${formatIDR(finalTotal)}\n`;
    message += `-----------------------------------\n`;
    message += `Mohon instruksi pembayaran via ${paymentText}. Terima kasih!`;

    const myWhatsAppNumber = "6285877669323";
    const waUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(waUrl, "_blank");
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
        <ShoppingBag size={48} className="text-zinc-600 mb-4" />
        <h1 className="text-2xl font-bold uppercase">Keranjang Anda Kosong</h1>
        <p className="mt-2 text-xs text-zinc-400">
          Silakan pilih kacamata favorit Anda terlebih dahulu.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-emerald-400"
        >
          Lihat Katalog Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-zinc-800 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Lanjut Belanja
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
          Form Checkout Pesanan
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Form Pengiriman & Pembayaran */}
          <form
            onSubmit={handleCheckoutWhatsApp}
            className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:col-span-7"
          >
            {/* Section 1: Data Pengiriman */}
            <div className="space-y-4">
              <h2 className="text-base font-bold uppercase tracking-wider text-emerald-400">
                1. Data Pengiriman
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Muhammad Ikhwan"
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 085877669323"
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300">
                    Kota / Kabupaten *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Contoh: Magelang / Pamulang"
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300">
                    Alamat Lengkap *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nama jalan, RT/RW, nomor rumah"
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Pesan khusus untuk pengiriman..."
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: Pilih Metode Pembayaran */}
            <div className="space-y-3 border-t border-zinc-800/80 pt-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-emerald-400">
                2. Metode Pembayaran
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qris")}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    paymentMethod === "qris"
                      ? "border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <QrCode
                    size={22}
                    className={
                      paymentMethod === "qris" ? "text-emerald-400" : "text-zinc-500"
                    }
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-white">
                      <span>QRIS (Scan Barcode)</span>
                      {paymentMethod === "qris" && (
                        <Check size={14} className="text-emerald-400" />
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Gopay, OVO, Dana, ShopeePay, & Mobile Banking.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    paymentMethod === "bank_transfer"
                      ? "border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <Building2
                    size={22}
                    className={
                      paymentMethod === "bank_transfer"
                        ? "text-emerald-400"
                        : "text-zinc-500"
                    }
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-white">
                      <span>Transfer Bank</span>
                      {paymentMethod === "bank_transfer" && (
                        <Check size={14} className="text-emerald-400" />
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      BCA, Mandiri, BRI, atau Bank Lainnya.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-extrabold uppercase tracking-widest text-black transition hover:bg-emerald-400 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <MessageCircle size={18} />
              <span>Kirim Pesanan ke WhatsApp</span>
            </button>
          </form>

          {/* Section Samping: Ringkasan & Form Voucher Promo */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-emerald-400">
                Ringkasan Pesanan
              </h2>

              {/* Daftar Item */}
              <div className="mt-4 max-h-60 divide-y divide-zinc-800 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover bg-zinc-800 shrink-0 border border-zinc-800"
                    />
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        {item.quantity} x {formatIDR(item.price)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      {formatIDR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form Input Kode Voucher Promo */}
              <div className="mt-6 border-t border-zinc-800/80 pt-4">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  <Tag size={14} className="text-emerald-400" />
                  <span>Kode Voucher Promo</span>
                </label>

                {appliedVoucher ? (
                  <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3">
                    <div>
                      <p className="text-xs font-extrabold text-emerald-400">
                        Voucher {appliedVoucher.code} Aktif
                      </p>
                      <p className="text-[10px] text-zinc-300">
                        {appliedVoucher.type === "freebie"
                          ? `Free Gift: ${appliedVoucher.freebieName}`
                          : appliedVoucher.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveVoucher}
                      className="text-xs font-bold text-red-400 hover:text-red-300 underline"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="Masukkkan Kode Promo"
                      className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs uppercase text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-500 hover:text-black"
                    >
                      Pakai
                    </button>
                  </div>
                )}

                {voucherError && (
                  <p className="mt-1.5 text-[11px] font-semibold text-red-400">
                    {voucherError}
                  </p>
                )}

                {/* Rekomendasi Kode Promo */}
                <div className="mt-3 rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Kode Promo Tersedia (Halaman Promo):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(PROMO_VOUCHERS).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setVoucherInput(code);
                          setVoucherError("");
                        }}
                        className="rounded bg-zinc-900 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition border border-zinc-800"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rincian Subtotal & Diskon */}
              <div className="mt-6 border-t border-zinc-800 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatIDR(totalPrice)}</span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>
                      {appliedVoucher.type === "freebie"
                        ? "Bonus Gratis"
                        : `Diskon (${appliedVoucher.code})`}
                    </span>
                    <span>
                      {appliedVoucher.type === "freebie"
                        ? appliedVoucher.freebieName
                        : `-${formatIDR(discountAmount)}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between border-t border-zinc-800/80 pt-3 text-sm font-black text-white">
                  <span>Total Bayar</span>
                  <span className="text-emerald-400">{formatIDR(finalTotal)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-950 p-3 text-[11px] text-zinc-400">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Transaksi aman & langsung terhubung dengan admin resmi IDVision.</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}