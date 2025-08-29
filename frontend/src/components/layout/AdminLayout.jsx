import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
  
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Skip to content
      </a>

      <div className="flex">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex min-h-screen flex-col">
          <AdminNavbar
            onToggleSidebar={() => setSidebarOpen((s) => !s)}
            sidebarOpen={sidebarOpen}
          />

          <main id="main" className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;