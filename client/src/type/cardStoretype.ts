export interface CartItem {
  id: string;               
  variantId: number;
  title: string;
  price: number | undefined;
  image: string;
  weight: string | undefined;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;

  increment: (id: string, variantId: number) => void;   
  decrement: (id: string, variantId: number) => void;   
  removeItem: (id: string, variantId: number) => void;  
}