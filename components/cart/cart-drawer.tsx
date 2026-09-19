"use client";

import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatIDR } from "@/lib/store-types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-zinc-800 bg-zinc-950 text-white shadow-2xl">
          <div className="flex h-full flex-col justify-between p-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-emerald-400" />
                  <h2 className="text-lg font-extrabold uppercase tracking-wider">
                    Keranjang ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Item List */}
              <div className="mt-6 max-h-[60vh] divide-y divide-zinc-800/80 overflow-y-auto pr-1">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-xl bg-zinc-900 object-cover border border-zinc-800"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xs font-bold text-white line-clamp-1">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-500 hover:text-red-400 transition ml-2"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="mt-1 text-xs font-bold text-emerald-400">
                            {formatIDR(item.price)}
                          </p>
                        </div>

                        {/* Plus Minus Quantity */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="px-2 text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <ShoppingBag size={40} className="mx-auto text-zinc-600 mb-3" />
                    <p className="text-xs font-semibold text-zinc-400 uppercase">
                      Keranjang kamu masih kosong
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Checkout Button */}
            {cartItems.length > 0 && (
              <div className="border-t border-zinc-800 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 uppercase font-semibold text-xs">Total Pembayaran:</span>
                  <span className="text-lg font-black text-emerald-400">
                    {formatIDR(totalPrice)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-emerald-400 active:scale-95"
                >
                  <span>Lanjut Ke Checkout</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}