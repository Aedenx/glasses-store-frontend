"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Receipt,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { cartItemKey, useCart } from "./cart-provider";
import { formatIDR } from "@/lib/store-types";
import type { Address, Prescription } from "@/lib/store-types";

const FREE_SHIPPING_THRESHOLD = 500000;

export default function CartDrawer() {
  const {
    items,
    isOpen,
    lastOrder,
    itemCount,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
  } = useCart();

  const [step, setStep] = useState<1 | 2>(1);

  const showOrderConfirmation =
    lastOrder !== null && items.length === 0 && isOpen;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <button
        aria-label="Tutup keranjang"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#111213] text-white shadow-2xl">
        {showOrderConfirmation && lastOrder ? (
          <OrderConfirmation order={lastOrder} onClose={closeCart} />
        ) : (
          <>
            <CartHeader
              count={itemCount}
              onClose={closeCart}
              step={step}
              onBack={() => setStep(1)}
            />

            {items.length === 0 ? (
              <EmptyCart onClose={closeCart} />
            ) : step === 1 ? (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {items.map((item) => (
                    <CartLine
                      key={cartItemKey(item)}
                      item={item}
                      onRemove={() => removeItem(cartItemKey(item))}
                      onUpdate={(qty) =>
                        updateQuantity(cartItemKey(item), qty)
                      }
                    />
                  ))}

                  <button
                    onClick={clearCart}
                    className="text-xs text-white/40 transition hover:text-rose-400"
                  >
                    Kosongkan keranjang
                  </button>
                </div>

                <TotalsPanel />

                <div className="border-t border-white/10 px-6 py-5">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-full bg-emerald-400 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-300"
                  >
                    Lanjut ke Alamat
                  </button>
                </div>
              </>
            ) : (
              <CheckoutForm onBack={() => setStep(1)} />
            )}
          </>
        )}
      </aside>
    </div>
  );
}

function CartHeader({
  count,
  onClose,
  step,
  onBack,
}: {
  count: number;
  onClose: () => void;
  step: 1 | 2;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
      <div className="flex items-center gap-3">
        {step === 2 ? (
          <button
            aria-label="Kembali"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <ShoppingBag className="h-5 w-5 text-emerald-400" />
        )}
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {step === 1 ? `Keranjang (${count})` : "Alamat Pengiriman"}
        </h2>
      </div>
      <button
        aria-label="Tutup"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
        <ShoppingBag className="h-7 w-7 text-white/40" />
      </span>
      <p className="text-sm text-white/60">
        Keranjangmu masih kosong. Yuk mulai eksplorasi koleksi kami!
      </p>
      <button
        onClick={onClose}
        className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-emerald-300"
      >
        Lihat Koleksi
      </button>
    </div>
  );
}

