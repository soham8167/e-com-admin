import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../type/cardStoretype";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === product.id && i.variantId === product.variantId
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id && i.variantId === product.variantId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      increment: (id, variantId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variantId === variantId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decrement: (id, variantId) =>
        set((state) => {
          const item = state.items.find(
            (i) => i.id === id && i.variantId === variantId
          );

          if (!item) return state;

          if (item.quantity === 1) {
            return {
              items: state.items.filter(
                (i) => !(i.id === id && i.variantId === variantId)
              ),
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === id && i.variantId === variantId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        }),

      removeItem: (id, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variantId === variantId)
          ),
        })),
    }),
    {
      name: "bhoomi-cart-storage",
    }
  )
);



