// CharacterForm Component
import React from 'react';

import { useState } from 'react';
import PropTypes from 'prop-types';
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
    const rolledAttributes = AttributeRoller(species);
    setAttributes(rolledAttributes);
  };

  const handleSubmit = () => {
    const newCharacter = { name, species, attributes };
    onCharacterCreate(newCharacter);
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

CharacterForm.propTypes = {
  onCharacterCreate: PropTypes.func.isRequired,
};

export default CharacterForm;