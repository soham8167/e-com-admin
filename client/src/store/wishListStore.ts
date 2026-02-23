import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistState } from "../type/wishListtype";



export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        const exists = get().items.find(i => i.id === item.id);
        if (exists) return;

        set({ items: [...get().items, item] });
      },

      removeFromWishlist: (id) =>
        set({
          items: get().items.filter(i => i.id !== id),
        }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
