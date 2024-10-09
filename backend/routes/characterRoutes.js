import express from "express";
import Character from "../models/Character";

const router = express.Router();

// GET all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res
      .status(500)
      .json({ message: "Server Error: Unable to retrieve characters." });
  }
});

// POST add new character
router.post("/", async (req, res) => {
  const { name, age, species, social, level, attributes } = req.body;

  if (!name || !age || !species || !level || !attributes) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing required fields." });
  }

  try {
    const newCharacter = new Character({
      name,
      age,
      species,
      social,
      level,
      attributes,
    });
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error("Error adding character:", error);
    res.status(500).json({ message: "Server Error: Unable to add character." });
  }
});

export default router;
