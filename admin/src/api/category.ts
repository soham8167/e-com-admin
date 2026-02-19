import { api } from "./axios";

export const getCategories = () =>
  api.get("/categories");

export const createCategory = (formData: FormData) =>
  api.post("/categories", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`);
