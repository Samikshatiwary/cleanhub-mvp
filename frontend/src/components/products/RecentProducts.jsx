import React, { useEffect, useState } from "react";
import { listProducts } from "../../services/productServices";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

const RecentProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await listProducts({ page: 1, limit: 6, sortBy: "createdAt", sortOrder: "desc" });
        setItems(data.products || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingSpinner label="Loading recent products..." />;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} onClick={() => nav(`/user/products/${p._id}`)} />
      ))}
    </div>
  );
};

export default RecentProducts;