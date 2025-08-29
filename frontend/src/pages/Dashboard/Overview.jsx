import React from "react";
import RecentProducts from "../../components/products/RecentProducts";

export default function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <RecentProducts />
    </div>
  );
}