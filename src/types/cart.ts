export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
  };
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  cartId: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}