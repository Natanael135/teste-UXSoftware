"use client";
import { useCartStore } from "@/contexts/cart";
import { showSuccess } from "@/utils/toast";
import { Container } from "@/components/Container";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [items]);

  return (
  <Container className="max-w-xl py-16">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Carrinho</h1>
      {items.length === 0 ? (
        <div className="text-center text-muted-foreground">Seu carrinho está vazio.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-6 border-b border-border pb-6 py-6 min-h-[110px]">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded shadow-sm border bg-background"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-foreground">{item.name}</div>
                <div className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="w-14 h-8 text-sm bg-background text-foreground border border-input"
                  aria-label={`Quantidade de ${item.name}`}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="px-2 py-1 bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground border-none"
                  onClick={() => {
                    removeItem(item.id);
                    showSuccess(`Produto removido do carrinho!`);
                  }}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-6 text-foreground">
            <span>Subtotal</span>
            <span className="text-accent">R$ {subtotal.toFixed(2)}</span>
          </div>
          <Button onClick={clearCart} className="w-full mt-4 bg-secondary text-secondary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition">
            Limpar Carrinho
          </Button>
        </div>
      )}
    </Container>
  );
}
