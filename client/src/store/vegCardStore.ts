import {create} from 'zustand'
import c1 from '../assets/images/z15.png';
import c2 from "../assets/images/z14.png";
import c3 from "../assets/images/z13.png";
import c4 from "../assets/images/z12.png";
import c5 from "../assets/images/z16.png";
import type { vegCardState } from '../type/vegcardtype';



export const vegcardStore = create<vegCardState>((set) =>({
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
      image: c2,
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
      image: c3,
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
      image: c4,
      weight: "1Kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 5,
      title: "Ooty Baby Potato",
      image: c5,
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