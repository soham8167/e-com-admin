import { useState } from "react";
import { createCategory } from "../api/category";

export default function AdminCategoryForm({ onDone }: any) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const submit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    if (image) fd.append("image", image);

    await createCategory(fd);

    setName("");
    setImage(null);
    onDone();
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">Add Category</h3>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="file"
        onChange={e => setImage(e.target.files?.[0] || null)}
      />

      <button className="bg-black text-white px-4 py-2 mt-3 rounded">
        Add Category
      </button>
    </form>
  );
}
