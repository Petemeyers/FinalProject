import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../app.css';
import { speciesData, ageTable, socialBackgrounds } from './data';
import { rollDice, calculateAttributeRolls, determineCharacterAge } from './util';
import { useNavigate } from 'react-router-dom';

const CharacterCreator = ({ onCharacterCreate = () => {} }) => {
  const navigate = useNavigate();
  const [species, setSpecies] = useState('HUMAN');
  const [attributes, setAttributes] = useState({});
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(null);
  const [alignment, setAlignment] = useState('Good: Principled');
  const [characterName, setCharacterName] = useState('');
  const [origin, setOrigin] = useState('');
  const [socialBackground, setSocialBackground] = useState('');
  const [bonusRolled, setBonusRolled] = useState(false);

  const regenerateAttributes = () => {
    const diceRolls = speciesData[species];
    if (diceRolls) {
      const results = calculateAttributeRolls(diceRolls);
      const updatedAttributes = {};
      Object.keys(results).forEach((attr) => {
        updatedAttributes[attr] = results[attr];
        // Green highlight for 2d6 or 3d6 attributes between 16 and 18
        if (
          attr !== 'SPD' &&
          results[attr] >= 16 &&
          results[attr] <= 18 &&
          ['2d6', '3d6'].includes(diceRolls[attr])
        ) {
          updatedAttributes[`${attr}_highlight`] = 'green';
        } else if (
          (diceRolls[attr] === '4d6' && results[attr] >= 18) ||
          (diceRolls[attr] === '5d6' && results[attr] >= 24)
        ) {
          // Red highlight for 4d6 >= 18 or 5d6 >= 24
          updatedAttributes[`${attr}_highlight`] = 'red';
        } else {
          updatedAttributes[`${attr}_highlight`] = '';
        }
      });
      setAttributes(updatedAttributes);
    }
  };

  const rollBonus = () => {
    if (bonusRolled) return;
    const diceRolls = speciesData[species];
    const updatedAttributes = { ...attributes };
    Object.keys(attributes).forEach((attr) => {
      if (
        attributes[attr] >= 16 &&
        attributes[attr] <= 18 &&
        ['2d6', '3d6'].includes(diceRolls[attr])
      ) {
        updatedAttributes[attr] += rollDice(6, 1);
      }
    });
    setAttributes(updatedAttributes);
    setBonusRolled(true);
  };

  const rollHP = () => {
    const pe = attributes.PE || 0;
    const totalHP = rollDice(6, level) + pe;
    setHp(totalHP);
  };

  const rollAge = () => {
    const ageRoll = rollDice(100, 1);
    const characterAge = determineCharacterAge(species, ageRoll);
    setOrigin(`Age: ${characterAge}`);
  };

  const rollSocialBackground = () => {
    const roll = rollDice(100, 1);
    const background = socialBackgrounds.find(bg => roll >= bg.range[0] && roll <= bg.range[1]).background;
    setSocialBackground(background);
  };

  const handleCreateCharacter = () => {
    if (characterName && species) {
      const newCharacter = {
        name: characterName,
        species,
        attributes,
        level,
        hp,
        alignment,
        origin,
        socialBackground,
      };
      onCharacterCreate(newCharacter);
      navigate('/party-builder'); // Navigate to PartyBuilder after creating a character
      // Reset fields after creation
      setSpecies('HUMAN');
      setAttributes({});
      setLevel(1);
      setHp(null);
      setAlignment('Good: Principled');
      setCharacterName('');
      setOrigin('');
      setSocialBackground('');
      setBonusRolled(false);
    }
  };

  return (
    <div className="container">
      <h1>Character Creator</h1>

      <label htmlFor="species">Choose Species:</label>
      <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)}>
        {Object.keys(speciesData).map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      <button onClick={regenerateAttributes}>Roll Attributes</button>

      <table id="attributes-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attributes).map(([key, value]) =>
            key.endsWith('_highlight') ? null : (
              <tr key={key} style={{ backgroundColor: attributes[`${key}_highlight`] }}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div>
        <label htmlFor="character-level">Level:</label>
        <input
          type="number"
          id="character-level"
          min="1"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value, 10))}
        />
        <button onClick={rollHP}>Roll HP</button>
        <div id="final-character-hp">HP: {hp}</div>
      </div>

      <select id="alignment-select" value={alignment} onChange={(e) => setAlignment(e.target.value)}>
        <option value="Good: Principled">Good: Principled</option>
        <option value="Good: Scrupulous">Good: Scrupulous</option>
        <option value="Selfish: Unprincipled">Selfish: Unprincipled</option>
        <option value="Selfish: Anarchist">Selfish: Anarchist</option>
        <option value="Evil: Miscreant">Evil: Miscreant</option>
        <option value="Evil: Aberrant">Evil: Aberrant</option>
        <option value="Evil: Diabolic">Evil: Diabolic</option>
      </select>

      <button onClick={rollBonus}>Roll Bonus for Attributes</button>
      <button onClick={rollAge}>Roll Age</button>
      <button onClick={rollSocialBackground}>Roll Social Background</button>

      <div id="name-section">
        <label htmlFor="character-name">Enter Character Name:</label>
        <input
          type="text"
          id="character-name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
      </div>

      <button onClick={handleCreateCharacter}>Create Character</button>

      <div id="final-character">
        <h2>Final Character</h2>
        <p>Name: {characterName}</p>
        <table id="final-attributes-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attributes).map(([key, value]) =>
              key.endsWith('_highlight') ? null : (
                <tr key={key} style={{ backgroundColor: attributes[`${key}_highlight`] }}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div>HP: {hp}</div>
        <div>Alignment: {alignment}</div>
        <div>Origin: {origin}</div>
        <div>Social Background: {socialBackground}</div>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

CharacterCreator.propTypes = {
  onCharacterCreate: PropTypes.func,
};

export default CharacterCreator;