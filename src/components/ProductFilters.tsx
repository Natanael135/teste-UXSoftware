import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-semibold text-foreground">Categoria</label>
    <Select value={category || "all"} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Todas" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Marca</label>
  <Select value={brand || "all"} onValueChange={(value) => setBrand(value === "all" ? "" : value)}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Todas" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Todas</SelectItem>
      {brands.map((b) => (
        <SelectItem key={b} value={b}>{b}</SelectItem>
      ))}
    </SelectContent>
  </Select>
  </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Cor</label>
  <Select value={color || "all"} onValueChange={(value) => setColor(value === "all" ? "" : value)}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Todas" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Todas</SelectItem>
      {colors.map((c) => (
        <SelectItem key={c} value={c}>{c}</SelectItem>
      ))}
    </SelectContent>
  </Select>
  </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Preço mín.</label>
        <Input
          type="number"
          min={0}
          placeholder="0"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Preço máx.</label>
        <Input
          type="number"
          min={0}
          placeholder="∞"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Avaliação</label>
  <Select value={minRating || "all"} onValueChange={(value) => setMinRating(value === "all" ? "" : value)}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Todas" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Todas</SelectItem>
      <SelectItem value="4.5">4.5+</SelectItem>
      <SelectItem value="4.0">4.0+</SelectItem>
      <SelectItem value="3.5">3.5+</SelectItem>
    </SelectContent>
  </Select>
  </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Frete grátis</label>
  <div className="flex items-center gap-2">
    <Checkbox
      id="freeShipping"
      checked={freeShipping}
      onCheckedChange={setFreeShipping}
    />
    <label htmlFor="freeShipping" className="text-xs cursor-pointer select-none text-foreground">
      Sim
    </label>
  </div>
  </div>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-xs font-semibold text-foreground">Ordenar por</label>
  <Select value={sort} onValueChange={setSort}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Relevância" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="relevance">Relevância</SelectItem>
      <SelectItem value="price-asc">Menor preço</SelectItem>
      <SelectItem value="price-desc">Maior preço</SelectItem>
      <SelectItem value="rating">Melhor avaliação</SelectItem>
    </SelectContent>
  </Select>
  </div>
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

// (MobileFiltersModal removido)
