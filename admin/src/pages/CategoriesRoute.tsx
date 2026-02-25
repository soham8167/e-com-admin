import { useEffect, useState } from "react";
import { api } from "../api/axios";
import CategoriesPage from "../components/Categorymodel";

interface Category {
  _id: string;
  name: string;
  image?: string;
  createdAt?: string;
}

// ─── CategoriesRoute 


export default function CategoriesRoute() {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories([{ _id: "all", name: "all" }, ...res.data]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoriesPage
      categories={categories}
      onRefresh={loadCategories}
    />
  );
}
