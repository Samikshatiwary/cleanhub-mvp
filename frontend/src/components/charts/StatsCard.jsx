import React, {useState, useEffect} from "react";
import axios from "axios";
import {ArrowUpIcon, ArrowDownIcon, CurrencyDollarIcon, ShoppingBagIcon, UsersIcon, ChartBarIcon}
from "@heroicons/react/24/outline";
const StatsCard = ({ title, value, change, icon, isCurrency = false }) => {
  const IconComponent = {
    revenue: CurrencyDollarIcon,
    sales: ShoppingBagIcon,
    customers: UsersIcon,
    growth: ChartBarIcon,
  }[icon] || CurrencyDollarIcon;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-center mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {isCurrency ? `$${value.toLocaleString()}` : value.toLocaleString()}
            </p>
            {change !== undefined && (
              <span
                className={`flex items-center ml-2 text-sm font-medium 
                ${change >= 0 ? 'text-green-600' : 'text-red-600'}`} >
                {change >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                {Math.abs(change)}%
              </span>
            )}
          </div>
        </div>
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
const StatsCards = () =>{
    const[stats, setStats] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() =>{
        const fetchStats = async() =>{
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/stats",{
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "content-Type":"application/json"
                    }
                });
                setStats(response.data);
                setLoading(false);
            }catch(err){
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse h-24"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Revenue"
        value={stats?.totalRevenue || 0}
        change={stats?.revenueChange || 0}
        icon="revenue"
        isCurrency
      />
      <StatsCard
        title="Total Sales"
        value={stats?.totalSales || 0}
        change={stats?.salesChange || 0}
        icon="sales"
      />
      <StatsCard
        title="New Customers"
        value={stats?.newCustomers || 0}
        change={stats?.customerChange || 0}
        icon="customers"
      />
      <StatsCard
        title="Growth"
        value={stats?.growthRate || 0}
        icon="growth"
      />
    </div>
  );

};
export default StatsCards;
