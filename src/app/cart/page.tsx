"use client";

import { useCart } from "@/contexts/cartApi";
import { showSuccess } from "@/utils/toast";
import { CartContainer } from "@/components/Cart";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";

export default function CartPage() {
  const { cart, loading, removeProduct, decreaseQuantity, addProduct } = useCart();
  const { user } = useAuthStore();
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [frete, setFrete] = useState<string>("");
  const [cep, setCep] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
      // Redirecionar após um delay para dar tempo de ver o modal
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [user, router]);

  useEffect(() => {
    if (cart) {
      const qts: Record<string, number> = {};
      cart.items.forEach((item) => {
        qts[item.product.id] = item.quantity;
      });
      setQuantities(qts);
    }
  }, [cart]);

  function calcularFrete() {
    setFrete("Grátis");
  }

  const handleQuantityChange = (productId: string, newQ: number) => {
    setQuantities((q) => ({ ...q, [productId]: newQ }));
  };

  const handleQuantityBlur = async (productId: string) => {
    const currentQ = quantities[productId];
    const item = cart?.items.find((i) => i.product.id === productId);
    if (!item) return;
    const diff = currentQ - item.quantity;
    if (diff > 0) {
      await addProduct(productId, diff);
      showSuccess("Quantidade atualizada!");
    } else if (diff < 0) {
      await decreaseQuantity(productId, -diff);
      showSuccess("Quantidade atualizada!");
    }
  };

  const handleDecrease = async (productId: string) => {
    const current = quantities[productId];
    if (current > 1) {
      setQuantities((q) => ({ ...q, [productId]: current - 1 }));
      await decreaseQuantity(productId, 1);
      showSuccess("Quantidade atualizada!");
    }
  };

  const handleIncrease = async (productId: string) => {
    await addProduct(productId, 1);
    showSuccess("Quantidade atualizada!");
  };

  const handleRemove = async (productId: string) => {
    await removeProduct(productId);
    showSuccess("Produto removido do carrinho!");
  };

  const handleCheckout = () => {
    // Implementar checkout
  };

  if (!user) {
    return (
      <>
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-6 shadow-xl border border-border">
            <DialogTitle className="sr-only">Acesso necessário</DialogTitle>
            <DialogDescription className="sr-only">
              Para acessar seu carrinho, você precisa estar logado em sua conta.
            </DialogDescription>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Acesso necessário</h2>
                <p className="text-muted-foreground">
                  Para acessar seu carrinho, você precisa estar logado em sua conta.
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  onClick={() => setShowAuthModal(false)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Fazer login
                </Link>
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center px-4 py-3 border border-border bg-background text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-colors"
                  onClick={() => setShowAuthModal(false)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Criar nova conta
                </Link>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Redirecionando para a página inicial em alguns segundos...
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <CartContainer
      cart={cart}
      loading={loading}
      quantities={quantities}
      frete={frete}
      cep={cep}
      onCepChange={setCep}
      onCalcularFrete={calcularFrete}
      onQuantityChange={handleQuantityChange}
      onQuantityBlur={handleQuantityBlur}
      onDecrease={handleDecrease}
      onIncrease={handleIncrease}
      onRemove={handleRemove}
      onCheckout={handleCheckout}
    />
  );
}
