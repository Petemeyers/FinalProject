import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './src/components/HomePage';
import Chat from './src/components/Chat';
import CharacterCreator from './src/components/CharacterCreator';
import PartyBuilder from './src/components/PartyBuilder';
import CharacterList from './src/components/CharacterList';

const App = () => {
  const [characters, setCharacters] = useState([]); // Local state for characters

  // Fetch the characters when the component mounts
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/characters");
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

   // Function to handle adding a new character to the database
   const addCharacter = async (newCharacter) => {
    try {
      const response = await axios.post("http://localhost:5000/api/characters", newCharacter);
      setCharacters([...characters, response.data]);
    } catch (error) {
      console.error("Error adding character:", error);
    }
  };
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/character-creation" element={<CharacterCreator />} />
      <Route path="/party-builder" element={<PartyBuilder characters={characters} />} /> {/* Pass characters */}
      <Route path="/character-list" element={<CharacterList characters={characters} />} /> {/* Pass characters */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;