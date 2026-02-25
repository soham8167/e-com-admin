import { useEffect, useState } from "react";
import { api } from "../api/axios";
import ProductsPage from "../components/Productspage"; 

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
}

// ProductsRoute 


export default function ProductsRoute() {
  const [products, setProducts]     = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories([{ _id: "all", name: "all" }, ...res.data]);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  return (
    <ProductsPage
      products={products}
      categories={categories}
      loading={loading}
      onRefresh={loadProducts}
    />
  );
}
