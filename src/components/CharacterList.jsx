// CharacterList Component
import React from 'react';

import PropTypes from 'prop-types';


const CharacterList = ({ characters }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((character, index) => (
          <tr key={index}>
            <td>{character.name}</td>
            <td>{character.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CharacterList.propTypes = {
    characters: PropTypes.array.isRequired,
  };
  
  export default CharacterList;