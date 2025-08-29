import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-left w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition bg-white dark:bg-gray-900"
    >
      <div className="h-36 rounded-lg bg-gray-100 dark:bg-gray-800 mb-3" />
      <div className="text-xs text-gray-500">{product.category}</div>
      <div className="font-semibold truncate">{product.name}</div>
      <div className="mt-1 font-bold"> {Number(product.price).toLocaleString()}</div>
    </button>
  );
};

export default ProductCard;