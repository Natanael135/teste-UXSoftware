"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/contexts/cart";
import { showSuccess } from "@/utils/toast";
import type { Product, Comment } from "@/types/product";

export default function ProductDetailPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  // Estado para quantidade
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      // Se vier objeto com product/comments/recommendations
      if ('product' in res.data) {
        setProduct(res.data.product || null);
        setComments(res.data.comments || []);
        setRecommendations(res.data.recommendations || []);
      } else if (Array.isArray(res.data)) {
        // fallback para array (caso mock antigo)
        const found = res.data.find((p: Product) => p.id === id);
        setProduct(found || null);
        setComments([]);
        setRecommendations([]);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Container className="py-12 text-center text-muted-foreground">Carregando...</Container>;
  if (!product) return <Container className="py-12 text-center text-muted-foreground">Produto não encontrado.</Container>;

  return (
    <Container className="py-12 max-w-3xl animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <img src={product.image} alt={product.name} className="rounded-lg shadow-lg w-full max-w-xs object-cover mb-4 bg-background" />
          {product.freeShipping && <span className="text-xs text-accent font-semibold">Frete grátis</span>}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-bold mb-2 text-foreground drop-shadow-sm">{product.name}</h2>
          <div className="text-lg text-accent font-bold mb-2">R$ {product.price.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground mb-2">{product.description}</div>
          <div className="flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-muted px-2 py-1 rounded text-foreground">Categoria: {product.category}</span>
            <span className="bg-muted px-2 py-1 rounded text-foreground">Marca: {product.brand}</span>
            <span className="bg-muted px-2 py-1 rounded text-foreground">Cor: {product.color}</span>
            <span className="bg-muted px-2 py-1 rounded text-foreground">Estoque: {product.stock}</span>
            <span className="bg-muted px-2 py-1 rounded text-foreground">Avaliação: {product.rating ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">Quantidade:</span>
            <button
              type="button"
              className="px-2 py-1 rounded bg-muted text-lg font-bold border border-input hover:bg-accent hover:text-accent-foreground transition"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
            >-</button>
            <input
              type="number"
              min={1}
              max={product.stock || 99}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Math.min(Number(e.target.value), product.stock || 99)))}
              className="w-16 text-center border border-input rounded h-9 bg-background text-foreground"
              aria-label="Quantidade"
            />
            <button
              type="button"
              className="px-2 py-1 rounded bg-muted text-lg font-bold border border-input hover:bg-accent hover:text-accent-foreground transition"
              onClick={() => setQuantity((q) => Math.min((product.stock || 99), q + 1))}
              aria-label="Aumentar quantidade"
            >+</button>
          </div>
          <Button className="bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground" onClick={() => { addItem({ ...product, quantity }); showSuccess("Produto adicionado ao carrinho!"); }}>
            <span className="inline-block mr-2">🛒</span> Adicionar ao carrinho
          </Button>
        </div>
      </div>

      {/* Comentários */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-3">Avaliações de clientes</h3>
        {comments.length === 0 ? (
          <div className="text-muted-foreground text-sm">Nenhum comentário ainda.</div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-muted/50 rounded p-3 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-secondary">{c.user}</span>
                  <span className="text-accent">{'★'.repeat(Math.round(c.rating))}{'☆'.repeat(5 - Math.round(c.rating))}</span>
                </div>
                {c.comment && <div className="text-sm text-muted-foreground">{c.comment}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recomendações */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-3">Você também pode gostar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-card rounded shadow p-3 flex gap-3 items-center border border-border">
                <img src={rec.image} alt={rec.name} className="w-20 h-20 object-cover rounded bg-background" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1 text-foreground">{rec.name}</div>
                  <div className="text-accent font-bold text-base mb-1">R$ {rec.price.toFixed(2)}</div>
                  <Button size="sm" className="bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground" onClick={() => { addItem({ ...rec, quantity: 1 }); showSuccess("Produto adicionado ao carrinho!"); }}>
                    <span className="inline-block mr-1">🛒</span> Carrinho
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
