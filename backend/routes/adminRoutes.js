const express = require("express");
const {protect, requireRole} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, requireRole("admin"));

router.get("/overview", async(req, res) => {
    res.json({
        message:"Admin overview data",
        stats: { users: 50, revenue: 15000, orders: 120}
    });
});

module.exports = router;