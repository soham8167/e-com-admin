import { create } from 'zustand'
import type { NavState, SeasonalStoreState, StoreState} from '../type/type'

import c1 from '../assets/images/c1.png';
import c2 from "../assets/images/c4.png";
import c3 from "../assets/images/c2.png";
import c4 from "../assets/images/c3.png";
import c5 from "../assets/images/p3.png";
import c6 from "../assets/images/p2.png";
import c7 from "../assets/images/p1.png";
import c8 from "../assets/images/p4.png";


// for hamburger 

export const useNavStore = create<NavState>((set) => ({
  isOpen:false,
  toggleMenu: () => set((state)=>({isOpen: !state.isOpen}))
}))



// for card store

export const useStore = create<StoreState>((set) =>({
    products: [
    {
      id: 1,
      title: "Ooty Baby Potato",
      image: c1,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 2,
      title: "Ooty Baby Potato",
      image: c4,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 3,
      title: "Ooty Baby Potato",
      image: c2,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 4,
      title: "Ooty Baby Potato",
      image: c3,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
  ],
increment: (id) =>
    set((state) => ({
      products: state.products.map((item) =>
        
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}))






//seasonal food store
export const useSeasonalStore = create<SeasonalStoreState>((set) =>({
    products: [
    {
      id: 1,
      title: "Ooty Baby Potato",
      image: c5,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 2,
      title: "Ooty Baby Potato",
      image: c6,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 3,
      title: "Ooty Baby Potato",
      image: c7,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 4,
      title: "Ooty Baby Potato",
      image: c8,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
  ],
increment: (id) =>
    set((state) => ({
      products: state.products.map((item) =>
        
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}))







