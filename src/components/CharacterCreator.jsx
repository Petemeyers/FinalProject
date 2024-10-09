import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';

const CharacterCreator = () => {
  const [species, setSpecies] = useState('HUMAN');
  const [attributes, setAttributes] = useState({});
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(null);
  const [alignment, setAlignment] = useState('Good: Principled');
  const [characterName, setCharacterName] = useState('');
  const [disposition, setDisposition] = useState('');
  const [hostility, setHostility] = useState('');
  const [origin, setOrigin] = useState('');
  const [socialBackground, setSocialBackground] = useState('');

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const rollAttributes = () => {
    // Simulate rolling dice for attributes
    setAttributes({
      IQ: Math.floor(Math.random() * 18) + 1,
      ME: Math.floor(Math.random() * 18) + 1,
      MA: Math.floor(Math.random() * 18) + 1,
      PS: Math.floor(Math.random() * 18) + 1,
      PP: Math.floor(Math.random() * 18) + 1,
      PE: Math.floor(Math.random() * 18) + 1,
      PB: Math.floor(Math.random() * 18) + 1,
      SPD: Math.floor(Math.random() * 18) + 1,
    });
  };

  const rollHP = () => {
    setHp(level * Math.floor(Math.random() * 6) + 1);
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
  };

  const rollDisposition = () => {
    setDisposition('Friendly and Talkative'); // Simulated roll
  };

  const rollHostility = () => {
    setHostility('Distrustful of strangers'); // Simulated roll
  };

  const rollOrigin = () => {
    setOrigin('Northern Mountains'); // Simulated roll
  };

  const rollSocialBackground = () => {
    setSocialBackground('Merchant'); // Simulated roll
  };

  return (
    <div className="container">
      <h1>Character Creator</h1>

      <label htmlFor="species">Choose Species:</label>
      <select id="species" value={species} onChange={handleSpeciesChange}>
        <option value="HUMAN">HUMAN</option>
        <option value="WOLFEN">WOLFEN</option>
        <option value="GOBLIN">GOBLIN</option>
        <option value="HOB_GOBLIN">HOB GOBLIN</option>
        <option value="ORC">ORC</option>
        <option value="OGRE">OGRE</option>
        <option value="TROLL">TROLL</option>
        <option value="TROGLODYTE">TROGLODYTE</option>
        <option value="DWARF">DWARF</option>
        <option value="KOBOLD">KOBOLD</option>
        <option value="ELF">ELF</option>
        <option value="GNOME">GNOME</option>
        <option value="CHANGELING">CHANGELING</option>
      </select>

      <button onClick={rollAttributes}>Roll Attributes</button>

      <table id="attributes-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attributes).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label htmlFor="character-level">Level:</label>
        <input
          type="number"
          id="character-level"
          min="1"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <button onClick={rollHP}>Roll HP</button>
        <div id="final-character-hp">HP: {hp}</div>
      </div>

      <select id="alignment-select" value={alignment} onChange={handleAlignmentChange}>
        <option value="Good: Principled">Good: Principled</option>
        <option value="Good: Scrupulous">Good: Scrupulous</option>
        <option value="Selfish: Unprincipled">Selfish: Unprincipled</option>
        <option value="Selfish: Anarchist">Selfish: Anarchist</option>
        <option value="Evil: Miscreant">Evil: Miscreant</option>
        <option value="Evil: Aberrant">Evil: Aberrant</option>
        <option value="Evil: Diabolic">Evil: Diabolic</option>
      </select>
      <button id="choose-alignment-btn">Choose Alignment</button>

      <p id="final-character-alignment">Alignment: {alignment}</p>

      <button onClick={rollDisposition}>Roll Disposition</button>
      <p id="final-character-disposition">Disposition: {disposition}</p>

      <button onClick={rollHostility}>Roll Personal Hostilities</button>
      <p id="final-character-hostility">Personal Hostility: {hostility}</p>

      <button onClick={rollOrigin}>Roll Land of Origin</button>
      <p id="final-character-origin">Land of Origin: {origin}</p>

      <div id="name-section">
        <label htmlFor="character-name">Enter Character Name:</label>
        <input
          type="text"
          id="character-name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button id="submit-name-btn">Submit</button>
      </div>

      <div id="social-section">
        <h3>Roll for Social Background</h3>
        <button onClick={rollSocialBackground}>Roll Social Background</button>
        <p id="current-social">Social Background: {socialBackground}</p>
      </div>

      <div id="final-character">
        <h2>Final Character</h2>
        <p id="final-character-name">Name: {characterName}</p>
        <table id="final-attributes-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attributes).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CharacterCreator />
  </React.StrictMode>
);

export default CharacterCreator;