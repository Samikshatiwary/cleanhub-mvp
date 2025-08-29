import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="min-w-0">
        <div className="text-sm text-gray-500">{product.category}</div>
        <div className="font-medium truncate">{product.name}</div>
        <div className="text-sm font-semibold">₹ {Number(product.price).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Edit</button>
        <button onClick={onDelete} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;