// src/components/layout/AdminSidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Boxes,
  Users,
  ClipboardList,
  TicketPercent,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar = ({ open = false, onClose = () => {} }) => {
  const { logout } = useAuth();

  
  const [catalogOpen, setCatalogOpen] = useState(true);
  const [salesOpen, setSalesOpen] = useState(true);
  const [analyticsOpen, setAnalyticsOpen] = useState(true);

  
  const [collapsed, setCollapsed] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition
     ${isActive
       ? "bg-blue-600 text-white"
       : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}`;

  
  const labelCls = collapsed
    ? "md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:delay-75"
    : "opacity-100 translate-x-0";

  const subWrapCls = collapsed
    ? "md:max-h-0 md:overflow-hidden md:group-hover:max-h-72 md:transition-all md:duration-300"
    : "max-h-full";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${open ? "block" : "hidden"}`}
      />

      <aside
        className={[
          "fixed z-50 md:static top-0 left-0 h-full",
          "w-72 md:transition-all md:duration-200 md:ease-in-out",
          collapsed ? "md:w-20 md:group" : "md:w-72 md:group",
          "bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-600" />
            <span className={["font-bold text-blue-600 text-lg transition-all", labelCls].join(" ")}>
              Admin
            </span>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Collapse sidebar"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>


        <nav className="flex-1 flex flex-col gap-1">
          <NavLink to="/admin/dashboard" className={linkClasses} onClick={onClose}>
            <LayoutDashboard size={18} />
            <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>
              Dashboard
            </span>
          </NavLink>

          <button
            onClick={() => setCatalogOpen((s) => !s)}
            className="flex items-center justify-between px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-expanded={catalogOpen}
          >
            <span className="flex items-center gap-3">
              <Package size={18} />
              <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>
                Catalog
              </span>
            </span>
            <ChevronDown
              size={18}
              className={[
                "transition-transform",
                catalogOpen ? "rotate-180" : "",
                collapsed ? "md:opacity-0 md:group-hover:opacity-100" : "opacity-100",
              ].join(" ")}
            />
          </button>

          <div className={["ml-9 flex flex-col gap-1", catalogOpen ? "block" : "hidden md:block", subWrapCls].join(" ")}>
            <NavLink to="/admin/products" className={linkClasses} onClick={onClose}>
              <Grid3X3 size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Manage Products</span>
            </NavLink>
            <NavLink to="/admin/categories" className={linkClasses} onClick={onClose}>
              <Boxes size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Categories</span>
            </NavLink>
            <NavLink to="/admin/inventory" className={linkClasses} onClick={onClose}>
              <ClipboardList size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Inventory</span>
            </NavLink>
          </div>

        
          <NavLink to="/admin/users" className={linkClasses} onClick={onClose}>
            <Users size={18} />
            <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>
              Manage Users
            </span>
          </NavLink>


          <button
            onClick={() => setSalesOpen((s) => !s)}
            className="flex items-center justify-between px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-expanded={salesOpen}
          >
            <span className="flex items-center gap-3">
              <ClipboardList size={18} />
              <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>Sales</span>
            </span>
            <ChevronDown
              size={18}
              className={[
                "transition-transform",
                salesOpen ? "rotate-180" : "",
                collapsed ? "md:opacity-0 md:group-hover:opacity-100" : "opacity-100",
              ].join(" ")}
            />
          </button>

          <div className={["ml-9 flex flex-col gap-1", salesOpen ? "block" : "hidden md:block", subWrapCls].join(" ")}>
            <NavLink to="/admin/orders" className={linkClasses} onClick={onClose}>
              <ClipboardList size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Orders</span>
            </NavLink>
            <NavLink to="/admin/coupons" className={linkClasses} onClick={onClose}>
              <TicketPercent size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Coupons</span>
            </NavLink>
          </div>

    
          <button
            onClick={() => setAnalyticsOpen((s) => !s)}
            className="flex items-center justify-between px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-expanded={analyticsOpen}
          >
            <span className="flex items-center gap-3">
              <BarChart3 size={18} />
              <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>Analytics</span>
            </span>
            <ChevronDown
              size={18}
              className={[
                "transition-transform",
                analyticsOpen ? "rotate-180" : "",
                collapsed ? "md:opacity-0 md:group-hover:opacity-100" : "opacity-100",
              ].join(" ")}
            />
          </button>

          <div className={["ml-9 flex flex-col gap-1", analyticsOpen ? "block" : "hidden md:block", subWrapCls].join(" ")}>
            <NavLink to="/admin/reports" className={linkClasses} onClick={onClose}>
              <PieChart size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Reports</span>
            </NavLink>
            <NavLink to="/admin/analytics/sales" className={linkClasses} onClick={onClose}>
              <LineChart size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Sales</span>
            </NavLink>
            <NavLink to="/admin/analytics/stats" className={linkClasses} onClick={onClose}>
              <BarChart3 size={16} />
              <span className={["text-sm transition-all", labelCls].join(" ")}>Stats</span>
            </NavLink>
          </div>

          
          <NavLink to="/admin/settings" className={linkClasses} onClick={onClose}>
            <Settings size={18} />
            <span className={["whitespace-nowrap transition-all", labelCls].join(" ")}>
              Settings
            </span>
          </NavLink>
        </nav>

        
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="mt-3 flex items-center gap-3 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          title="Logout"
        >
        
          <Settings className="opacity-0 pointer-events-none" size={18} />
          <span className={["transition-all mx-auto", labelCls].join(" ")}>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;