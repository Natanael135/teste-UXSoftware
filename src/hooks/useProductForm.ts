import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "./useProductSchema";

export function useProductForm() {
  return useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
}
