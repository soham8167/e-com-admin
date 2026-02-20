import { useEffect, useRef, useState } from "react";
import { api } from "../api/axios";
import { toast } from "react-toastify";

interface Props {
  onDone: () => void;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function AdminCategoryForm({ onDone }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);


  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);


  useEffect(() => {
    const handler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);


  const handleImage = (file: File | null) => {
    setImage(null);
    setPreview("");
    setImageError("");

    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setImageError("Only JPG, PNG, WEBP allowed");
      toast.error("Only JPG, PNG, WEBP allowed");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be less than 2MB");
      toast.warning("Image must be less than 2MB");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const reset = () => {
    setName("");
    setImage(null);
    setPreview("");
    setImageError("");
    setOpen(false);
    if (fileRef.current) fileRef.current.value = "";
  };


  const submit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) return toast.warning("Category name required");
    if (!image) return toast.warning("Category image required");
    if (imageError) return toast.error(imageError);

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", name.trim().toLowerCase());
      data.append("image", image);

      await api.post("/categories", data);

      toast.success("Category created");
      reset();
      loadCategories();
      onDone();
    } catch (e: any) {
      toast.error(e?.response?.data?.error || "Create failed");
    } finally {
      setLoading(false);
    }
  };


  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted");
      loadCategories();
      onDone();
    } catch {
      toast.error("Delete failed");
    }
  };


  if (!open) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-gray-300 py-2 rounded cursor-pointer "
        >
          + Add Category
        </button>

        {/* ===== CATEGORY DROPDOWN ===== */}
        <div className="mt-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-gray-300 p-3 rounded flex justify-between items-center"
          >
            <span className="cursor-pointer">View Categories</span>
            <span>▼</span>
          </button>

          {showDropdown && (
            <div className="absolute w-full bg-gray-300 border border-gray-700 rounded mt-2 max-h-64 overflow-y-auto z-50">
              {categories.length === 0 && (
                <p className="p-3 text-sm text-gray-400">
                  No categories found
                </p>
              )}

              {categories.map(cat => (
                <div
                  key={cat._id}
                  className="flex items-center justify-between p-3  border-b border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image}
                      className="h-8 w-8 object-cover rounded"
                    />
                    <span className="capitalize">{cat.name}</span>
                  </div>

                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  /* ================= FORM ================= */

  return (
    <form
      onSubmit={submit}
      className="bg-gray-200 p-4 rounded mt-4 space-y-3"
    >
      <h3 className="font-semibold text-sm">Create Category</h3>

      <input
        className="w-full p-2 rounded text-black border"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={e => handleImage(e.target.files?.[0] || null)}
        disabled={loading}
        className="text-sm"
      />

      {imageError && (
        <p className="text-red-500 text-xs">{imageError}</p>
      )}

      {preview && (
        <img
          src={preview}
          className="h-20 w-20 object-cover rounded border"
        />
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !!imageError}
          className="cursor-pointer flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={reset}
          disabled={loading}
          className="cursor-pointer flex-1 bg-gray-400 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
