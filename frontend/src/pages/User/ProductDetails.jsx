import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/productServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { addToCart } from "../../utils/storage";
import { formatINR } from "../../utils/formatDate";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setP(await getProduct(id)); } 
      catch { toast.error("Failed to load product"); } 
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!p) return <div className="text-center text-gray-500">Product not found</div>;

  const add = () => {
    addToCart({ _id: p._id, name: p.name, price: p.price, category: p.category }, qty);
    toast.success("Added to cart");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 h-80" />
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="text-gray-500">{p.category}</div>
        <div className="mt-2 text-2xl font-bold">{formatINR(p.price)}</div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{p.description || "—"}</p>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            className="w-20 text-center rounded border"
          />
          <button onClick={add} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}