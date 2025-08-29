import React from "react";
import RecentProducts from "../../components/products/RecentProducts";

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back </h1>
      <div>
        <h2 className="text-lg font-semibold mb-2">Recently added</h2>
        <RecentProducts />
      </div>
    </div>
  );
}