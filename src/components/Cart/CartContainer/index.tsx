"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CartList } from "../CartList";
import { CartSummary } from "../CartSummary";
import Link from "next/link";
import type { CartItem } from "@/contexts/cartApi";

interface CartContainerProps {
  cart: { items: CartItem[]; totalPrice: number } | null;
  loading: boolean;
  quantities: Record<string, number>;
  frete: string;
  cep: string;
  onCepChange: (cep: string) => void;
  onCalcularFrete: () => void;
  onQuantityChange: (productId: string, newQ: number) => void;
  onQuantityBlur: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onIncrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export function CartContainer({
  cart,
  loading,
  quantities,
  frete,
  cep,
  onCepChange,
  onCalcularFrete,
  onQuantityChange,
  onQuantityBlur,
  onDecrease,
  onIncrease,
  onRemove,
  onCheckout,
}: CartContainerProps) {
  const subtotal = cart?.totalPrice || 0;
  const descontos = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal - descontos;

  return (
    <Container className="max-w-6xl py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-primary">Meu Carrinho</h1>
      {loading ? (
        <LoadingSpinner size="md" className="min-h-[200px]" />
      ) : !cart || cart.items.length === 0 ? (
        <div className="text-center text-muted-foreground">Seu carrinho está vazio.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList
              items={cart.items}
              quantities={quantities}
              loading={loading}
              onQuantityChange={onQuantityChange}
              onQuantityBlur={onQuantityBlur}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
            />
            <Card className="mt-6">
              <CardContent>
                <div className="font-bold text-lg mb-2">Entrega</div>
                <div className="text-muted-foreground text-sm mb-4">
                  Veja as opções de entrega para seus itens, com todos os prazos e valores.
                </div>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="CEP"
                    className="max-w-[160px]"
                    value={cep}
                    onChange={(e) => onCepChange(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="font-bold text-green-700 border-green-600"
                    onClick={onCalcularFrete}
                  >
                    CALCULAR
                  </Button>
                </div>
                {frete && (
                  <div className="text-green-700 font-bold text-base">Frete: {frete}</div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <CartSummary
              subtotal={subtotal}
              descontos={descontos}
              total={total}
              onCheckout={onCheckout}
            />
            <div className="text-center text-muted-foreground text-sm">
              <Link href="/products" className="underline hover:text-accent">
                Escolher mais produtos
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}