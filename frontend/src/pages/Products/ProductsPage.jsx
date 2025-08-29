import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/productServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProduct(id);
        setItem(p);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!item) return <div className="text-center py-10 text-gray-500">Product not found</div>;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 h-80" />
      <div>
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <div className="text-gray-500">{item.category}</div>
        <div className="mt-2 text-2xl font-bold">₹ {Number(item.price).toLocaleString()}</div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.description || "—"}</p>
        <button className="mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
          Add to cart
        </button>
      </div>
    </div>
  );
}