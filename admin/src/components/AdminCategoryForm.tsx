import { useRef, useState, useEffect } from "react";
import { api } from "../api/axios";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  name: string;
  image?: string;
}

interface Props {
  onDone: () => void;
  onClose: () => void;
  category?: Category; 
}

export default function AdminCategoryForm({
  onDone,
  onClose,
  category,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const isEdit = !!category;

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");


  useEffect(() => {
    if (category) {
      setName(category.name);
      setPreview(category.image || "");
    }
  }, [category]);

  // Handle image validation
  const handleImage = (file: File | null) => {
    setImage(null);
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
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  //  Submit (Create + Update)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.warning("Category name required");
    if (imageError) return toast.error(imageError);

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", name.trim().toLowerCase());

      // Only append image if new image selected
      if (image) {
        data.append("image", image);
      }

      if (isEdit && category) {
        // 🔥 UPDATE
        await api.put(`/categories/${category._id}`, data);
        toast.success("Category updated");
      } else {
        // 🔥 CREATE
        if (!image) return toast.warning("Category image required");
        await api.post("/categories", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category created");
      }

      reset();
      onDone();
      onClose();
    } catch (e: any) {
      toast.error(e?.response?.data?.msg || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
          Category Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex. Veggies"
          disabled={loading}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition disabled:opacity-60"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
          Image {!isEdit && <span className="text-red-400">*</span>}
        </label>

        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden
          ${imageError ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"}
          ${preview ? "h-36" : "h-28"}`}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-xs font-medium">
                Click to upload image
              </span>
              <span className="text-[10px]">
                JPG, PNG, WEBP · max 2MB
              </span>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={loading}
            onChange={(e) =>
              handleImage(e.target.files?.[0] || null)
            }
          />
        </label>

        {imageError && (
          <p className="mt-1.5 text-xs text-red-500">
            {imageError}
          </p>
        )}

        {preview && (
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setPreview("");
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="mt-1.5 text-xs text-gray-400 hover:text-gray-700 underline"
          >
            Remove image
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !!imageError}
          className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading ? "Saving..." : isEdit ? "Update Category" : "Save Category"}
        </button>
      </div>
    </form>
  );
}