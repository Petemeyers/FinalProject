import React, { useState, useEffect } from 'react';

const PartyBuilder = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters from database
    fetch('/api/characters')
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  return (
    <div>
      <h2>Party Builder</h2>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            {char.name} - {char.species}
            {/* Add details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartyBuilder;
