

export interface Variant {
  id: number;
  weight: string;
  price: number;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  icon1: string;
  icon2?: string;
  weight ? : string;
  originalPrice?:number;
  price?:number;
  discount?:number;
  variants?: Variant[];   
  quantity: number;
  bestSeller?: boolean;
  msg?: string;
}

export interface vegStoreState {
  products: Product[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}
