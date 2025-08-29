import React from "react";
import ProductList from "../../components/products/ProductList";

export default function ManageProducts() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <ProductList />
    </div>
  );
}