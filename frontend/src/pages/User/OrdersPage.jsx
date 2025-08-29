import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { formatDate, formatINR } from "../../utils/formatDate";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/orderServices"; 

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMyOrders();         
      setOrders(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-sm text-gray-500">You haven't placed any orders yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
          <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Order #</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
                <th className="px-4 py-2 text-left font-medium">Items</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {orders.map((o) => (
                <tr key={o._id} className="bg-white dark:bg-gray-900">
                  <td className="px-4 py-2">{o._id?.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-2">{formatDate(o.createdAt)}</td>
                  <td className="px-4 py-2">{o.items?.reduce((a, b) => a + b.qty, 0)}</td>
                  <td className="px-4 py-2 capitalize">{o.status || "processing"}</td>
                  <td className="px-4 py-2 text-right font-semibold">{formatINR(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}