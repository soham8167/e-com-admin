import { useEffect, useState } from "react";
import { api } from "../api/axios";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isBestSeller?: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true); 

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
};