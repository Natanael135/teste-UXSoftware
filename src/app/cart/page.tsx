"use client";

import { useCart } from "@/contexts/cartApi";
import { showSuccess } from "@/utils/toast";
import { CartContainer } from "@/components/Cart";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/ui/auth-modal";

export default function CartPage() {
  const { cart, loading, removeProduct, decreaseQuantity, addProduct, clearCart } = useCart();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [frete, setFrete] = useState<string>("");
  const [cep, setCep] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      setShowAuthModal(true);
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [user, token, router]);

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
    if (!cart || cart.items.length === 0) {
      console.log("Carrinho vazio, não é possível finalizar compra.");
      return;
    }

    if (!user) {
      console.log("Usuário não autenticado.");
      return;
    }

    const subtotal = cart.totalPrice;
    const descontos = subtotal > 0 ? subtotal * 0.05 : 0;
    const total = subtotal - descontos;

    const order = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: cart.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        subtotal: item.product.price * item.quantity
      })),
      subtotal: subtotal,
      discounts: descontos,
      total: total,
      shipping: frete || "Não calculado",
      cep: cep || "Não informado",
      orderDate: new Date().toISOString(),
      status: "pending"
    };

    console.log("Enviando pedido para processamento:");
    console.log(JSON.stringify(order, null, 2));

    // simulando envio para API
    console.log("Processando pagamento...");
    setTimeout(() => {
      console.log("Pedido criado com sucesso! ID do pedido: ORDER-" + Date.now());
      // Aqui poderia limpar o carrinho ou redirecionar
      // clearCart();
      // router.push('/pedidos');
    }, 2000);
  };

  const handleClearCart = async () => {
    await clearCart();
    showSuccess("Carrinho limpo!");
  };

  if (!user || !token) {
    return (
      <>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </>
    );
  }  return (
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
      onClearCart={handleClearCart}
    />
  );
}
