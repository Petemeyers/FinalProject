const AttributeRoller = (species) => {
  let attributes = {};

  if (species === 'HUMAN') {
    attributes = {
      IQ: rollDice(3, 6),
      ME: rollDice(3, 6),
      MA: rollDice(3, 6),
      PS: rollDice(3, 6),
      PP: rollDice(3, 6),
      PE: rollDice(3, 6),
      PB: rollDice(3, 6),
      SPD: rollDice(3, 6),
    };
  } else if (species === 'WOLFEN') {
    attributes = {
      IQ: rollDice(3, 6),
      ME: rollDice(3, 6),
      MA: rollDice(2, 6),
      PS: rollDice(4, 6),
      PP: rollDice(3, 6),
      PE: rollDice(3, 6),
      PB: rollDice(3, 6),
      SPD: rollDice(4, 6),
    };
  }
  // Add other species similarly...

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
