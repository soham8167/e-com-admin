// for counting type

export interface NavState{
    isOpen:boolean;
    toggleMenu:() => void;
}



// Product type
export interface Product {
  id: number;
  title: string;
  image: string;
  weight: string;
  originalPrice: number;
  price: number;
  discount: number;
  quantity: number;
  bestSeller?: boolean;
}

// Store type
export interface StoreState {
  products: Product[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}



// seasonal product


export interface SeasonalProduct {
  id: number;
  title: string;
  image: string;
  weight: string;
  originalPrice: number;
  price: number;
  discount: number;
  quantity: number;
  bestSeller?: boolean;
}

// Store type
export interface SeasonalStoreState {
  products: SeasonalProduct[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}


