import { useState } from "react";
import { api } from "../api/axios";
import AdminCategoryForm from "./AdminCategoryForm";
import { IconPlus } from "./icons/Adminicon";
import { AnimatePresence, motion } from "framer-motion";

// Types 

interface Category {
  _id: string;
  name: string;
  image?: string;
  createdAt?: string;
}

interface CategoriesPageProps { 
  categories?: Category[];
  onRefresh?: () => void;
}

//  CategoryModal

function CategoryModal({
  onClose,
  onDone,
  category,
}: {
  onClose: () => void;
  onDone: () => void;
  category?: Category | null;
}) {
  const isEdit = !!category;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden"
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.18)" }}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.8 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            {isEdit ? "Edit Category" : "Add Category"}
          </h3>
          <button
            onClick={onClose}
            className="h-6 w-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition text-xs"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">
          <AdminCategoryForm
            category={category || undefined}
            onDone={onDone}
            onClose={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// CategoriesPage 

export default function CategoriesPage({
  categories = [],
  onRefresh = () => {},
}: CategoriesPageProps) {

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    onRefresh();
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const real = categories.filter((c) => c._id !== "all");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-700 transition"
        >
          <IconPlus /> Add New
        </button>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.04)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <th className="px-5 py-3.5 text-left w-10"></th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Image
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Name
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Created Date
              </th>
              <th className="px-5 py-3.5 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {real.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400 text-sm">
                  No categories yet — click "+ Add New" to create one.
                </td>
              </tr>
            )}
            {real.map((cat, i) => (
              <tr
                key={cat._id}
                className="group hover:bg-gray-50 transition-colors"
                style={{ borderTop: i === 0 ? "none" : "1px solid #f9fafb" }}
              >
                <td className="px-5 py-4"></td>

                <td className="px-5 py-4">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-11 w-11 rounded-xl object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-xl bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] text-gray-300 font-medium">IMG</span>
                    </div>
                  )}
                </td>

                <td className="px-5 py-4 font-semibold text-gray-800 capitalize">
                  {cat.name}
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {formatDate(cat.createdAt)}
                </td>

                <td className="px-5 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => {
              setShowModal(false);
              setSelectedCategory(null);
            }}
            onDone={() => {
              onRefresh();
              setShowModal(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
