const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {protect, requireRole} = require("../middleware/authMiddleware");

router.get("/",  async (req, res) => {
    try {
        let {
            page = 1,
            limit = 5,
            sortBy = "",
            sortOrder = "desc",
            search = "",
            category = ""
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const filter = {};
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }
        if (category && category !== "All") {
            filter.category = category;
        }

        const sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = sortOrder === "asc" ? 1 : -1;
        } else {
            sortOption.createdAt = -1; 
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({ products, totalPages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", protect, requireRole("admin"), async (req, res) => {
    try {
        const { name, price, category } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", protect, requireRole("admin"), async (req, res) => {
    try {
        const { name, price, category } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, price, category });
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id",protect, requireRole("admin"),  async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;