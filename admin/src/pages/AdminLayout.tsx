import { useState, type JSX } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { api } from "../api/axios";
import {
  IconGrid,
  IconBox,
  IconFolder,
  IconMenu,
} from "../components/icons/Adminicon";

// ─── Nav config 

const NAV_ITEMS: { label: string; icon: JSX.Element; path: string }[] = [
  { label: "Dashboard",  icon: <IconGrid />,   path: "/dashboard" },
 
  { label: "Categories", icon: <IconFolder />, path: "/categories" },
   { label: "Products",   icon: <IconBox />,    path: "/products" },
];

// ─── AdminLayout 

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = async () => {
    try { await api.post("/admin/logout"); } catch {}
    nav("/");
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "#f4f5f7",
        fontFamily: "'DM Sans', 'Nunito Sans', system-ui, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <aside
        className="shrink-0 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 overflow-hidden"
        style={{ width: sidebarOpen ? 220 : 0 }}
      >
      
        <div className="h-14 flex items-center gap-3 px-5 border-b border-gray-100 shrink-0">
          <span className="font-bold text-sm text-gray-900 whitespace-nowrap tracking-tight">
            E-Commerce Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-2 mb-2">
            Platform
          </p>
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={
                    isActive
                      ? { background: "#111827", color: "#fff" }
                      : { color: "#6b7280" }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User + Logout */}
        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">Admin</p>
              <p className="text-[11px] text-gray-400 truncate">admin@gmail.com</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full border border-gray-200 rounded-xl py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <IconMenu />
          </button>
        </header>

        {/* Nested route content renders here */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
