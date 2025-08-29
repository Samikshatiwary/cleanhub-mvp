import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./pages/public/PublicLayout";
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicHomepage from "./pages/public/PublicHomepage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UserDashboard from "./pages/User/UserDashboard";
import ProductListing from "./pages/User/ProductListing";
import ProductDetails from "./pages/User/ProductDetails";
import CartPage from "./pages/User/CartPage";
import Checkout from "./pages/User/Checkout";
import OrdersPage from "./pages/User/OrdersPage";
import Overview from "./pages/Dashboard/Overview";
import UserReports from "./pages/Dashboard/Reports";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminReports from "./pages/Admin/Reports";
import AddEditProduct from "./components/products/AddEditProduct";
import EditProductPage from "./pages/Products/EditProduct";
import ErrorPage from "./pages/Misc/ErrorPage";
import NotFound from "./pages/Misc/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />

          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<PublicHomepage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route
              path="/user"
              element={
                <ProtectedRoute allow={["user"]}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="overview" element={<Overview />} />
              <Route path="reports" element={<UserReports />} />
              <Route path="products" element={<ProductListing />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute allow={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="products/add" element={<AddEditProduct />} />
              <Route path="products/edit/:id" element={<EditProductPage />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="unauthorized" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}