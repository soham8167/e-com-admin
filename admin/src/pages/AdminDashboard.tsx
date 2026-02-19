// import { useEffect, useState } from "react";
// import { api } from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import AddProductForm from "./Addproductform";

// export default function AdminDashboard() {
//   const nav = useNavigate();
//   const [products, setProducts] = useState<any[]>([]);
//   const [category, setCategory] = useState("all");
//   const [editData, setEditData] = useState<any>(null);

//   const categories = [
//     "all",
//     "fruits",
//     "veggies",
//     "combos",
//     "books",
//     "sports",
//     "toys",
//   ];

//   const logout = async () => {
//     await api.post("/admin/logout");
//     nav("/");
//   };

//   const load = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const del = async (id: string) => {
//     if (!confirm("Delete this product?")) return;
//     await api.delete(`/products/${id}`);
//     load();
//   };

//   const filtered =
//     category === "all"
//       ? products
//       : products.filter(
//           p => (p.category || "").toLowerCase() === category.toLowerCase()
//         );

//   return (
//     <div className="flex min-h-screen">

//       {/* Sidebar */}
//       <aside className="w-64 bg-black text-white p-6 space-y-4">
//         <h2 className="text-xl font-bold">Admin Panel</h2>

//         {categories.map(c => (
//           <button
//             key={c}
//             onClick={() => setCategory(c)}
//             className={`block w-full text-left px-3 py-2 rounded ${
//               category === c ? "bg-gray-700" : "bg-gray-900"
//             }`}
//           >
//             {c.toUpperCase()}
//           </button>
//         ))}

//         <button
//           onClick={logout}
//           className="bg-red-600 px-3 py-2 rounded w-full mt-6"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 bg-gray-50">

//         <AddProductForm
//           onDone={load}
//           editData={editData}
//           onCancelEdit={() => setEditData(null)}
//         />

//         {/* Table */}
//         <div className="mt-10 bg-white shadow rounded overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Image</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3">Category</th>
//                 <th className="p-3">Price</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map(p => (
//                 <tr key={p._id} className="border-t">
//                   <td className="p-3">
//                     <img
//                       src={p.image}
//                       className="h-14 w-14 object-cover rounded"
//                     />
//                   </td>

//                   <td className="p-3 font-medium">{p.title}</td>
//                   <td className="p-3 text-center">{p.category}</td>
//                   <td className="p-3 text-center">₹{p.price}</td>

//                   <td className="p-3 text-center space-x-2">
//                     <button
//                       onClick={() => setEditData(p)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => del(p._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center p-6 text-gray-500">
//                     No products in this category
//                   </td>
//                 </tr>
//               )}

//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }



















import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./Addproductform";
import AdminCategoryForm from "./AdmincategoryForm";

export default function AdminDashboard() {
  const nav = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [editData, setEditData] = useState<any>(null);

  /* ---------------- LOGOUT ---------------- */

  const logout = async () => {
    await api.post("/admin/logout");
    nav("/");
  };

  /* ---------------- LOAD PRODUCTS ---------------- */

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  /* ---------------- LOAD CATEGORIES ---------------- */

  const loadCategories = async () => {
    const res = await api.get("/categories");
    // add "all" manually on top
    setCategories([{ _id: "all", name: "all" }, ...res.data]);
  };

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  /* ---------------- DELETE PRODUCT ---------------- */

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  /* ---------------- FILTER ---------------- */

  const filtered =
    category === "all"
      ? products
      : products.filter(
          p => (p.category || "").toLowerCase() === category.toLowerCase()
        );

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen">

      {/* ---------------- SIDEBAR ---------------- */}

      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        {/* Category Create Form */}
        <AdminCategoryForm onDone={loadCategories} />

        {/* Dynamic Categories */}
        <div className="space-y-2 mt-6">
          {categories.map(c => (
            <button
              key={c._id}
              onClick={() => setCategory(c.name)}
              className={`block w-full text-left px-3 py-2 rounded ${
                category === c.name ? "bg-gray-700" : "bg-gray-900"
              }`}
            >
              {c.name.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-2 rounded w-full mt-6"
        >
          Logout
        </button>
      </aside>

      {/* ---------------- MAIN ---------------- */}

      <main className="flex-1 p-8 bg-gray-50">

        {/* Product Form */}
        <AddProductForm
          onDone={loadProducts}
          editData={editData}
          onCancelEdit={() => setEditData(null)}
          categories={categories.filter(c => c.name !== "all")}
        />

        {/* ---------------- TABLE ---------------- */}

        <div className="mt-10 bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-center">Category</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map(p => (
                <tr key={p._id} className="border-t">

                  <td className="p-3">
                    <img
                      src={p.image}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {p.title}
                  </td>

                  <td className="p-3 text-center">
                    {p.category}
                  </td>

                  <td className="p-3 text-center">
                    ₹{p.price}
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => setEditData(p)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => del(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No products in this category
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
