"use client";

import { ProductItem } from "../ProductItem";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
    </div>
  );
}