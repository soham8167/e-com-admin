import { useState } from "react";
import { api } from "../api/axios";

interface Props {
  onDone: () => void;
}

export default function AdminCategoryForm({ onDone }: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* ================= IMAGE UPLOAD ================= */

  const handleImage = (file: File | null) => {
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Image must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ================= SUBMIT ================= */

  const submit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    if (!image) {
      alert("Category image required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/categories", {
        name: name.trim().toLowerCase(),
        image
      });

      alert("Category created");

      setName("");
      setImage("");
      setPreview("");
      setOpen(false);

      onDone(); // reload category list
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
      >
        + Add Category
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-gray-900 p-4 rounded mt-4 space-y-3"
    >
      <h3 className="font-semibold text-sm">
        Create Category
      </h3>

      {/* NAME */}

      <input
        className="w-full p-2 rounded text-black"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
      />

      {/* IMAGE */}

      <input
        type="file"
        accept="image/*"
        onChange={e => handleImage(e.target.files?.[0] || null)}
        disabled={loading}
        className="text-sm"
      />

      {/* PREVIEW */}

      {preview && (
        <img
          src={preview}
          className="h-20 w-20 object-cover rounded border"
        />
      )}

      {/* ACTIONS */}

      <div className="flex gap-2">

        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={loading}
          className="flex-1 bg-gray-600 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>

      </div>
    </form>
  );
}
