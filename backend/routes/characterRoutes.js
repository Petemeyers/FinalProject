import express from "express";
import Character from "../models/Character.js";

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

// GET character by ID
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: "Character not found." });
    }
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res
      .status(500)
      .json({ message: "Server Error: Unable to retrieve character." });
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

// PUT update character by ID
router.put("/:id", async (req, res) => {
  const { name, age, species, social, level, attributes } = req.body;

  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      { name, age, species, social, level, attributes },
      { new: true, runValidators: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found." });
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error("Error updating character:", error);
    res
      .status(500)
      .json({ message: "Server Error: Unable to update character." });
  }
});

// DELETE character by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);

    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found." });
    }

    res.status(200).json({ message: "Character deleted successfully." });
  } catch (error) {
    console.error("Error deleting character:", error);
    res
      .status(500)
      .json({ message: "Server Error: Unable to delete character." });
  }
});

export default router;
