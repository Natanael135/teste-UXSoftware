"use client";
// Navbar é global, não importar aqui
import { api } from "@/services/api";
import { useCartStore } from "@/contexts/cart";
import { useEffect, useState, useMemo } from "react";
import { useSearchStore } from "@/store/search";
import { useDebounce } from "@/hooks/useDebounce";
import { Container } from "@/components/Container";
import { showError, showSuccess } from "@/utils/toast";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Input } from "@/components/ui/input";
import { ProductFilters } from "@/components/ProductFilters";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  freeShipping?: boolean;
  color?: string;
  stock?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<Product[]>([]);
  const search = useSearchStore((s) => s.search);
  const debouncedSearch = useDebounce(search, 1000);
  const isDebouncing = search !== debouncedSearch;
  const hasSearch = search.trim().length > 0;
  // Debug: log valores de busca
  console.log('search:', search, '| debouncedSearch:', debouncedSearch, '| hasSearch:', hasSearch);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [minRating, setMinRating] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("relevance");
  // Removido CRUD: modalOpen, editProduct
  const { addItem } = useCartStore();

  function fetchProducts() {
    setLoading(true);
    api.get("/products")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
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
    api.get("/products/featured").then(res => {
      if (Array.isArray(res.data)) {
        setFeatured(res.data);
      } else {
        setFeatured([]);
      }
    }).catch(() => setFeatured([]));
  }, []);

  function handleAddToCart(product: Product) {
    addItem({ ...product, quantity: 1 });
    showSuccess("Produto adicionado ao carrinho!");
  }

  // Removido CRUD: handleEdit, handleDelete, handleCreate

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
  <Container className="py-4 md:py-8">
        {/* Só mostra destaque e título se não estiver pesquisando */}
        {!hasSearch && featured.length > 0 && (
          <FeaturedCarousel products={featured.map(p => ({ ...p, description: p.description || "", image: p.image || "" }))} />
        )}
        {!hasSearch && (
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary drop-shadow-lg animate-fade-in">Produtos em Destaque</h1>
            <p className="text-muted-foreground mt-2 animate-fade-in delay-100">Confira as melhores ofertas do nosso marketplace!</p>
          </div>
        )}
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
        {hasSearch && debouncedSearch.trim().length > 0 && (
          <div className="mb-6 text-lg text-muted-foreground animate-fade-in">
            Resultado para <span className="font-semibold text-accent">&quot;{debouncedSearch}&quot;</span>
          </div>
        )}
        {(loading || isDebouncing) ? (
          <div className="text-center text-muted-foreground">Carregando...</div>
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
                image={product.image}
                description={product.description}
                onAddToCart={() => handleAddToCart(product)}
                animationDelay={idx * 80}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
