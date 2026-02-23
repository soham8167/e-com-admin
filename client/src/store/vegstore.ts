// for vegstore
import { create } from 'zustand'

import c1 from '../assets/images/c1.png';
import c2 from "../assets/images/c2.png";
import c3 from "../assets/images/c3.png";
import z3 from "../assets/images/z3.png";
import z2 from "../assets/images/z2.png";
import z1 from "../assets/images/z1.png";
import z4 from "../assets/images/z4.png";
import z5 from "../assets/images/z5.png";
import z6 from "../assets/images/z6.png";
import z7 from "../assets/images/z7.png";
import z8 from "../assets/images/z8.png";
import z9 from "../assets/images/z9.png";
import z10 from "../assets/images/z10.png";
import z11 from "../assets/images/z11.png";
import z12 from '../assets/images/made.svg'
import z13 from '../assets/images/v1.svg'
import type { vegStoreState } from "../type/vegtype";

export const vegStore = create<vegStoreState>((set) =>({
    products: [
    {
      id: 1,
      title: "Ooty Baby Potato",
      image: c1,
      icon1:z12,
      weight: "500 gms",
      originalPrice: 120,
      price: 40,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "500 gms", price: 40 },
        { id: 2, weight: "1.5 Kg", price: 120 },
      ],
    },
    {
      id: 2,
      title: "Carrot with Leaves",
      image: z3,
      icon1:z12,
      icon2:z13,
      weight: "500gms",
      discount: 20,
      quantity: 1,
      bestSeller: true,
      msg:"Out of Stock"
    },
    {
      id: 3,
      title: "Dry Fruit Laddus",
      image: z2,
      icon1:z12,
      weight: "300 gms",
      originalPrice: 120,
      price: 160,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "300 gms", price: 160 },
        { id: 2, weight: "1 Kg", price: 600 },
      ],
    },
    {
      id: 4,
      title: "Drumstick",
      image: z1,
      icon1:z12,
      icon2:z13,
      weight: "150 gms",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "150 gms", price: 120 },
        { id: 2, weight: "500 gms", price: 300 },
      ],
    },
    {
      id: 5,
      title: "Bottle gourd",
      image: z10,
      icon1:z12,
      icon2:z13,
      weight: "600 gms",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
       variants: [
        { id: 1, weight: "600 gms", price: 80 },
        { id: 2, weight: "1 kg", price: 100 },
      ],
    },
    {
      id: 6,
      title: "Gongura",
      image: z4,
      icon1:z12,
      weight: "250 gms",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
    },
    {
      id: 7,
      title: "Methi-Fenugreek",
      image: z1,
      icon1:z12,
      weight: "200 gms",
      originalPrice: 60,
      price: 40,
      discount: 20,
      quantity: 1,
      bestSeller: true,
       variants: [
        { id: 1, weight: "200 gms", price: 40 },
        { id: 2, weight: "500 gms", price: 100 },
      ],
    },
    {
      id: 8,
      title: "Brinjal Green Long",
      image: c2,
      icon1:z12,
      weight: "350 gms",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "350 gms", price: 80 },
        { id: 2, weight: "500 gms", price: 100 },
      ],
    },
    {
      id: 9,
      title: "Banana Flower",
      image: c3,
      icon1:z12,
      weight: "1 piece",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      variants: [
        { id: 1, weight: "1 piece", price: 80 },
        { id: 2, weight: "5 piece", price: 350 },
      ],
    },
    {
      id: 10,
      title: "Cauliflower Big",
      image: z9,
      icon1:z12,
      weight: "1 kg",
      originalPrice: 120,
      price: 80,
      discount: 20,
      quantity: 1,
      variants: [
        { id: 1, weight: "1 kg", price: 120 },
        { id: 2, weight: "2 kg", price: 200 },
      ],
    },
    {
      id: 11,
      title: "Black Pepper",
      image: z8,
      icon1:z12,
      weight: "100 gms",
      originalPrice: 143,
      price: 129,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "100 gms", price: 129 },
        { id: 2, weight: "500 gms", price: 500 },
      ],
    },
    {
      id: 12,
      title: "Amaranth Chikki",
      image: z7,
      icon1:z12,
      weight: "3 piece",
      originalPrice: 200,
      price: 159,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "3 piece", price: 159 },
        { id: 2, weight: "5 piece", price: 249 },
      ],
    },
    {
      id: 13,
      title: "Ginger Snaps",
      image: z6,
      icon1:z12,
      weight: "100 gms",
      price: 99,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "100 gms", price: 99 },
        { id: 2, weight: "500 gms", price: 499 },
      ],
    },
    {
      id: 14,
      title: "Masala Cashew Nuts",
      image: z5,
      icon1:z12,
      weight: "150 gms",
      originalPrice: 343,
      price: 299,
      discount: 20,
      quantity: 1,
      variants: [
        { id: 1, weight: "150 gms", price: 299 },
        { id: 2, weight: "500 gms", price: 699 },
      ],
    },
    {
      id: 15,
      title: "Tomato Oval",
      image: z11,
      icon1:z12,
      weight: "500 gms",
      originalPrice: 60,
      price: 35,
      discount: 20,
      quantity: 1,
      bestSeller: true,
      variants: [
        { id: 1, weight: "500 gms", price: 60 },
        { id: 2, weight: "1 kg", price: 100 },
      ],
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











