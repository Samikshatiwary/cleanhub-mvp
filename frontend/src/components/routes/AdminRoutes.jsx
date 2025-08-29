import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";

const AdminRoutes = ({ children }) => {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute allow={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
    
      <Route index element={<Navigate to="dashboard" replace />} />
      {children}
    </Route>
  );
};

export default AdminRoutes;