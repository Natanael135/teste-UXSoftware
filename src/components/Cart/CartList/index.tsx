"use client";

import { CartItem } from "../CartItem";
import type { CartItem as CartItemType } from "@/contexts/cartApi";

interface CartListProps {
  items: CartItemType[];
  quantities: Record<string, number>;
  loading: boolean;
  onQuantityChange: (productId: string, newQ: number) => void;
  onQuantityBlur: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onIncrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartList({
  items,
  quantities,
  loading,
  onQuantityChange,
  onQuantityBlur,
  onDecrease,
  onIncrease,
  onRemove,
}: CartListProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          quantity={quantities[item.product.id] || item.quantity}
          loading={loading}
          onQuantityChange={(newQ) => onQuantityChange(item.product.id, newQ)}
          onQuantityBlur={() => onQuantityBlur(item.product.id)}
          onDecrease={() => onDecrease(item.product.id)}
          onIncrease={() => onIncrease(item.product.id)}
          onRemove={() => onRemove(item.product.id)}
        />
      ))}
    </div>
  );
}