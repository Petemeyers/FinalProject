import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PartyBuilder.css';

const PartyBuilder = ({ characters }) => {
  const navigate = useNavigate();
  return (
    <div className="party-builder-container">
      <h2>Party Builder</h2>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <ul className="party-list">
        {characters.length > 0 ? (
          characters.map((char) => (
            <li key={char.name} className="party-member">
              <span className="member-name">{char.name}</span> - <span className="member-species">{char.species}</span>
            </li>
          ))
        ) : (
          <p>No characters in the party yet.</p>
        )}
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
