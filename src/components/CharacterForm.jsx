import React, { useState } from 'react';
import AttributeRoller from './AttributeRoller';
import CharacterDisplay from './CharacterDisplay';

const CharacterForm = ({ onCharacterCreate }) => {
  const [species, setSpecies] = useState('');
  const [attributes, setAttributes] = useState({});
  const [name, setName] = useState('');

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleAttributeRoll = () => {
    // Call AttributeRoller function with species
    const rolledAttributes = AttributeRoller(species);
    setAttributes(rolledAttributes);
  };

  const handleSubmit = () => {
    const newCharacter = { name, species, attributes };
    onCharacterCreate(newCharacter); // pass character to parent component or database
  };

  return (
    <div>
      <h2>Create a Character</h2>
      <select onChange={handleSpeciesChange}>
        <option value="">Select Species</option>
        <option value="Human">Human</option>
        <option value="Elf">Elf</option>
        {/* Add other species */}
      </select>
      
      <button onClick={handleAttributeRoll}>Roll Attributes</button>
      
      <input
        type="text"
        value={name}
        placeholder="Character Name"
        onChange={(e) => setName(e.target.value)}
      />

      <CharacterDisplay attributes={attributes} />

      <button onClick={handleSubmit}>Finish Character</button>
    </div>
  );
};

export default CharacterForm;
