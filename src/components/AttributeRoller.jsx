const AttributeRoller = (species) => {
    let attributes = {};
  
    if (species === 'Human') {
      // roll attributes based on species (2d6 or 3d6)
      attributes = {
        strength: rollDice(3, 6),
        intelligence: rollDice(2, 6),
        // other attributes...
      };
    }
  
    // Apply bonus rolls for green-highlighted attributes
    // If attribute qualifies for green-highlighted bonus (2d6 or 3d6)
    return attributes;
  };
  
  const rollDice = (numberOfDice, sides) => {
    let total = 0;
    for (let i = 0; i < numberOfDice; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
  };
  
  export default AttributeRoller;
  