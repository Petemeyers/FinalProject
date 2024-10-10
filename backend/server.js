/* eslint-env node */
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB.js";
import characterRoutes from "./routes/characterRoutes.js";

import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  

 
// Routes
app.use("/api/characters", characterRoutes);

// Default route for unknown paths
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred." });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
