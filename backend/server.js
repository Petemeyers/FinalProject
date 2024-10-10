/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB.js";
import characterRoutes from "./routes/characterRoutes.js";
import cors from "cors";
import OpenAI from "openai";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use("/api/characters", characterRoutes);

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
      res
        .status(429)
        .json({
          message:
            "You have exceeded your current quota. Please check your plan and billing details or try again later.",
        });
    } else {
      console.error("Error generating response from OpenAI:", error);
      res
        .status(500)
        .json({
          message:
            "An internal server error occurred while communicating with OpenAI.",
        });
    }
  }
});
