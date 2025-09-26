"use client";
// Navbar é global, não importar aqui
import { api } from "@/services/api";
import { useCart } from "@/contexts/cartApi";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchStore } from "@/store/search";
import { useDebounce } from "@/hooks/useDebounce";
import { Container } from "@/components/Container";
import { showError, showSuccess } from "@/utils/toast";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductFilters } from "@/components/ProductFilters";
// import { useState } from "react"; // Removido duplicado
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  freeShipping?: boolean;
  color?: string;
  stock?: number;
}

export default function ProductsPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const search = useSearchStore((s) => s.search);
  const debouncedSearch = useDebounce(search, 1000);
  const isDebouncing = search !== debouncedSearch;
  const hasSearch = search.trim().length > 0;
  // ...
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [minRating, setMinRating] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("relevance");
    // Comentários removidos
  const { addProduct } = useCart();
  const { user, token } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  function fetchProducts() {
    setLoading(true);
    api.get<{ products: Product[] }>("/products")
      .then((res) => {
        const data = Array.isArray(res.products) ? res.products : [];
        // Log dos campos de imagem para debug
        if (data.length > 0) {
          console.log("Produtos carregados:", data.map(p => ({ id: p.id, image: p.image, imageUrl: p.imageUrl })));
        } else {
          console.log("Nenhum produto retornado pela API.");
        }
        setProducts(data);
      })
      .catch(() => {
        setProducts([]);
        showError("Erro ao carregar produtos");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchProducts();
    // api.get("/products/featured")... (removido pois não há endpoint tipado)
  }, []);

  async function handleAddToCart(product: Product) {
    if (!user || !token) {
      setShowAuthModal(true);
      return;
    }
    await addProduct(product.id, 1);
    showSuccess("Produto adicionado ao carrinho!");
  }

    // Comentários removidos

  // Listas únicas para filtros (apenas string[])
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category).filter((v): v is string => !!v))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand).filter((v): v is string => !!v))), [products]);
  const colors = useMemo(() => Array.from(new Set(products.map(p => p.color).filter((v): v is string => !!v))), [products]);

  // Filtro de produtos sofisticado
  function normalize(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = normalize(product.name).includes(normalize(debouncedSearch));
      const matchesMin = minPrice ? product.price >= Number(minPrice) : true;
      const matchesMax = maxPrice ? product.price <= Number(maxPrice) : true;
      const matchesCategory = category ? product.category === category : true;
      const matchesBrand = brand ? product.brand === brand : true;
      const matchesFreeShipping = freeShipping ? product.freeShipping : true;
      const matchesRating = minRating ? (product.rating ?? 0) >= Number(minRating) : true;
      const matchesColor = color ? product.color === color : true;
      return matchesSearch && matchesMin && matchesMax && matchesCategory && matchesBrand && matchesFreeShipping && matchesRating && matchesColor;
    });
    // Ordenação sofisticada
    switch (sort) {
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return result;
  }, [products, debouncedSearch, minPrice, maxPrice, category, brand, freeShipping, minRating, color, sort]);


  // (Removido: declaração duplicada de hasSearch)
  return (
    <>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-6 shadow-xl border border-border">
          <DialogTitle className="sr-only">Acesso necessário</DialogTitle>
          <DialogDescription className="sr-only">
            Para adicionar produtos ao seu carrinho, você precisa estar logado em sua conta.
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
                Para adicionar produtos ao seu carrinho, você precisa estar logado em sua conta.
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
              É rápido e seguro! Seus dados estão protegidos.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      {/* Layout flex para sidebar e conteúdo principal */}
      {/* Layout flex para sidebar e conteúdo principal */}
  <div className="flex min-h-full flex-1 ">
    {/* Sidebar lateral fora do Container, sem padding */}
    <aside className="hidden lg:block w-64 shrink-0 h-full flex flex-col bg-background/95 border-r border-border animate-fade-in">
      <div className="flex-1 overflow-y-auto p-6 mb-10">
        <ProductFilters
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          category={category} setCategory={setCategory} categories={categories}
          brand={brand} setBrand={setBrand} brands={brands}
          color={color} setColor={setColor} colors={colors}
          minRating={minRating} setMinRating={setMinRating}
          freeShipping={freeShipping} setFreeShipping={setFreeShipping}
          sort={sort} setSort={setSort}
        />
      </div>
    </aside>
    {/* Conteúdo principal centralizado, com padding apenas no Container */}
    <div className="flex-1 h-full flex flex-col">
  <Container className="relative h-full py-4">
            {/* Título e subtítulo centralizados */}
            {!hasSearch && (
              <div className="mb-4 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-primary drop-shadow-lg animate-fade-in">Produtos em Destaque</h1>
                <p className="text-muted-foreground mt-2 animate-fade-in delay-100">Confira as melhores ofertas do nosso marketplace!</p>
              </div>
            )}
            {hasSearch && debouncedSearch.trim().length > 0 && (
              <div className="mb-6 text-lg text-muted-foreground animate-fade-in">
                Resultado para <span className="font-semibold text-accent">&quot;{debouncedSearch}&quot;</span>
              </div>
            )}
            {/* Botão de filtro mobile acima do conteúdo */}
            <div className="lg:hidden w-full mb-4">
              <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-accent-foreground font-semibold shadow hover:bg-primary hover:text-primary-foreground transition"
                  onClick={() => setShowMobileFilters(true)}
                  type="button"
                >
                  <Filter size={20} />
                  <span>Filtros</span>
                </button>
                <DialogContent className="w-[95vw] max-w-sm max-h-[90vh] overflow-y-auto mx-auto rounded-xl p-4 shadow-lg border border-border flex flex-col">
                  <DialogTitle className="text-lg font-bold text-center text-foreground mb-4">Filtros</DialogTitle>
                  <DialogDescription className="sr-only">Selecione os filtros desejados para refinar sua busca de produtos.</DialogDescription>
                  <div className="flex flex-col gap-6 w-full py-2">
                    <ProductFilters
                      minPrice={minPrice} setMinPrice={setMinPrice}
                      maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                      category={category} setCategory={setCategory} categories={categories}
                      brand={brand} setBrand={setBrand} brands={brands}
                      color={color} setColor={setColor} colors={colors}
                      minRating={minRating} setMinRating={setMinRating}
                      freeShipping={freeShipping} setFreeShipping={setFreeShipping}
                      sort={sort} setSort={setSort}
                      inline
                    />
                    <button
                      className="mt-6 w-full bg-primary text-primary-foreground font-semibold rounded-lg py-2 shadow border border-accent hover:bg-accent hover:text-accent-foreground transition"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {/* Conteúdo principal */}
            <main>
              {(loading || isDebouncing) ? (
                <LoadingSpinner size="md" fullscreen={false} className="min-h-[200px]" />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center text-muted-foreground">Nenhum produto encontrado.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={
                        product.imageUrl
                          ? product.imageUrl.includes('/uploads/')
                            ? product.imageUrl
                            : product.imageUrl.replace(
                                /onrender\.com\/?(uploads\/)?/,
                                'onrender.com/uploads/'
                              )
                          : product.image
                      }
                      imageUrl={product.imageUrl}
                      description={product.description}
                      onAddToCart={() => handleAddToCart(product)}
                      animationDelay={idx * 80}
                    />
                  ))}
                </div>
              )}
            </main>
          </Container>
        </div>
      </div>
    </>
  );
}
