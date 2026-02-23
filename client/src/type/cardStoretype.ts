
export interface CartItem {
  id: number;           
  variantId : number ;    
  title: string;
  price: number | undefined;
  image: string;
  weight: string | undefined;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increment: (id: number, variantId: number) => void;
  decrement: (id: number, variantId: number) => void;
  removeItem: (id: number, variantId: number) => void;
}
