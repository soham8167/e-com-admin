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
  const [loading, setLoading] = useState(true);

  

  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch (e) {
      console.error("Logout error", e);
    }
    nav("/");
  };

  

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (e) {
      console.error("Load products failed", e);
    } finally {
      setLoading(false);
    }
  };

  

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");

      // add ALL at top
      setCategories([
        { _id: "all", name: "all", image: "" },
        ...res.data
      ]);
    } catch (e) {
      console.error("Load categories failed", e);
    }
  };

  

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  };

  

  const filtered =
    category === "all"
      ? products
      : products.filter(
          p =>
            (p.category || "").toLowerCase() ===
            category.toLowerCase()
        );

  

  return (
    <div className="flex min-h-screen bg-gray-100">

      

      <aside className="w-64 bg-black text-white p-6 flex flex-col">

        <h2 className="text-xl font-bold mb-4">
          Admin Panel
        </h2>


        <AdminCategoryForm onDone={loadCategories} />


        <div className="space-y-2 mt-6 flex-1 overflow-y-auto">

          {categories.map(c => (
            <button
              key={c._id}
              onClick={() => setCategory(c.name)}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded transition ${
                category === c.name
                  ? "bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {/* category image */}
              {c.image && c.name !== "all" && (
                <img
                  src={c.image}
                  className="w-6 h-6 object-cover rounded"
                />
              )}

              <span className="truncate">
                {c.name.toUpperCase()}
              </span>
            </button>
          ))}

        </div>


        <button
          onClick={logout}
          className="bg-red-600 px-3 py-2 rounded w-full mt-6 hover:bg-red-700"
        >
          Logout
        </button>

      </aside>


      <main className="flex-1 p-8">


        <AddProductForm
          onDone={loadProducts}
          editData={editData}
          onCancelEdit={() => setEditData(null)}
          categories={categories.filter(c => c.name !== "all")}
        />


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

              {loading && (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    Loading products...
                  </td>
                </tr>
              )}

              {!loading && filtered.map(p => (
                <tr key={p._id} className="border-t">

                  <td className="p-3">
                    <img
                      src={p.image || "/no-image.png"}
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
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => del(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

              {!loading && filtered.length === 0 && (
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
