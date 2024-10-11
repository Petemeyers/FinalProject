/* eslint-env node */
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") }); // Load environment variables

import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";
import OpenAI from "openai";

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
console.log("PORT:", process.env.PORT);
console.log("Connecting to MongoDB...");
console.log("MongoDB URI:", process.env.MONGODB_URI);

const app = express();
connectDB();

const openai = new OpenAI({
  apiKey: "sk-your_actual_openai_api_key_here", // Hardcode to test
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Example chat endpoint using the hardcoded OpenAI API key
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message content is missing" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();
    res.json({ message: aiResponse });
  } catch (error) {
    if (error.code === "insufficient_quota" || error.status === 429) {
      console.error("Rate limit exceeded:", error);
      res.status(429).json({
        message:
          "You have exceeded your current quota. Please check your plan and billing details or try again later.",
      });
    } else {
      console.error("Error generating response from OpenAI:", error);
      res.status(500).json({
        message:
          "An internal server error occurred while communicating with OpenAI.",
      });
    }
  }
});
