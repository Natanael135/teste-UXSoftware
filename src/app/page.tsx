"use client";
// Navbar é global, não importar aqui
import { useProducts } from "@/hooks/useProducts";
import { useSearchStore } from "@/store/search";
import { useDebounce } from "@/hooks/useDebounce";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductFilters } from "@/components/ProductFilters";
import { Pagination } from "@/components/Pagination";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth";
import { AuthModal } from "@/components/ui/auth-modal";
import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/cartApi";


export default function ProductsPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const search = useSearchStore((s) => s.search);
  const debouncedSearch = useDebounce(search, 1000);
  const isDebouncing = search !== debouncedSearch;
  const hasSearch = search.trim().length > 0;

  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    filteredProducts,
    loading,
    categories,
    brands,
    colors,
    filters,
    setFilters,
    pagination,
    setPage
  } = useProducts();

  // Sincronizar o search do store com o hook useProducts
  useEffect(() => {
    setFilters.setSearch(debouncedSearch);
  }, [debouncedSearch, setFilters]);



  // (Removido: declaração duplicada de hasSearch)
  return (
    <>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      {/* Layout flex para sidebar e conteúdo principal */}
      {/* Layout flex para sidebar e conteúdo principal */}
  <div className="flex min-h-full flex-1 ">
    {/* Sidebar lateral fora do Container, sem padding */}
    <aside className="hidden lg:block w-64 shrink-0 h-full flex flex-col bg-background/95 border-r border-border animate-fade-in">
      <div className="flex-1 overflow-y-auto p-6 mb-10">
        <ProductFilters
          minPrice={filters.minPrice} setMinPrice={setFilters.setMinPrice}
          maxPrice={filters.maxPrice} setMaxPrice={setFilters.setMaxPrice}
          category={filters.category} setCategory={setFilters.setCategory} categories={categories}
          brand={filters.brand} setBrand={setFilters.setBrand} brands={brands}
          color={filters.color} setColor={setFilters.setColor} colors={colors}
          minRating={filters.minRating} setMinRating={setFilters.setMinRating}
          freeShipping={filters.freeShipping} setFreeShipping={setFilters.setFreeShipping}
          sort={filters.sort} setSort={setFilters.setSort}
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
                      minPrice={filters.minPrice} setMinPrice={setFilters.setMinPrice}
                      maxPrice={filters.maxPrice} setMaxPrice={setFilters.setMaxPrice}
                      category={filters.category} setCategory={setFilters.setCategory} categories={categories}
                      brand={filters.brand} setBrand={setFilters.setBrand} brands={brands}
                      color={filters.color} setColor={setFilters.setColor} colors={colors}
                      minRating={filters.minRating} setMinRating={setFilters.setMinRating}
                      freeShipping={filters.freeShipping} setFreeShipping={setFilters.setFreeShipping}
                      sort={filters.sort} setSort={setFilters.setSort}
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
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
                      animationDelay={idx * 80}
                    />
                  ))}
                </div>
              )}
            </main>
          </Container>
          <div className="w-full flex justify-center py-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
