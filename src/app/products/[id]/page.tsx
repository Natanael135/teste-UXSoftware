"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cartApi";
import { showSuccess } from "@/utils/toast";
import type { Product } from "@/types/product";
import { ShoppingCart, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { AuthModal } from "@/components/ui/auth-modal";
import { handleApiErrorWithToast } from "@/utils/api-error";

export default function ProductDetailPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addProduct } = useCart();
  const { user, token } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quantity] = useState(1);
  const images = React.useMemo(() => [product?.imageUrl || product?.image || "https://placehold.co/320x320?text=Sem+Imagem"], [product]);
  const [mainImage, setMainImage] = useState<string>("");
  useEffect(() => {
    if (images && images.length > 0) setMainImage(images[0]);
  }, [images]);

  useEffect(() => {
    api.get<Product>(`/products/${id}`)
      .then((res) => {
        setProduct(res || null);
        setLoading(false);
      })
      .catch((error) => {
        handleApiErrorWithToast(error, "Erro ao carregar produto");
        setLoading(false);
      });
  }, [id]);

  // Produtos para Compre Junto
  const [compreJunto, setCompreJunto] = useState<Product[]>([]);
  useEffect(() => {
    api.get<{ products: Product[] }>("/products")
      .then(res => {
        if (res && Array.isArray(res.products)) {
          // Pega até 3 produtos diferentes do atual
          setCompreJunto(res.products.filter(p => p.id !== id).slice(0, 2));
        }
      })
      .catch((error) => {
        handleApiErrorWithToast(error, "Erro ao carregar produtos relacionados");
      });
  }, [id]);

  // Garante que o produto atual sempre seja o primeiro do Compre Junto
  const compreJuntoProdutos = [product, ...compreJunto].filter((p, idx, arr) => p && arr.findIndex(x => x?.id === p?.id) === idx);

  // Função para adicionar todos ao carrinho e redirecionar
  const handleComprarJunto = async () => {
    if (!product) return;
    try {
      // Se o produto do Compre Junto for igual ao atual, soma a quantidade
      const ids: Record<string, number> = { [product.id]: 1 };
      for (const prod of compreJunto) {
        if (ids[prod.id]) {
          ids[prod.id] += 1;
        } else {
          ids[prod.id] = 1;
        }
      }
      for (const pid in ids) {
        await addProduct(pid, ids[pid]);
      }
      showSuccess("Produtos adicionados ao carrinho!");
      window.location.href = "/cart";
    } catch (error) {
      handleApiErrorWithToast(error, "Erro ao adicionar produtos ao carrinho");
    }
  };

  const handleAddToCart = async (redirectToCart = false) => {
    if (!user || !token) {
      setShowAuthModal(true);
      return;
    }
    if (!product) return;
    try {
      await addProduct(product.id, quantity);
      showSuccess("Produto adicionado ao carrinho!");
      if (redirectToCart) {
        window.location.href = "/cart";
      }
    } catch (error) {
      handleApiErrorWithToast(error, "Erro ao adicionar produto ao carrinho");
    }
  };

  if (loading) return <Container className="py-12 text-center text-muted-foreground">Carregando...</Container>;
  if (!product) return <Container className="py-12 text-center text-muted-foreground">Produto não encontrado.</Container>;

  return (
    <Container className="py-8 max-w-7xl animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:flex flex-col gap-2 items-center min-w-[80px]">
          {images.map((img, idx) => (
            <button key={img+idx} className={`border rounded-lg p-1 bg-background ${mainImage === img ? 'border-accent' : 'border-border'}`} onClick={() => setMainImage(img)}>
              <Image src={img} alt={product.name} width={60} height={60} className="object-cover rounded w-14 h-14" unoptimized />
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={mainImage} alt={product.name} width={380} height={380} className="rounded-lg shadow-lg w-full max-w-md object-contain bg-background" unoptimized />
        </div>
        <div className="w-full lg:w-[420px]">
          <Card className="p-0">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-green-700">-25,38%</span>
                <div className="text-xs text-muted-foreground">Cod: {product.id}</div>
                <div className="font-semibold text-foreground leading-tight">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.description}</div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="line-through text-xs text-muted-foreground">de R$ {(product.price * 1.07).toFixed(2)}</span>
                  <span className="text-2xl font-bold text-accent">por R$ {product.price.toFixed(2)} <span className="text-base font-normal">no PIX</span></span>
                  <span className="text-xs text-muted-foreground">ou até 1x de R$ {product.price.toFixed(2)}</span>
                  <span className="text-xs underline text-accent cursor-pointer">mais formas de pagamento</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Button className="w-full h-12 text-lg font-bold bg-accent hover:bg-primary text-white rounded-lg" onClick={() => handleAddToCart(true)}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    COMPRAR
                  </Button>
                  <Button variant="outline" className="w-full h-10 text-base font-semibold mt-1" onClick={() => handleAddToCart()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar ao carrinho
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Vendido e entregue por <span className="font-semibold">UX Marketplace</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-bold mb-3">Aproveite e Compre Junto</h3>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch">
          {compreJuntoProdutos.map((prod, idx) => (
            <React.Fragment key={prod?.id}>
              {idx > 0 && <div className="flex items-center justify-center text-3xl font-bold text-muted-foreground lg:flex-col lg:justify-center lg:items-center">+</div>}
              <Card className="flex-1 w-full lg:w-[180px] flex flex-col items-center p-4">
                <Image src={prod?.imageUrl || prod?.image || 'https://placehold.co/100x100?text=Produto'} alt={prod?.name || ''} width={100} height={100} className="object-cover rounded mb-2 bg-background" unoptimized />
                <div className="font-semibold text-sm mb-1 text-foreground text-center">{prod?.name}</div>
                <div className="text-accent font-bold text-base mb-1">R$ {prod?.price?.toFixed(2)} no PIX</div>
              </Card>
            </React.Fragment>
          ))}
          <div className="flex items-center justify-center text-3xl font-bold text-muted-foreground lg:flex-col lg:justify-center lg:items-center">=</div>
          <Card className="flex-1 w-full lg:w-[180px] flex flex-col items-center justify-center bg-muted/60 p-4">
            <div className="font-semibold text-lg mb-2 text-center">Compre os {compreJuntoProdutos.length} produtos</div>
            <div className="line-through text-xs text-muted-foreground">
              R$ {compreJuntoProdutos.reduce((acc, p) => acc + (p?.price || 0) * 1.07, 0).toFixed(2)}
            </div>
            <div className="text-accent font-bold text-2xl mb-2">
              R$ {compreJuntoProdutos.reduce((acc, p) => acc + (p?.price || 0), 0).toFixed(2)}
            </div>
            <Button className="w-full h-10 text-base font-bold bg-accent hover:bg-primary text-white rounded-lg mt-2" onClick={handleComprarJunto}>COMPRAR JUNTO</Button>
          </Card>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </Container>
  );
}
