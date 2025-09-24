"use client";

import { AppImage } from "@/components/AppImage";
import { useCart } from "@/contexts/cartApi";
import { showSuccess } from "@/utils/toast";
import { Container } from "@/components/Container";
import React, { useEffect, useState, ChangeEvent } from "react";
import type { Cart, CartItem } from "@/contexts/cartApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, loading, removeProduct, decreaseQuantity, fetchCart } = useCart();
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
        <div className="text-center text-muted-foreground">Carregando...</div>
      ) : !cart || cart.items.length === 0 ? (
        <div className="text-center text-muted-foreground">Seu carrinho está vazio.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabela de produtos */}
          <div className="lg:col-span-2">
            <Card className="overflow-x-auto">
              <CardContent className="p-0">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-muted text-muted-foreground">
                      <th className="p-4 text-left font-semibold">Produto</th>
                      <th className="p-4 text-left font-semibold">Entrega</th>
                      <th className="p-4 text-left font-semibold">Unitário</th>
                      <th className="p-4 text-center font-semibold">Quantidade</th>
                      <th className="p-4 text-right font-semibold">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.product.id} className="border-b border-border last:border-0">
                        <td className="p-4 min-w-[220px]">
                          <div className="flex items-center gap-4">
                            {item.product.imageUrl && (
                              <AppImage src={item.product.imageUrl} alt={item.product.name} width={60} height={60} className="rounded bg-background border w-16 h-16 object-cover" />
                            )}
                            <div>
                              <div className="font-semibold text-foreground truncate max-w-[180px]">{item.product.name}</div>
                              <div className="text-xs text-muted-foreground">Vendido e entregue por <span className="font-medium">UX Marketplace</span></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center align-middle font-semibold text-green-700 whitespace-nowrap">
                          <Badge variant="secondary">Frete Grátis</Badge>
                        </td>
                        <td className="p-4 text-center align-middle whitespace-nowrap">
                          <div className="flex flex-col items-center">
                            <span className="line-through text-xs text-muted-foreground">R$ {(item.product.price * 1.07).toFixed(2)}</span>
                            <span className="font-bold text-accent text-lg">R$ {item.product.price.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center align-middle">
                          <Input
                            type="number"
                            min={1}
                            value={quantities[item.product.id] || item.quantity}
                            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                              const newQ = Number(e.target.value);
                              setQuantities((q: Record<string, number>) => ({ ...q, [item.product.id]: newQ }));
                              if (newQ < item.quantity) {
                                await decreaseQuantity(item.product.id, item.quantity - newQ);
                                showSuccess("Quantidade atualizada!");
                              }
                            }}
                            className="w-14 h-8 text-sm bg-background text-foreground border border-input text-center mx-auto"
                            aria-label={`Quantidade de ${item.product.name}`}
                          />
                        </td>
                        <td className="p-4 text-right align-middle font-bold text-accent text-lg whitespace-nowrap min-w-[120px]">
                          R$ {(item.product.price * (quantities[item.product.id] || item.quantity)).toFixed(2)}
                        </td>
                        <td className="p-4 text-center align-middle">
                          <Button variant="destructive" size="icon" onClick={async () => {
                            await removeProduct(item.product.id);
                            showSuccess(`Produto removido do carrinho!`);
                          }}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
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
