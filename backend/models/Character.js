import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  species: { type: String, required: true },
  social: { type: String, required: true },
  level: { type: Number, required: true },
  attributes: {
    IQ: Number,
    ME: Number,
    MA: Number,
    PS: Number,
    PP: Number,
    PE: Number,
    PB: Number,
    SPD: Number,
    HP: Number,
  },
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
