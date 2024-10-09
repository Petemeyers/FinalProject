import PropTypes from 'prop-types';
import React from 'react';

const PartyBuilder = ({ characters }) => {
  return (
    <div>
      <h2>Party Builder</h2>
      <ul>
        {characters.map((char) => (
          <li key={char.name}>
            {char.name} - {char.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

PartyBuilder.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PartyBuilder;

