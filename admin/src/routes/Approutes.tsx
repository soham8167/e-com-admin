import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
          <AdminDashboard/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
