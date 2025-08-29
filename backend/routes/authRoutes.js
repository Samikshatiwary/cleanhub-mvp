const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role:"user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", 
    token,user:{id:newUser._id, name:newUser.name, email:newUser.email, role:newUser.role}});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({message:"Login successfully", token,
      user:{id:user_id, name:user.name, email:user.email, role:user.role}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;