function CartLine({
  item,
  onRemove,
  onUpdate,
}: {
  item: {
    product_image: string;
    product_name: string;
    frame_color: string;
    lens_color: string;
    lens_type: string;
    unit_price: number;
    quantity: number;
    prescription: Prescription | null;
  };
  onRemove: () => void;
  onUpdate: (qty: number) => void;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.product_image}
          alt={item.product_name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{item.product_name}</h3>
          <button
            aria-label="Hapus item"
            onClick={onRemove}
            className="text-white/40 transition hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 text-[11px] text-white/50">
          {item.frame_color} · {item.lens_color} · {item.lens_type}
        </p>

        {item.prescription ? (
          <PrescriptionBadge text={`Resep: OD ${item.prescription.sphere_od} / OS ${item.prescription.sphere_os} · PD ${item.prescription.pd_mm}mm`} />
        ) : (
          <span className="mt-1 inline-flex rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
            Tanpa resep
          </span>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              aria-label="Kurangi"
              onClick={() => onUpdate(item.quantity - 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-xs font-semibold">
              {item.quantity}
            </span>
            <button
              aria-label="Tambah"
              onClick={() => onUpdate(item.quantity + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-bold">
            {formatIDR(item.unit_price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

function PrescriptionBadge({ text }: { text: string }) {
  return (
    <span className="mt-1 inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
      {text}
    </span>
  );
}

function TotalsPanel() {
  const { totals } = useCart();

  return (
    <div className="space-y-2 border-t border-white/10 bg-white/[0.02] px-6 py-5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-white/60">
          <Receipt className="h-4 w-4" /> Subtotal
        </span>
        <span className="font-semibold">
          {formatIDR(totals.subtotal_amount)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-white/60">
          <Truck className="h-4 w-4" /> Pengiriman
        </span>
        <span className="font-semibold">
          {totals.shipping_cost === 0 ? (
            <span className="text-emerald-400">Gratis</span>
          ) : (
            formatIDR(totals.shipping_cost)
          )}
        </span>
      </div>

      {totals.subtotal_amount > 0 &&
        totals.subtotal_amount < FREE_SHIPPING_THRESHOLD && (
          <p className="rounded-lg bg-white/5 px-3 py-2 text-[11px] text-white/50">
            Belanja {formatIDR(FREE_SHIPPING_THRESHOLD - totals.subtotal_amount)}{" "}
            lagi untuk gratis ongkir.
          </p>
        )}

      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-sm font-bold uppercase tracking-widest">Total</span>
        <span className="text-lg font-black text-emerald-300">
          {formatIDR(totals.total_amount)}
        </span>
      </div>
    </div>
  );
}

function CheckoutForm({ onBack }: { onBack: () => void }) {
  const { placeOrder, items } = useCart();
  const [address, setAddress] = useState<Omit<Address, "id">>({
    name: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const set = (field: keyof Omit<Address, "id">, value: string) =>
    setAddress((prev) => ({ ...prev, [field]: value }));

  const complete =
    address.name &&
    address.phone &&
    address.street &&
    address.city &&
    address.province &&
    address.postal_code;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-2.5">
        <Field
          label="Nama"
          value={address.name}
          onChange={(v) => set("name", v)}
          placeholder="Nama penerima"
        />
        <Field
          label="No. HP"
          value={address.phone}
          onChange={(v) => set("phone", v)}
          placeholder="08xxxxxxxxxx"
        />
        <Field
          label="Alamat"
          value={address.street}
          onChange={(v) => set("street", v)}
          placeholder="Jalan, RT/RW"
          className="col-span-2"
        />
        <Field
          label="Kota"
          value={address.city}
          onChange={(v) => set("city", v)}
          placeholder="Kota"
        />
        <Field
          label="Provinsi"
          value={address.province}
          onChange={(v) => set("province", v)}
          placeholder="Provinsi"
        />
        <Field
          label="Kode Pos"
          value={address.postal_code}
          onChange={(v) => set("postal_code", v)}
          placeholder="12345"
        />
      </div>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
        <button
          disabled={!complete || items.length === 0}
          onClick={() => placeOrder(address)}
          className="w-full rounded-full bg-emerald-400 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
        >
          Checkout Sekarang
        </button>
        <button
          onClick={onBack}
          className="w-full rounded-full border border-white/15 py-3 text-xs font-bold uppercase tracking-widest text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          Kembali ke Keranjang
        </button>
      </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-white/25 outline-none transition focus:border-emerald-400/60"
      />
    </label>
  );
}

function OrderConfirmation({
  order,
  onClose,
}: {
  order: NonNullable<ReturnType<typeof useCart>["lastOrder"]>;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15">
          <PackageCheck className="h-8 w-8 text-emerald-400" />
        </span>
        <h2 className="mt-5 text-xl font-black tracking-tight">
          Pesanan Berhasil!
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Order <span className="font-bold text-white">{order.id}</span> telah
          dibuat. Ini adalah mock checkout — tidak ada pembayaran nyata.
        </p>
      </div>

      <div className="mt-8 space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="flex justify-between text-sm">
          <span className="text-white/60">Subtotal</span>
          <span>{formatIDR(order.totals.subtotal_amount)}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="text-white/60">Ongkir</span>
          <span>{formatIDR(order.totals.shipping_cost)}</span>
        </p>
        <p className="flex justify-between border-t border-white/10 pt-3 text-base font-bold">
          <span>Total</span>
          <span className="text-emerald-300">
            {formatIDR(order.totals.total_amount)}
          </span>
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">
          Dikirim ke
        </p>
        <p className="text-sm font-semibold">{order.address.name}</p>
        <p className="mt-1 text-xs leading-5 text-white/60">
          {order.address.street}, {order.address.city},{" "}
          {order.address.province} {order.address.postal_code}
        </p>
        <p className="mt-1 text-xs text-white/40">{order.address.phone}</p>
      </div>

      <div className="mt-auto">
        <button
          onClick={onClose}
          className="w-full rounded-full bg-white py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-300"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}