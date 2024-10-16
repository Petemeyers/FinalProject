// CharacterDisplay.jsx
import React from 'react';

import PropTypes from 'prop-types';

const CharacterDisplay = ({ attributes }) => {
  return (
    <div>
      <h3>Character Attributes</h3>
      {Object.entries(attributes).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};

CharacterDisplay.propTypes = {
  attributes: PropTypes.object.isRequired,
};

export default CharacterDisplay;
