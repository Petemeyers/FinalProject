// models/Character.js
import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  attributes: {
    type: Map,
    of: Number,
  },
  level: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
  },
  alignment: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
});

const Character = mongoose.model("Character", characterSchema);
export default Character;
