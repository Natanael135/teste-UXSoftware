import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '@/services/api';
import { showError } from '@/utils/toast';
import type { Product } from '@/types/product';

interface UseProductsOptions {
  initialLoad?: boolean;
  page?: number;
  limit?: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  filteredProducts: Product[];
  categories: string[];
  brands: string[];
  colors: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  setPage: (page: number) => void;
  filters: {
    search: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    brand: string;
    freeShipping: boolean;
    minRating: string;
    color: string;
    sort: string;
  };
  setFilters: {
    setSearch: (value: string) => void;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
    setFreeShipping: (value: boolean) => void;
    setMinRating: (value: string) => void;
    setColor: (value: string) => void;
    setSort: (value: string) => void;
  };
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { initialLoad = true, page: initialPage = 1, limit: initialLimit = 12 } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(initialLoad);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLimit] = useState(initialLimit);
  const [totalItems, setTotalItems] = useState(0);

  // Filtros
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);
  const [minRating, setMinRating] = useState('');
  const [color, setColor] = useState('');
  const [sort, setSort] = useState('relevance');
  const setPage = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const totalPages = Math.ceil(totalItems / pageLimit);

  const pagination = {
    page: currentPage,
    limit: pageLimit,
    total: totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };

  const fetchProducts = useCallback(async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageLimit.toString(),
      });

      const res = await api.get<{
        products: Product[];
        page: number;
        limit: number;
        total: number;
      }>(`/products?${params}`);

      const data = Array.isArray(res.products) ? res.products : [];
      setProducts(data);
      setTotalItems(res.total);
      setCurrentPage(res.page);
    } catch {
      setError('Erro ao carregar produtos');
      setProducts([]);
      setTotalItems(0);
      showError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageLimit]);

  useEffect(() => {
    if (initialLoad) {
      fetchProducts();
    }
  }, [initialLoad, fetchProducts]);

  // Listas únicas para filtros
  const categories = useMemo(() =>
    Array.from(new Set(products.map(p => p.category).filter((v): v is string => !!v))),
    [products]
  );

  const brands = useMemo(() =>
    Array.from(new Set(products.map(p => p.brand).filter((v): v is string => !!v))),
    [products]
  );

  const colors = useMemo(() =>
    Array.from(new Set(products.map(p => p.color).filter((v): v is string => !!v))),
    [products]
  );

  // Filtro de produtos sofisticado
  const filteredProducts = useMemo(() => {
    const result = products.filter(product => {
      // Filtro de busca
      if (search.trim()) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filtro de preço mínimo
      if (minPrice && product.price < parseFloat(minPrice)) return false;

      // Filtro de preço máximo
      if (maxPrice && product.price > parseFloat(maxPrice)) return false;

      // Filtro de categoria
      if (category && product.category !== category) return false;

      // Filtro de marca
      if (brand && product.brand !== brand) return false;

      // Filtro de frete grátis
      if (freeShipping && !product.freeShipping) return false;

      // Filtro de avaliação mínima
      if (minRating && (product.rating || 0) < parseFloat(minRating)) return false;

      // Filtro de cor
      if (color && product.color !== color) return false;

      return true;
    });

    // Ordenação
    const sortedResult = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default: // 'relevance'
          return 0;
      }
    });

    return sortedResult;
  }, [products, search, minPrice, maxPrice, category, brand, freeShipping, minRating, color, sort]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    filteredProducts,
    categories,
    brands,
    colors,
    pagination,
    setPage,
    filters: {
      search,
      minPrice,
      maxPrice,
      category,
      brand,
      freeShipping,
      minRating,
      color,
      sort,
    },
    setFilters: {
      setSearch,
      setMinPrice,
      setMaxPrice,
      setCategory,
      setBrand,
      setFreeShipping,
      setMinRating,
      setColor,
      setSort,
    },
  };
}