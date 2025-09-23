export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  freeShipping?: boolean;
  color?: string;
  stock?: number;
};

export type Comment = {
  id: string;
  user: string;
  rating: number;
  comment?: string;
};
