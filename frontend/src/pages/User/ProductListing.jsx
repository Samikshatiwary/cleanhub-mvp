import React, { useEffect, useState } from "react";
import { listProducts } from "../../services/productServices";
import SearchBar from "../../components/ui/SearchBar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { addToCart } from "../../utils/storage";
import { formatINR } from "../../utils/formatDate";
import toast from "react-hot-toast";

export default function ProductListing() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await listProducts({ page, limit: 12, search: q, category });
      setItems(data.products || []);
      setTotalPages(data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList();}, [page, q, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchBar placeholder="Search eco-friendly products..." onSearch={(v) => { setPage(1); setQ(v); }} />
        <select
          value={category}
          onChange={(e) => { setPage(1); setCategory(e.target.value); }}
          className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        >
          <option value="">All categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home Goods</option>
          <option>Other</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div key={p._id} className="p-4 rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="h-40 rounded bg-gray-100 dark:bg-gray-800 mb-3" />
              <div className="text-xs text-gray-500">{p.category}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="mt-1 font-bold">{formatINR(p.price)}</div>
              <div className="mt-3 flex gap-2">
                <a href={`/user/products/${p._id}`} className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                  View
                </a>
                <button
                  onClick={() => { addToCart(p, 1); toast.success("Added to cart"); }}
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
        <div className="text-sm">Page {page} / {totalPages}</div>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}