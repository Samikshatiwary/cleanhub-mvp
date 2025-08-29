import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";            
import { listProducts, deleteProduct } from "../../services/productServices";
import LoadingSpinner from "../ui/LoadingSpinner";
import SearchBar from "../ui/SearchBar";
import PopupModal from "../ui/PopupModal";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const navigate = useNavigate();                           

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");


  const [sortBy, setSortBy] = useState("");          
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [limit, setLimit] = useState(8);              

  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await listProducts({
        page,
        limit,                 
        search: q,
        category: category || "",
        sortBy,                
        sortOrder,        
      });
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchList();
    
  }, [page, q, category, sortBy, sortOrder, limit]);

  const onDelete = async () => {
    try {
      await deleteProduct(confirm.id); 
      setConfirm({ open: false, id: null });
      fetchList();
    } catch (e) {
      setConfirm({ open: false, id: null });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          onSearch={(value) => {
            setPage(1);
            setQ(value);
          }}
          placeholder="Search products..."
        />

      
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            title="Filter by category"
          >
            <option value="">All categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home Goods</option>
            <option>Other</option>
          </select>

          
          <select
            value={sortBy}
            onChange={(e) => {
              setPage(1);
              setSortBy(e.target.value);
            }}
            className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            title="Sort by"
          >
            <option value="">Sort by (latest)</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="createdAt">Created</option>
          </select>

        
          <select
            value={sortOrder}
            onChange={(e) => {
              setPage(1);
              setSortOrder(e.target.value);
            }}
            className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            title="Order"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

        
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            title="Items per page"
          >
            <option value={8}>8 / page</option>
            <option value={12}>12 / page</option>
            <option value={24}>24 / page</option>
          </select>

      
          <button
            onClick={() => navigate("/admin/products/add")}
            className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <div className="text-sm text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => (
            <ProductItem
              key={p._id}
              product={p}
              onEdit={() => navigate(`/admin/products/edit/${p._id}`)}  
              onDelete={() => setConfirm({ open: true, id: p._id })}
            />
          ))}
        </div>
      )}

    
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Prev
        </button>
        <div className="text-sm">
          Page {page} / {totalPages}
        </div>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <PopupModal
        open={confirm.open}
        title="Delete product?"
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={onDelete}
        confirmText="Delete"
      >
        <p className="text-sm">This action cannot be undone.</p>
      </PopupModal>
    </div>
  );
};

export default ProductList;