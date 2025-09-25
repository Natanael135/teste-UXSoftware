import React from "react";
import { ProductSearchBarInput } from "./ProductSearchBarInput";

interface ProductSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({ search, setSearch }) => (
  <div className="w-full flex items-center justify-center animate-fade-in delay-100">
    <ProductSearchBarInput search={search} setSearch={setSearch} />
  </div>
);
