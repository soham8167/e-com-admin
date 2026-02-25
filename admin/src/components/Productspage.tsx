

import { useState } from "react";
import { api } from "../api/axios";
import AddProductForm from "./Addproductform";
import { IconPlus } from "./icons/Adminicon";

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

interface ProductsPageProps {
  products?: Product[];
  categories?: Category[];
  loading?: boolean;
  onRefresh?: () => void;
}

/*  Product Modal  */

function ProductModal({
  onClose,
  onDone,
  editData,
  categories,
}: {
  onClose: () => void;
  onDone: () => void;
  editData: Product | null;
  categories: Category[];
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            {editData ? "Edit Product" : "Add Product"}
          </h3>
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          <AddProductForm
            onDone={onDone}
            editData={editData}
            onCancelEdit={onClose}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

/* Products Page  */

export default function ProductsPage({
  products = [],
  categories = [],
  loading = false,
  onRefresh = () => {},
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [editData, setEditData] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const realCategories = categories.filter((c) => c._id !== "all");

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    onRefresh();
  };

  const openAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditData(p);
    setShowModal(true);
  };

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) =>
            (p.category || "").toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Products
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-700 transition"
        >
          <IconPlus /> Add New
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[{ _id: "all", name: "All" }, ...realCategories].map((c) => {
          const isActive =
            c._id === "all"
              ? activeCategory === "all"
              : activeCategory === c.name;

          return (
            <button
              key={c._id}
              onClick={() =>
                setActiveCategory(c._id === "all" ? "all" : c.name)
              }
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition whitespace-nowrap ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3 text-left">Title</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400">
                  Loading products...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition border-t border-gray-50"
                >
                  <td className="px-5 py-4">
                    <img
                      src={p.image || "/no-image.png"}
                      alt={p.title}
                      className="h-11 w-11 rounded-xl object-cover bg-gray-100"
                    />
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-800">
                    {p.title}
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold text-gray-900">
                    ₹{p.price.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => del(p._id)}
                        className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductModal
          editData={editData}
          categories={realCategories}
          onClose={() => setShowModal(false)}
          onDone={() => {
            onRefresh();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}