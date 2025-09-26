"use client";

import { AppImage } from "@/components/AppImage";
import { useCart } from "@/contexts/cartApi";
import { showSuccess } from "@/utils/toast";
import { Container } from "@/components/Container";
import React, { useEffect, useState, ChangeEvent } from "react";
import type { CartItem } from "@/contexts/cartApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, loading, removeProduct, decreaseQuantity, addProduct } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [frete, setFrete] = useState<string>("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (cart) {
      const qts: Record<string, number> = {};
      cart.items.forEach((item: CartItem) => {
        qts[item.product.id] = item.quantity;
      });
      setQuantities(qts);
    }
  }, [cart]);

  // Simulação de desconto
  const subtotal = cart?.totalPrice || 0;
  const descontos = subtotal > 0 ? subtotal * 0.05 : 0; // 5% de desconto fictício
  const total = subtotal - descontos;

  function calcularFrete() {
    setFrete("Grátis");
  }

  return (
    <Container className="max-w-6xl py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-primary">Meu Carrinho</h1>
      {loading ? (
        <LoadingSpinner size="md" className="min-h-[200px]" />
      ) : !cart || cart.items.length === 0 ? (
        <div className="text-center text-muted-foreground">Seu carrinho está vazio.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Produtos */}
          <div className="lg:col-span-2">
            {/* Cards */}
            <div className="flex flex-col gap-4 w-full max-w-full">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-xl border border-border bg-white shadow-md p-4"
                >
                  <div className="flex flex-col gap-4 w-full">
                    {/* Top row: image, name, remove */}
                    <div className="flex flex-row gap-4 w-full">
                      {/* Imagem */}
                      <div className="flex-shrink-0">
                        {item.product.imageUrl && (
                          <AppImage src={item.product.imageUrl} alt={item.product.name} width={70} height={70} className="rounded-lg bg-background border w-20 h-20 object-cover" />
                        )}
                      </div>
                      {/* Nome e frete */}
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
                      {/* Remover */}
                      <div className="flex-shrink-0">
                        <Button variant="ghost" size="icon" onClick={async () => {
                          await removeProduct(item.product.id);
                          showSuccess(`Produto removido do carrinho!`);
                        }}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </div>
                    </div>
                    {/* Bottom row: quantity controls and prices */}
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Quantidade:</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold disabled:opacity-50"
                          aria-label="Diminuir quantidade"
                          disabled={loading || (quantities[item.product.id] || item.quantity) <= 1}
                          onClick={async () => {
                            const current = quantities[item.product.id] || item.quantity;
                            if (current > 1) {
                              setQuantities((q: Record<string, number>) => ({ ...q, [item.product.id]: current - 1 }));
                              await decreaseQuantity(item.product.id, 1);
                              showSuccess("Quantidade atualizada!");
                            }
                          }}
                        >
                          –
                        </button>
                        <Input
                          type="number"
                          min={1}
                          value={quantities[item.product.id] || item.quantity}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const newQ = Number(e.target.value);
                            setQuantities((q: Record<string, number>) => ({ ...q, [item.product.id]: newQ }));
                          }}
                          onBlur={async () => {
                            const currentQ = quantities[item.product.id] || item.quantity;
                            const diff = currentQ - item.quantity;
                            if (diff > 0) {
                              await addProduct(item.product.id, diff);
                              showSuccess("Quantidade atualizada!");
                            } else if (diff < 0) {
                              await decreaseQuantity(item.product.id, -diff);
                              showSuccess("Quantidade atualizada!");
                            }
                          }}
                          className="w-20 h-10 text-base bg-background text-foreground border border-input text-center font-semibold"
                          aria-label={`Quantidade de ${item.product.name}`}
                          inputMode="numeric"
                        />
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold disabled:opacity-50"
                          aria-label="Aumentar quantidade"
                          disabled={loading}
                          onClick={async () => {
                            await addProduct(item.product.id, 1);
                            showSuccess("Quantidade atualizada!");
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="line-through text-xs text-muted-foreground">De R$ {(item.product.price * 1.07).toFixed(2)}</span>
                        <span className="font-bold text-accent text-base">Por R$ {item.product.price.toFixed(2)} à vista</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Entrega */}
            <Card className="mt-6">
              <CardContent>
                <div className="font-bold text-lg mb-2">Entrega</div>
                <div className="text-muted-foreground text-sm mb-4">Veja as opções de entrega para seus itens, com todos os prazos e valores.</div>
                <div className="flex gap-2 mb-2">
                  <Input placeholder="CEP" className="max-w-[160px]" value={cep} onChange={e => setCep(e.target.value)} />
                  <Button variant="outline" className="font-bold text-green-700 border-green-600" onClick={calcularFrete}>CALCULAR</Button>
                </div>
                {frete && (
                  <div className="text-green-700 font-bold text-base">Frete: {frete}</div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Resumo do carrinho */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <Button variant="outline" className="w-full font-bold text-green-700 border-green-600">INSERIR CUPOM DE DESCONTO</Button>
                <div className="border rounded-lg p-4 space-y-2 bg-muted/40">
                  <div className="flex justify-between text-base">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span>Descontos</span>
                    <span className="text-green-700">- R$ {descontos.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full h-12 text-lg font-bold bg-accent hover:bg-primary text-white rounded-lg mt-2">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  FINALIZAR COMPRA
                </Button>
              </CardContent>
            </Card>
            <div className="text-center text-muted-foreground text-sm">
              <Link href="/products" className="underline hover:text-accent">Escolher mais produtos</Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
