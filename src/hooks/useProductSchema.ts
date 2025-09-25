import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  price: z.number().min(0, "Preço deve ser maior que 0"),
  image: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
  description: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  freeShipping: z.boolean().optional(),
  color: z.string().optional(),
  stock: z.number().min(0).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
