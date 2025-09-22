import React from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";

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
}) => {

  // Filtros JSX
  const filtersContent = (
    <>
      <div className="flex flex-col gap-2 w-full md:w-1/5">
  <label className="text-xs font-semibold text-foreground">Categoria</label>
  <select value={category} onChange={e => setCategory(e.target.value)} className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition">
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/5">
  <label className="text-xs font-semibold text-foreground">Marca</label>
  <select value={brand} onChange={e => setBrand(e.target.value)} className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition">
          <option value="">Todas</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/6">
  <label className="text-xs font-semibold text-foreground">Cor</label>
  <select value={color} onChange={e => setColor(e.target.value)} className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition">
          <option value="">Todas</option>
          {colors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-24">
  <label className="text-xs font-semibold text-foreground">Preço mín.</label>
        <Input
          type="number"
          min={0}
          placeholder="0"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-24">
  <label className="text-xs font-semibold text-foreground">Preço máx.</label>
        <Input
          type="number"
          min={0}
          placeholder="∞"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-24">
  <label className="text-xs font-semibold text-foreground">Avaliação</label>
  <select value={minRating} onChange={e => setMinRating(e.target.value)} className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition">
          <option value="">Todas</option>
          <option value="4.5">4.5+</option>
          <option value="4.0">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 w-24">
  <label className="text-xs font-semibold text-foreground">Frete grátis</label>
  <label className="flex items-center gap-1 text-xs cursor-pointer select-none text-foreground">
          <input type="checkbox" checked={freeShipping} onChange={e => setFreeShipping(e.target.checked)} /> Sim
        </label>
      </div>
      <div className="flex flex-col gap-2 w-32">
  <label className="text-xs font-semibold text-foreground">Ordenar por</label>
  <select value={sort} onChange={e => setSort(e.target.value)} className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition">
          <option value="relevance">Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>
    </>
  );

  // Mobile: botão + modal | Desktop: filtros expandidos
  return (
    <div className="w-full mb-8 animate-fade-in delay-150">
      {/* Mobile: botão para abrir modal de filtros */}
      <div className="block md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-2 shadow border border-accent mb-2 hover:bg-accent hover:text-accent-foreground transition">Filtrar produtos</button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-foreground">Filtros</h2>
            <div className="flex flex-col gap-4">{filtersContent}</div>
            <DialogClose asChild>
              <button className="mt-6 w-full bg-primary text-primary-foreground font-semibold rounded-lg py-2 shadow border border-accent hover:bg-accent hover:text-accent-foreground transition">Aplicar filtros</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      {/* Desktop: filtros expandidos */}
  <div className="hidden md:flex rounded-lg bg-background/80 shadow-lg border border-border p-4 flex-row items-end gap-4">
        {filtersContent}
      </div>
    </div>
  );

};
