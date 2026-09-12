"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Address,
  CartItemSnapshot,
  CartTotals,
  Order,
} from "@/lib/store-types";

const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_COST = 25000;

interface CartContextValue {
  items: CartItemSnapshot[];
  isOpen: boolean;
  lastOrder: Order | null;
  totals: CartTotals;
  itemCount: number;
  addItem: (item: Omit<CartItemSnapshot, "quantity">, quantity: number) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  placeOrder: (address: Omit<Address, "id">) => Order;
}

const CartContext = createContext<CartContextValue | null>(null);

function itemKeyOf(item: Pick<CartItemSnapshot, "variant_id" | "prescription">) {
  const rx = item.prescription ? JSON.stringify(item.prescription) : "none";
  return `${item.variant_id}::${rx}`;
}

function computeTotals(items: CartItemSnapshot[]): CartTotals {
  const subtotal_amount = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const shipping_cost =
    subtotal_amount === 0 || subtotal_amount >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_COST;
  const total_amount = subtotal_amount + shipping_cost;
  return { subtotal_amount, shipping_cost, total_amount };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemSnapshot[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const getItemKey = useCallback(
    (item: Omit<CartItemSnapshot, "quantity">) => itemKeyOf(item),
    []
  );

  const addItem = useCallback(
    (item: Omit<CartItemSnapshot, "quantity">, quantity: number) => {
      const key = getItemKey(item);
      setItems((prev) => {
        const existing = prev.find((i) => itemKeyOf(i) === key);
        if (existing) {
          return prev.map((i) =>
            itemKeyOf(i) === key
              ? { ...i, quantity: Math.min(i.quantity + quantity, 10) }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    [getItemKey]
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => itemKeyOf(i) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => itemKeyOf(i) !== key)
        : prev.map((i) => (itemKeyOf(i) === key ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const placeOrder = useCallback(
    (address: Omit<Address, "id">): Order => {
      const order: Order = {
        id: `INV-${Date.now().toString(36).toUpperCase()}`,
        items,
        address: { ...address, id: Date.now().toString(36) },
        totals: computeTotals(items),
        status: "pending",
        created_at: new Date().toISOString(),
      };
      setLastOrder(order);
      setItems([]);
      return order;
    },
    [items]
  );

  const totals = useMemo(() => computeTotals(items), [items]);
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      lastOrder,
      totals,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      placeOrder,
    }),
    [
      items,
      isOpen,
      lastOrder,
      totals,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      placeOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart harus dipakai di dalam <CartProvider>");
  }
  return ctx;
}

export const cartItemKey = itemKeyOf;