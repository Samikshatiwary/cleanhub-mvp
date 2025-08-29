import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../layout/UserLayout";

export const UserRoutes = ({ children }) => (
  <Route
    path="/user"
    element={
      <ProtectedRoute allow={["user"]}>
        <UserLayout />
      </ProtectedRoute>
    }
  >
    {children}
  </Route>
);

export default UserRoutes;