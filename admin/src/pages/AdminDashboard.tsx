import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./Addproductform";
import AdminCategoryForm from "./AdmincategoryForm";

interface Category {
  _id: string;
  name: string;
  image?: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
}

export default function AdminDashboard() {
  const nav = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("all");
  const [editData, setEditData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch {}
    nav("/");
  };

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

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const filtered =
    category === "all"
      ? products
      : products.filter(
          p => (p.category || "").toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="flex min-h-screen bg-white text-black">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white border transition-all duration-300 overflow-hidden flex flex-col`}
      >

        <div className="p-5  flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className=" px-2 py-1 rounded hover:bg-black hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 ">
          <AdminCategoryForm onDone={loadCategories} />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {categories.map(c => (
            <button
              key={c._id}
              onClick={() => setCategory(c.name)}
              className={`w-full text-left px-3 py-2 rounded  cursor-pointer hover:bg-black hover:text-white ${
                category === c.name ? "font-semibold" : ""
              }`}
            >
              {c.name.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="p-4 ">
          <button
            onClick={logout}
            className="border w-full py-2 rounded font-semibold hover:bg-black hover:text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1">

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="m-6  px-3 py-2 rounded hover:bg-black hover:text-white cursor-pointer"
          >
            ☰
          </button>
        )}

        {/* CENTERED CONTENT */}
        <div className="max-w-5xl mx-auto pt-8 px-4">

          {/* PRODUCT FORM */}
          <div className=" rounded-lg p-6 mb-10">
            <AddProductForm
              onDone={loadProducts}
              editData={editData}
              onCancelEdit={() => setEditData(null)}
              categories={categories.filter(c => c.name !== "all")}
            />
          </div>

          {/* TABLE */}
          <div className=" rounded-lg overflow-hidden">

            <table className="w-full text-sm">

              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-center">Category</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td colSpan={5} className="text-center p-8">
                      Loading products...
                    </td>
                  </tr>
                )}

                {!loading &&
                  filtered.map(p => (
                    <tr key={p._id} className="border-t">

                      <td className="p-3">
                        <img
                          src={p.image || "/no-image.png"}
                          className="h-14 w-14 object-cover border rounded"
                        />
                      </td>

                      <td className="p-3 font-semibold">{p.title}</td>

                      <td className="p-3 text-center">
                        <span className="border px-3 py-1 rounded text-xs">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-3 text-center font-semibold">
                        ₹{p.price}
                      </td>

                      <td className="p-3 text-center space-x-2">

                        <button
                          onClick={() => setEditData(p)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => del(p._id)}
                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-gray-500">
                      No products in this category
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>

        </div>
      </main>
    </div>
  );
}