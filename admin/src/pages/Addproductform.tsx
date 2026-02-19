
// import { useEffect, useState } from "react";
// import { api } from "../api/axios";

// interface Props {
//   onDone: () => void;
//   editData?: any;
//   onCancelEdit?: () => void;
// }

// export default function AddProductForm({ onDone, editData, onCancelEdit }: Props) {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Fruits");
 
//   const [image, setImage] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setTitle(editData.title);
//       setPrice(editData.price);
//       setDescription(editData.description);
//       setCategory(editData.category);
      
//     }
//   }, [editData]);

//   const reset = () => {
//     setTitle("");
//     setPrice("");
//     setDescription("");
//     setCategory("");
   
//     setImage(null);
//     onCancelEdit && onCancelEdit();
//   };

//   const submit = async (e: any) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("title", title);
//       data.append("price", price);
//       data.append("description", description);
//       data.append("category", category);
      
//       if (image) data.append("image", image);

//       if (editData) {
//         await api.put(`/products/${editData._id}`, data, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       } else {
//         await api.post("/products", data, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       }

//       reset();
//       onDone();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={submit} className="bg-white p-6 shadow rounded grid gap-3">
//       <h2 className="text-xl font-semibold">
//         {editData ? "Update Product" : "Add Product"}
//       </h2>

//       <input
//         required
//         placeholder="Product Title"
//         className="border p-2"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <input
//         required
//         type="number"
//         placeholder="Price"
//         className="border p-2"
//         value={price}
//         onChange={e => setPrice(e.target.value)}
//       />

      

//       <select
//         className="border p-2"
//         value={category}
//         onChange={e => setCategory(e.target.value)}
//       >
//         <option value="Fruits">Fruits</option>
//         <option value="Veggies">Veggies</option>
//         <option value="Combos">Combos</option>
//         <option value="books">Books</option>
//         <option value="sports">Sports</option>
//         <option value="toys">Toys</option>
        
//       </select>

//       <input
//         type="file"
//         className="border p-2"
//         onChange={(e: any) => setImage(e.target.files[0])}
//       />

//       <textarea
//         required
//         placeholder="Description"
//         className="border p-2"
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//       />

//       <div className="flex gap-3">
//         <button
//           disabled={loading}
//           className="bg-black text-white py-2 rounded w-full"
//         >
//           {loading ? "Saving..." : editData ? "Update" : "Add Product"}
//         </button>

//         {editData && (
//           <button
//             type="button"
//             onClick={reset}
//             className="border px-4 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }














import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface Category {
  _id: string;
  name: string;
}

interface Props {
  onDone: () => void;
  editData?: any;
  onCancelEdit?: () => void;
  categories: Category[];
}

export default function AddProductForm({
  onDone,
  editData,
  onCancelEdit,
  categories
}: Props) {

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);

  /* ================= OPEN FORM ON EDIT ================= */

  useEffect(() => {
    if (editData) {
      setShowForm(true);
      setTitle(editData.title || "");
      setPrice(editData.price || "");
      setDescription(editData.description || "");
      setCategory(editData.category || "");
      setPreview(editData.image || "");
      setImage(null);
    }
  }, [editData]);

  /* ================= IMAGE VALIDATION ================= */

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG, WEBP images allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= RESET ================= */

  const reset = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    setPreview("");
    setShowForm(false);
    onCancelEdit && onCancelEdit();
  };

  /* ================= SUBMIT ================= */

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Please select category");
      return;
    }

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

    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BUTTON FIRST ================= */

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="bg-black text-white px-5 py-3 rounded shadow hover:bg-gray-800"
      >
        + Add Product
      </button>
    );
  }

  /* ================= FORM ================= */

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 shadow rounded grid gap-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">
        {editData ? "Update Product" : "Add Product"}
      </h2>

      {/* TITLE */}
      <input
        required
        placeholder="Product Title"
        className="border p-2 rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* PRICE */}
      <input
        required
        type="number"
        placeholder="Price"
        className="border p-2 rounded"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      {/* CATEGORY */}
      <select
        required
        className="border p-2 rounded"
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

      {/* IMAGE */}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="border p-2 rounded"
        onChange={e => handleImageChange(e.target.files?.[0] || null)}
      />

      {/* PREVIEW */}
      {preview && (
        <img
          src={preview}
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {/* DESCRIPTION */}
      <textarea
        required
        placeholder="Description"
        className="border p-2 rounded"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* ACTIONS */}
      <div className="flex gap-3">

        <button
          disabled={loading}
          className="bg-black text-white py-2 rounded w-full hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Saving..." : editData ? "Update" : "Save"}
        </button>

        <button
          type="button"
          onClick={reset}
          disabled={loading}
          className="border px-4 rounded hover:bg-gray-100"
        >
          Cancel
        </button>

      </div>
    </form>
  );
}
