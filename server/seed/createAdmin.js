require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/AdminModel");
const { hashPassword } = require("../utils/hash");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const email = process.env.ADMIN_EMAIL || "adminn@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "Admin@123";

    //  check if already exists
    const exists = await Admin.findOne({ email });

    if (exists) {
      console.log(" Admin already exists");
      process.exit();
    }

    const hashed = await hashPassword(password);

    await Admin.create({
      email,
      password: hashed,
    });

    console.log(" Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
})();
