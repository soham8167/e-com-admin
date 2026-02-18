import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/axios";

export default function ProtectedRoute({ children }: any) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    api.get("/admin/me")
      .then(() => setOk(true))
      .catch(() => setOk(false));
  }, []);

  if (ok === null) return <div>Checking...</div>;
  if (!ok) return <Navigate to="/login" />;

  return children;
}
