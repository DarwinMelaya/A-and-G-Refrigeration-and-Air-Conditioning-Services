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
    const { name, price, picture, description, stock } = req.body;
    if (!name || !price || !picture || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create new inventory item
    const newItem = new Inventory({
      name,
      price,
      picture,
      description,
      stock: stock ?? 0,
    });
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

// Update an Inventory Item (Admin only)
router.put("/inventory/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, picture, description, stock } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = price;
    if (picture !== undefined) updates.picture = picture;
    if (description !== undefined) updates.description = description;
    if (stock !== undefined) updates.stock = stock;

    const updated = await Inventory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Inventory item updated", item: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete an Inventory Item (Admin only)
router.delete("/inventory/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inventory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Increment stock for an inventory item
router.patch("/inventory/:id/stock", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body; // positive or negative to adjust
    const { id } = req.params;
    const incrementBy = Number(amount);
    if (!Number.isFinite(incrementBy)) {
      return res.status(400).json({ message: "amount must be a number" });
    }

    const updated = await Inventory.findByIdAndUpdate(
      id,
      { $inc: { stock: incrementBy } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Item not found" });
    if (updated.stock < 0) {
      // rollback if negative
      await Inventory.findByIdAndUpdate(id, { $inc: { stock: -incrementBy } });
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    res.status(200).json({ message: "Stock updated", item: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Token verification endpoint
router.get("/verify", verifyToken, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;
