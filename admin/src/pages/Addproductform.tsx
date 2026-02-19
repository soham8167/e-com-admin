import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface Props {
  onDone: () => void;
  editData?: any;
  onCancelEdit?: () => void;
  categories: any[];
}

export default function AddProductForm({
  onDone,
  editData,
  onCancelEdit,
  categories
}: Props) {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fill form when editing
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setPrice(editData.price || "");
      setDescription(editData.description || "");
      setCategory(editData.category || "");
    }
  }, [editData]);

  const reset = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    onCancelEdit && onCancelEdit();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", title);
      data.append("price", price);
      data.append("description", description);
      data.append("category", category);
      if (image) data.append("image", image);

      if (editData) {
        await api.put(`/products/${editData._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      reset();
      onDone();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 shadow rounded grid gap-3">

      <h2 className="text-xl font-semibold">
        {editData ? "Update Product" : "Add Product"}
      </h2>

      {/* Title */}
      <input
        required
        placeholder="Product Title"
        className="border p-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* Price */}
      <input
        required
        type="number"
        placeholder="Price"
        className="border p-2"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      {/* ✅ Dynamic Category Select */}
      <select
        required
        className="border p-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>

        {categories.map(c => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Image */}
      <input
        type="file"
        className="border p-2"
        onChange={(e: any) => setImage(e.target.files[0])}
      />

      {/* Description */}
      <textarea
        required
        placeholder="Description"
        className="border p-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          disabled={loading}
          className="bg-black text-white py-2 rounded w-full"
        >
          {loading ? "Saving..." : editData ? "Update" : "Add Product"}
        </button>

        {editData && (
          <button
            type="button"
            onClick={reset}
            className="border px-4 rounded"
          >
            Cancel
          </button>
        )}
      </div>

    </form>
  );
}
