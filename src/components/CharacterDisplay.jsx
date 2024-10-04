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
  
  export default CharacterDisplay;
  