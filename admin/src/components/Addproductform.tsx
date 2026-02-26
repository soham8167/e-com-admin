import { useEffect, useRef, useState } from "react";
import { api } from "../api/axios";
import { toast } from "react-toastify";

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

interface Props {
  onDone: () => void;
  editData?: Product | null;
  onCancelEdit?: () => void;
  categories: Category[];
}

export default function AddProductForm({
  onDone,
  editData,
  onCancelEdit,
  categories,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setPrice(String(editData.price || ""));
      setDescription(editData.description || "");
      setCategory(editData.category || "");
      setPreview(editData.image || "");
      setImage(null);
      setImageError("");
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setPreview("");
      setImage(null);
      setImageError("");
    }
  }, [editData]);

  const validateImage = (file: File | null) => {
    setImage(null);
    setPreview("");
    setImageError("");
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (
      !allowedTypes.includes(file.type) ||
      ![".jpg", ".jpeg", ".png", ".webp"].includes(ext)
    ) {
      setImageError("Only JPG, PNG or WEBP files are allowed.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be under 2 MB.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    setPreview("");
    setImageError("");
    if (fileRef.current) fileRef.current.value = "";
    onCancelEdit?.();
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageError) {
      toast.error(imageError);
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Enter a valid price.");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", title);
      fd.append("price", String(parsedPrice));
      fd.append("description", description);
      fd.append("category", category);
      if (image) fd.append("image", image);

      if (editData) {
        await api.put(`/products/${editData._id}`, fd);
        toast.success("Product updated!");
      } else {
        await api.post("/products", fd);
        toast.success("Product added!");
      }

      reset();
      onDone();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Product Title
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="ex.  Headphones"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
              ₹
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Description
          </label>
          <textarea
            placeholder="Short product description…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm min-h-[90px] resize-y focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Product Image
          </label>

          <div
            className={`relative flex items-center gap-4 p-4 rounded-xl border-2 border-dashed cursor-pointer transition ${
              dragOver
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              validateImage(e.dataTransfer.files?.[0] || null);
            }}
          >
            {preview ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setPreview("");
                    setImage(null);

                    if (fileRef.current) {
                      fileRef.current.value = "";
                    }
                  }}
                  className="absolute top-1 right-1 z-10 w-4 h-4 text-[10px] bg-black/60 text-white rounded-full flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"></div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {preview
                  ? "Image selected — click to replace"
                  : "Drop image here or click to browse"}
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP · Max 2 MB</p>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => validateImage(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {imageError && (
            <p className="text-xs text-red-500 font-medium"> {imageError}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-1 sm:col-span-2 flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading || !!imageError}
            className="flex-1 h-10 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition"
          >
            {loading
              ? "Saving..."
              : editData
                ? "Update Product"
                : "Add Product"}
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={loading}
            className="h-10 px-5 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
