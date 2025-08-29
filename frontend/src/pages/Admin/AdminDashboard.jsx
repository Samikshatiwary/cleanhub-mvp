import React, { useEffect, useState } from "react";
import { fetchStats } from "../../services/reportServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatsCard from "../../components/charts/StatsCard";
import SalesChart from "../../components/charts/SalesChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = await fetchStats(); 
        setStats(s);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard title="Revenue" value={`₹ ${stats?.totalRevenue?.toLocaleString()}`} change={stats?.revenueChange} />
            <StatsCard title="Total Sales" value={stats?.totalSales} change={stats?.salesChange} />
            <StatsCard title="New Customers" value={stats?.newCustomers} change={stats?.customerChange} />
          </div>

        
          <SalesChart range={range} />
        </>
      )}
    </div>
  );
}