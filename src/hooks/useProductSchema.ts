import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  price: z.number().min(0, "Preço obrigatório"),
  image: z.string().url("URL da imagem inválida").optional(),
  description: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
