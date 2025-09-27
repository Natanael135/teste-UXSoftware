import React from "react";
import { ProductFiltersCategory } from "./ProductFiltersCategory";
import { ProductFiltersBrand } from "./ProductFiltersBrand";
import { ProductFiltersColor } from "./ProductFiltersColor";
import { ProductFiltersPriceMin } from "./ProductFiltersPriceMin";
import { ProductFiltersPriceMax } from "./ProductFiltersPriceMax";
import { ProductFiltersRating } from "./ProductFiltersRating";
import { ProductFiltersShipping } from "./ProductFiltersShipping";
import { ProductFiltersSort } from "./ProductFiltersSort";

interface ProductFiltersProps {
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories: string[];
  brand: string;
  setBrand: (v: string) => void;
  brands: string[];
  color: string;
  setColor: (v: string) => void;
  colors: string[];
  minRating: string;
  setMinRating: (v: string) => void;
  freeShipping: boolean;
  setFreeShipping: (v: boolean) => void;
  sort: string;
  setSort: (v: string) => void;
  inline?: boolean;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  // search, setSearch,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  category, setCategory, categories,
  brand, setBrand, brands,
  color, setColor, colors,
  minRating, setMinRating,
  freeShipping, setFreeShipping,
  sort, setSort,
  inline = false,
}) => {

  // Filtros JSX
  const filtersContent = (
    <>
      <ProductFiltersCategory category={category} setCategory={setCategory} categories={categories} />
      <ProductFiltersBrand brand={brand} setBrand={setBrand} brands={brands} />
      <ProductFiltersColor color={color} setColor={setColor} colors={colors} />
      <ProductFiltersPriceMin minPrice={minPrice} setMinPrice={setMinPrice} />
      <ProductFiltersPriceMax maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      <ProductFiltersRating minRating={minRating} setMinRating={setMinRating} />
      <ProductFiltersShipping freeShipping={freeShipping} setFreeShipping={setFreeShipping} />
      <ProductFiltersSort sort={sort} setSort={setSort} />
    </>
  );

  // Mobile: se inline, renderiza só os filtros direto (sem modal/botão)
  // Desktop: sempre renderiza direto
  return (
    <div className="w-full mb-8 animate-fade-in delay-150">
      {/* Mobile: renderização condicional */}
      {inline && (
        <div className="block md:hidden">
          {filtersContent}
        </div>
      )}
      {/* Desktop: filtros expandidos em coluna (sidebar) */}
      <div className="hidden md:flex flex-col gap-4 w-full">
        {filtersContent}
      </div>
    </div>
  );

};
