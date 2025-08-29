require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

(async () => {
  try {
    const {
      MONGO_URL,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      ADMIN_NAME = "Super Admin",
    } = process.env;

    if (!MONGO_URL) throw new Error("MONGO_URL missing in .env");
    if (!ADMIN_EMAIL) throw new Error("ADMIN_EMAIL missing in .env");
    if (!ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD missing in .env");

    await mongoose.connect(MONGO_URL);
    console.log(" MongoDB connected");
    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      user = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashed,
        role: "admin",
      });
      console.log(" Admin created:", user.email);
    } else if (user.role !== "admin") {
      user.role = "admin";
      await user.save();
      console.log(" Existing user promoted to admin:", user.email);
    } else {
      console.log(" Admin already exists:", user.email);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(" Error seeding admin:", err.message);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  }
})();