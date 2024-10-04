import React, { useState } from 'react';
import useChatAPI from './hooks/useChatAPI'; // Correct path to the hook
import useLogin from './hooks/useLogin'; // Import the custom hook
import axios from 'axios';
import './App.css';


const speciesData = { 
    HUMAN: {
        IQ: "3d6",
        ME: "3d6",
        MA: "3d6",
        PS: "3d6",
        PP: "3d6",
        PE: "3d6",
        PB: "3d6",
        SPD: "3d6",
      },
      WOLFEN: {
        IQ: "3d6",
        ME: "3d6",
        MA: "2d6",
        PS: "4d6",
        PP: "3d6",
        PE: "3d6",
        PB: "3d6",
        SPD: "4d6",
      },
      HOB_GOBLIN: {
        IQ: "2d6",
        ME: "4d6",
        MA: "3d6",
        PS: "3d6",
        PP: "3d6",
        PE: "3d6",
        PB: "2d6",
        SPD: "3d6",
      },
      GOBLIN: {
        IQ: "2d6",
        ME: "3d6",
        MA: "3d6",
        PS: "3d6",
        PP: "4d6",
        PE: "3d6",
        PB: "2d6",
        SPD: "3d6",
      },
      ORC: {
        IQ: "2d6",
        ME: "2d6",
        MA: "3d6",
        PS: "4d6",
        PP: "3d6",
        PE: "3d6",
        PB: "3d6",
        SPD: "3d6",
      },
      OGRE: {
        IQ: "3d6",
        ME: "3d6",
        MA: "2d6",
        PS: "4d6",
        PP: "3d6",
        PE: "4d6",
        PB: "2d6",
        SPD: "3d6",
      },
      TROLL: {
        IQ: "3d6",
        ME: "2d6",
        MA: "2d6",
        PS: "5d6",
        PP: "4d6",
        PE: "4d6",
        PB: "2d6",
        SPD: "2d6",
      },
      TROGLODYTE: {
        IQ: "2d6",
        ME: "2d6",
        MA: "3d6",
        PS: "4d6",
        PP: "4d6",
        PE: "3d6",
        PB: "2d6",
        SPD: "5d6",
      },
    
      DWARF: {
        IQ: "3d6",
        ME: "3d6",
        MA: "2d6",
        PS: "4d6",
        PP: "3d6",
        PE: "4d6",
        PB: "2d6",
        SPD: "2d6",
      },
      KOBOLD: {
        IQ: "3d6",
        ME: "2d6",
        MA: "3d6",
        PS: "3d6",
        PP: "4d6",
        PE: "4d6",
        PB: "2d6",
        SPD: "3d6",
      },
      ELF: {
        IQ: "3d6",
        ME: "3d6",
        MA: "2d6",
        PS: "3d6",
        PP: "4d6",
        PE: "3d6",
        PB: "5d6",
        SPD: "3d6",
      },
      GNOME: {
        IQ: "3d6",
        ME: "2d6",
        MA: "3d6",
        PS: "2d6",
        PP: "4d6",
        PE: "4d6",
        PB: "4d6",
        SPD: "2d6",
      },
      CHANGELING: {
        IQ: "2d6",
        ME: "5d6",
        MA: "4d6",
        PS: "3d6",
        PP: "3d6",
        PE: "2d6",
        PB: "2d6",
        SPD: "2d6",
      },
    };

const socialBackgrounds = [
        { range: [1, 10], background: "Sailor/ Fisherman" },
        { range: [11, 17], background: "Craftsman" },
        { range: [18, 24], background: "Serf" },
        { range: [25, 30], background: "Peasant farmer" },
        { range: [31, 36], background: "Farmer" },
        { range: [37, 54], background: "Men at arms" },
        { range: [55, 70], background: "Clergy" },
        { range: [71, 80], background: "Merchant" },
        { range: [81, 90], background: "Scholar/ Magician" },
        { range: [91, 100], background: "Noble" },
      ];
      

