const express = require("express");
const {protect, requireRole} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, requireRole("user", "admin"));

router.get("/profile", (req, res) => {
    res.json({message:"User profile data", user: req.user});
});

module.exports = router;