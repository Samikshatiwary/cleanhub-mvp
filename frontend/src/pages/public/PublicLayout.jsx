import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <PublicNavbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
          <Outlet />
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;