function rollDice(sides, number) {
  let total = 0;
  for (let i = 0; i < number; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

function App() {
  const [species, setSpecies] = useState('HUMAN');
  const [attributes, setAttributes] = useState({});
  const [age, setAge] = useState(null);
  const [social, setSocial] = useState('');
  const [hp, setHp] = useState(null);
  const [level, setLevel] = useState(1);
  const [name, setName] = useState('');
  
  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
    regenerateAttributes(event.target.value);
  };

  const regenerateAttributes = (species) => {
    const diceRolls = speciesData[species];
    const results = {};
    for (const [attr, dice] of Object.entries(diceRolls)) {
      const [numDice, sides] = dice.split("d").map(Number);
      results[attr] = rollDice(sides, numDice);
    }
    setAttributes(results);
  };

  const rollBonus = () => {
    const diceRolls = speciesData[species];
    const updatedAttributes = { ...attributes };
    for (const attr in updatedAttributes) {
      if (
        updatedAttributes[attr] >= 16 &&
        updatedAttributes[attr] <= 18 &&
        ["2d6", "3d6"].includes(diceRolls[attr])
      ) {
        updatedAttributes[attr] += rollDice(6, 1);
      }
    }
    setAttributes(updatedAttributes);
  };

  const rollAge = () => {
    const ageTable = {
        HUMAN: [16, 19, 22, 24, 26, 28, 30, 34],
        WOLFEN: [16, 19, 22, 24, 26, 28, 30, 34],
        GOBLIN: [16, 19, 22, 24, 26, 28, 30, 34],
        HOB_GOBLIN: [16, 19, 22, 24, 26, 28, 30, 34],
        ORC: [16, 19, 22, 24, 26, 28, 30, 34],
        OGRE: [18, 22, 26, 28, 30, 34, 38, 42],
        TROLL: [18, 22, 26, 28, 30, 34, 38, 42],
        TROGLODYTE: [18, 22, 26, 28, 30, 34, 38, 42],
        DWARF: [20, 25, 30, 35, 40, 50, 60, 70],
        KOBOLD: [20, 25, 30, 35, 40, 50, 60, 70],
        GNOME: [20, 25, 30, 35, 40, 50, 60, 70],
        ELF: [20, 24, 28, 30, 50, 80, 100, 200],
        CHANGELING: [20, 24, 28, 30, 50, 80, 100, 200],
      };

    const ageValues = ageTable[species];
    const ageRoll = rollDice(100, 1);
    let characterAge;

    if (ageRoll <= 17) {
    characterAge = ageValues[0];
  } else if (ageRoll <= 28) {
    characterAge = ageValues[1];
  } else if (ageRoll <= 35) {
    characterAge = ageValues[2];
  } else if (ageRoll <= 49) {
    characterAge = ageValues[3];
  } else if (ageRoll <= 59) {
    characterAge = ageValues[4];
  } else if (ageRoll <= 73) {
    characterAge = ageValues[5];
  } else if (ageRoll <= 89) {
    characterAge = ageValues[6];
  } else {
    characterAge = ageValues[7];
  }
    setAge(characterAge);
  };

  const rollHP = () => {
    const pe = attributes.PE || 0;
    const totalHP = rollDice(6, level) + pe;
    setHp(totalHP);
  };

  const rollSocialBackground = () => {
    const roll = rollDice(100, 1);
    const background = socialBackgrounds.find(
      (bg) => roll >= bg.range[0] && roll <= bg.range[1]
    ).background;
    setSocial(background);
  };

  const handleNameSubmit = () => {
    alert(`Character Created: Name - ${name}`);

  };


  const ChatComponent = () => {
    const { sendMessage } = useChatAPI(); // Use the hook to access the sendMessage function
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [token, setToken] = useState('your-jwt-token'); // Normally you'd get the token after user login
  
    const handleSendMessage = async () => {
      try {
        const res = await sendMessage(token, message);
        setResponse(res.message); // Assuming the response has a 'message' field
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    };
  
  return (
      <div>
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
        {response && <p>Response: {response}</p>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Character Creation</h1>
      <div>
        <label>Choose Species:</label>
        <select id="species" onChange={handleSpeciesChange} value={species}>
          {Object.keys(speciesData).map((sp) => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
      </div>

      <h2>Attributes</h2>
      <table>
        <tbody>
          {Object.entries(attributes).map(([attr, value]) => (
            <tr key={attr}>
              <td>{attr}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={rollBonus}>Roll Bonuses</button>

      <h2>Age: {age}</h2>
      <button onClick={rollAge}>Roll Age</button>

      <h2>Social Background: {social}</h2>
      <button onClick={rollSocialBackground}>Roll Social Background</button>

      <h2>HP: {hp}</h2>
      <input 
        type="number" 
        value={level} 
        onChange={(e) => setLevel(Math.max(1, e.target.value))} 
        min="1"
      />
      <button onClick={rollHP}>Roll HP</button>

      <div>
        <input
          type="text"
          placeholder="Enter character name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleNameSubmit}>Submit Name</button>
      </div>

      <ChatComponent />
    </div>
  );
}

export default App;