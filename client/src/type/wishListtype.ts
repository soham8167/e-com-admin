export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  weight: string;
  variantId: number;
}

export interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}