
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











import { useEffect, useRef, useState } from "react";
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

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // empty default

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  /* ================= EDIT LOAD ================= */

  useEffect(() => {
    if (editData) {
      setShowForm(true);
      setTitle(editData.title || "");
      setPrice(editData.price || "");
      setDescription(editData.description || "");
      setCategory(""); // do not preselect category
      setPreview(editData.image || "");
      setImage(null);
      setImageError("");
    }
  }, [editData]);

  /* ================= IMAGE VALIDATION ================= */

  const handleImageChange = (file: File | null) => {
    setImage(null);
    setPreview("");
    setImageError("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedTypes.includes(file.type) || !allowedExt.includes(ext)) {
      setImageError("Only JPG, JPEG, PNG, WEBP images are allowed");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image size must be less than 2MB");
      if (fileRef.current) fileRef.current.value = "";
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
    setCategory(""); // reset category
    setImage(null);
    setPreview("");
    setImageError("");
    setShowForm(false);

    if (fileRef.current) fileRef.current.value = "";
    onCancelEdit && onCancelEdit();
  };

  /* ================= SUBMIT ================= */

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageError) {
      alert(imageError);
      return;
    }

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
        await api.put(`/products/${editData._id}`, data);
      } else {
        await api.post("/products", data);
      }

      reset();
      onDone();

    } catch (err: any) {
      alert(err?.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BUTTON VIEW ================= */

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
  className="bg-white p-6 shadow-md rounded-md max-w-md mx-auto grid gap-4"
>
  <h2 className="text-lg font-semibold text-gray-800">
    {editData ? "Update Product" : "Add Product"}
  </h2>

  {/* Product Title */}
  <input
    required
    placeholder="Product Title"
    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
    value={title}
    onChange={e => setTitle(e.target.value)}
  />

  {/* Price */}
  <input
    required
    type="number"
    placeholder="Price"
    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
    value={price}
    onChange={e => setPrice(e.target.value)}
  />

  {/* Category */}
  <select
    required
    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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

  {/* Image Upload */}
  <div>
    <input
      ref={fileRef}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      className="border border-gray-300 p-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={e => handleImageChange(e.target.files?.[0] || null)}
    />
    {imageError && (
      <p className="text-red-600 text-xs mt-1">{imageError}</p>
    )}
  </div>

  {/* Image Preview */}
  {preview && (
    <img
      src={preview}
      className="w-24 h-24 object-cover rounded border mt-2"
    />
  )}

  {/* Description */}
  <textarea
    required
    placeholder="Description"
    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none h-24"
    value={description}
    onChange={e => setDescription(e.target.value)}
  />

  {/* Buttons */}
  <div className="flex gap-2">
    <button
      disabled={loading || !!imageError}
      className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50 text-sm flex-1"
    >
      {loading ? "Saving..." : editData ? "Update" : "Save"}
    </button>

    <button
      type="button"
      onClick={reset}
      disabled={loading}
      className="cursor-pointer border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 text-sm flex-1"
    >
      Cancel
    </button>
  </div>
</form>

  );
}
