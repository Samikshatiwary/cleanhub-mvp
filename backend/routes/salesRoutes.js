const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");

router.use(protect, requireRole("admin"));

const getSalesData = (range) => {
  const now = new Date();
  let labels, values, categories;

  if (range === "week") {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    values = [1200, 1900, 1500, 2000, 1800, 2500, 2200];
    categories = [
      { name: "Electronics", value: 4500 },
      { name: "Clothing", value: 3800 },
      { name: "Home Goods", value: 3200 },
      { name: "Other", value: 2000 },
    ];
  } else if (range === "month") {
    labels = Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
    values = [8500, 9200, 7800, 9500];
    categories = [
      { name: "Electronics", value: 12000 },
      { name: "Clothing", value: 9500 },
      { name: "Home Goods", value: 8500 },
      { name: "Other", value: 4500 },
    ];
  } else {
    labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    values = [12000,15000,14000,16000,18000,20000,22000,21000,19000,20000,23000,25000];
    categories = [
      { name: "Electronics", value: 85000 },
      { name: "Clothing", value: 65000 },
      { name: "Home Goods", value: 55000 },
      { name: "Other", value: 35000 },
    ];
  }
  return {
    labels,
    values,
    categories,
    summary: {
      totalSales: values.reduce((a, b) => a + b, 0),
      avgOrderValue: values.reduce((a, b) => a + b, 0) / (values.length * 10),
      totalOrders: values.length * 10,
      topProduct: "Premium Wideget",
    },
  };
};

router.get("/", (req, res) => {
  try {
    const range = req.query.range || "week";
    const salesData = getSalesData(range);
    res.json(salesData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Error fetching sales data" });
  }
});

module.exports = router;