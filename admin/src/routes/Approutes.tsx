
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminLayout from "../pages/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import ProductsRoute from "../pages/ProductsRoute";
import CategoriesRoute from "../pages/CategoriesRoute";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/" element={<AdminLogin />} />

      {/* Protected layout */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard"   element={<AdminDashboard />} />
        <Route path="/products"    element={<ProductsRoute />} />
        <Route path="/categories"  element={<CategoriesRoute />} />
      </Route>
    </Routes>
  );
}
