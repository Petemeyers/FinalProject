/* eslint-env node */
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
// Debugging step to check if the environment variable is loaded
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB.js";
import characterRoutes from "./routes/characterRoutes.js";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Setup OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your OpenAI API key is stored in the .env file
});

// Routes
app.use("/api/characters", characterRoutes);

// Add the /chat route with OpenAI integration
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message content is missing" });
  }

  try {
    // Send the user's message to OpenAI API and get a response
    const response = await openai.chat.completions.create({
      model: "gpt-4", // You can use "gpt-4" if available
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Get the AI-generated response text
    const aiResponse = response.choices[0].message.content.trim();

    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error generating response from OpenAI:", error);
    res.status(500).json({ message: "Error generating response from AI." });
  }
});

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
