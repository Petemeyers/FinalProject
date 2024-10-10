export function rollDice(sides, number) { 
  let total = 0;
  for (let i = 0; i < number; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

export function calculateAttributeRolls(diceRolls) {
  const results = {};
  for (const [attribute, dice] of Object.entries(diceRolls)) {
    const [numDice, sides] = dice.split("d").map(Number);
    results[attribute] = rollDice(sides, numDice);
  }
  return results;
}

import { ageTable } from './data';

export function determineCharacterAge(species, ageRoll) {
  const ageValues = ageTable[species];
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

  return characterAge;
}