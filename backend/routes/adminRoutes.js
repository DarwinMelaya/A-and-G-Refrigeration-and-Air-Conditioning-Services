const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Inventory = require("../models/Inventory");

const router = express.Router();

// Register Admin (one-time use to create admin)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Verify Token (Middleware)
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  // Expecting "Bearer <token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Protected Route Example
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

// Add Inventory Item (Admin only)
router.post("/inventory", verifyToken, async (req, res) => {
  try {
    const { name, price, picture, description } = req.body;
    if (!name || !price || !picture || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create new inventory item
    const newItem = new Inventory({ name, price, picture, description });
    await newItem.save();
    res
      .status(201)
      .json({ message: "Inventory item added successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all Inventory Items (Admin only)
router.get("/inventory", verifyToken, async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Token verification endpoint
router.get("/verify", verifyToken, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;
