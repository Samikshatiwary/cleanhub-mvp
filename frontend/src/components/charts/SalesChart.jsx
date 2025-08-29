import React, {useState, useEffect} from "react";
import {Bar, Line, Pie} from "react-chartjs-2";
import axios from "axios";
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

const SalesCharts = () =>{
    const[timeRange, setTimeRange] = useState("week");
    const[salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchSalesData = async() => {
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/sales`,{
                    params:{range: timeRange},
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "Content-Type":"applications/json"
                    }
                });
                setSalesData(response.data);
                setLoading(false);
            } catch(err){
                setError(err.reponse?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchSalesData();
    },[timeRange]);
    const barChartData = {
    labels: salesData?.labels || [],
    datasets: [
      {
        label: 'Sales',
        data: salesData?.values || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: salesData?.labels || [],
    datasets: [
      {
        label: 'Revenue Trend',
        data: salesData?.values || [],
        fill: false,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: salesData?.categories?.map(cat => cat.name) || [],
    datasets: [
      {
        data: salesData?.categories?.map(cat => cat.value) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Data (${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})`,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sales Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={barChartData} options={options} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={lineChartData} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-1">
          <Pie data={pieChartData} options={options} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Sales Summary</h3>
          {salesData?.summary ? (
            <div className="space-y-2">
              <p>Total Sales: ${salesData.summary.totalSales.toFixed(2)}</p>
              <p>Average Order Value: ${salesData.summary.avgOrderValue.toFixed(2)}</p>
              <p>Total Orders: {salesData.summary.totalOrders}</p>
              <p>Top Selling Product: {salesData.summary.topProduct}</p>
            </div>
          ) : (
            <p>No summary data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;