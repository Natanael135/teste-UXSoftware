"use client";

import { AppImage } from "@/components/AppImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import React, { ChangeEvent } from "react";
import type { CartItem } from "@/types/cart";

interface CartItemProps {
  item: CartItem;
  quantity: number;
  loading: boolean;
  onQuantityChange: (newQ: number) => void;
  onQuantityBlur: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export function CartItem({
  item,
  quantity,
  loading,
  onQuantityChange,
  onQuantityBlur,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="rounded-xl border border-border bg-white shadow-md p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-shrink-0">
            {item.product.imageUrl && (
              <AppImage
                src={item.product.imageUrl}
                alt={item.product.name}
                width={70}
                height={70}
                className="rounded-lg bg-background border w-20 h-20 object-cover"
              />
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <div className="font-semibold text-foreground text-base leading-tight truncate max-w-full">
              {item.product.name}
            </div>
            <div className="text-xs text-muted-foreground">
              Vendido e entregue por <span className="font-medium">UX Marketplace</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Frete Grátis</Badge>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remover</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Quantidade:</span>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-lg font-bold disabled:opacity-50"
              aria-label="Diminuir quantidade"
              disabled={loading || quantity <= 1}
              onClick={onDecrease}
            >
              –
            </button>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newQ = Number(e.target.value);
                onQuantityChange(newQ);
              }}
              onBlur={onQuantityBlur}
              className="w-20 h-10 text-base bg-background text-foreground border border-input text-center font-semibold"
              aria-label={`Quantidade de ${item.product.name}`}
              inputMode="numeric"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-lg font-bold disabled:opacity-50"
              aria-label="Aumentar quantidade"
              disabled={loading}
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-end sm:items-end sm:ml-4 w-full">
            <span className="line-through text-xs text-muted-foreground">
              De R$ {(item.product.price * 1.07).toFixed(2)}
            </span>
            <span className="font-bold text-accent text-base">
              Por R$ {item.product.price.toFixed(2)} à vista
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}