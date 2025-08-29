const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");


router.use(protect, requireRole("admin"));

const getStatsData = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  return {
    totalRevenue: 125000,
    revenueChange: 12.5,
    totalSales: 1250,
    salesChange: 8.3,
    newCustomers: 84,
    customerChange: 15.7,
  };
};


router.get("/", (req, res) => {
  try {
    const stats = getStatsData();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

module.exports = router;