import React from "react";
import { Input } from "@/components/ui/input";

interface ProductSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({ search, setSearch }) => (
  <div className="w-full flex items-center justify-center animate-fade-in delay-100">
    <Input
      type="text"
      placeholder="Buscar produto por nome, marca, categoria..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full shadow text-base px-4 py-2 border border-gray-300 focus:border-primary/70 bg-white dark:bg-gray-800 rounded-full transition-all duration-150"
      aria-label="Buscar produto"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
    />
  </div>
);
