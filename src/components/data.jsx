import React from 'react';

const speciesData = {
  

    HUMAN: {
      IQ: "3d6",
      ME: "3d6",
      MA: "3d6",
      PS: "3d6",
      PP: "3d6",
      PE: "3d6",
      PB: "3d6",
      SPD: "3d6",
    },
    WOLFEN: {
      IQ: "3d6",
      ME: "3d6",
      MA: "2d6",
      PS: "4d6",
      PP: "3d6",
      PE: "3d6",
      PB: "3d6",
      SPD: "4d6",
    },
    HOB_GOBLIN: {
      IQ: "2d6",
      ME: "4d6",
      MA: "3d6",
      PS: "3d6",
      PP: "3d6",
      PE: "3d6",
      PB: "2d6",
      SPD: "3d6",
    },
    GOBLIN: {
      IQ: "2d6",
      ME: "3d6",
      MA: "3d6",
      PS: "3d6",
      PP: "4d6",
      PE: "3d6",
      PB: "2d6",
      SPD: "3d6",
    },
    ORC: {
      IQ: "2d6",
      ME: "2d6",
      MA: "3d6",
      PS: "4d6",
      PP: "3d6",
      PE: "3d6",
      PB: "3d6",
      SPD: "3d6",
    },
    OGRE: {
      IQ: "3d6",
      ME: "3d6",
      MA: "2d6",
      PS: "4d6",
      PP: "3d6",
      PE: "4d6",
      PB: "2d6",
      SPD: "3d6",
    },
    TROLL: {
      IQ: "3d6",
      ME: "2d6",
      MA: "2d6",
      PS: "5d6",
      PP: "4d6",
      PE: "4d6",
      PB: "2d6",
      SPD: "2d6",
    },
    TROGLODYTE: {
      IQ: "2d6",
      ME: "2d6",
      MA: "3d6",
      PS: "4d6",
      PP: "4d6",
      PE: "3d6",
      PB: "2d6",
      SPD: "5d6",
    },
    DWARF: {
      IQ: "3d6",
      ME: "3d6",
      MA: "2d6",
      PS: "4d6",
      PP: "3d6",
      PE: "4d6",
      PB: "2d6",
      SPD: "2d6",
    },
    KOBOLD: {
      IQ: "3d6",
      ME: "2d6",
      MA: "3d6",
      PS: "3d6",
      PP: "4d6",
      PE: "4d6",
      PB: "2d6",
      SPD: "3d6",
    },
    ELF: {
      IQ: "3d6",
      ME: "3d6",
      MA: "2d6",
      PS: "3d6",
      PP: "4d6",
      PE: "3d6",
      PB: "5d6",
      SPD: "3d6",
    },
    GNOME: {
      IQ: "3d6",
      ME: "2d6",
      MA: "3d6",
      PS: "2d6",
      PP: "4d6",
      PE: "4d6",
      PB: "4d6",
      SPD: "2d6",
    },
    CHANGELING: {
      IQ: "2d6",
      ME: "5d6",
      MA: "4d6",
      PS: "3d6",
      PP: "3d6",
      PE: "2d6",
      PB: "2d6",
      SPD: "2d6",
    },
  };

  
// Social background roll data
const socialBackgrounds = [
    { range: [1, 10], background: "Sailor/ Fisherman" },
    { range: [11, 17], background: "Craftsman" },
    { range: [18, 24], background: "Serf" },
    { range: [25, 30], background: "Peasant farmer" },
    { range: [31, 36], background: "Farmer" },
    { range: [37, 54], background: "Men at arms" },
    { range: [55, 70], background: "Clergy" },
    { range: [71, 80], background: "Merchant" },
    { range: [81, 90], background: "Scholar/ Magician" },
    { range: [91, 100], background: "Noble" },
  ];

  const ageTable = {
    HUMAN: [16, 19, 22, 24, 26, 28, 30, 34],
    WOLFEN: [16, 19, 22, 24, 26, 28, 30, 34],
    GOBLIN: [16, 19, 22, 24, 26, 28, 30, 34],
    HOB_GOBLIN: [16, 19, 22, 24, 26, 28, 30, 34],
    ORC: [16, 19, 22, 24, 26, 28, 30, 34],
    OGRE: [18, 22, 26, 28, 30, 34, 38, 42],
    TROLL: [18, 22, 26, 28, 30, 34, 38, 42],
    TROGLODYTE: [18, 22, 26, 28, 30, 34, 38, 42],
    DWARF: [20, 25, 30, 35, 40, 50, 60, 70],
    KOBOLD: [20, 25, 30, 35, 40, 50, 60, 70],
    GNOME: [20, 25, 30, 35, 40, 50, 60, 70],
    ELF: [20, 24, 28, 30, 50, 80, 100, 200],
    CHANGELING: [20, 24, 28, 30, 50, 80, 100, 200],
  };


  export { speciesData, socialBackgrounds, ageTable };

  // Function to roll for disposition
function rollDisposition() {
    const dispositionRoll = rollDice(100, 1); // Roll 1d100
    let disposition = "";
  
    // Assign disposition based on the roll
    if (dispositionRoll >= 1 && dispositionRoll <= 6) {
      disposition = "Mean, suspicious, vengeful";
    } else if (dispositionRoll >= 7 && dispositionRoll <= 10) {
      disposition =
        "Paternal, overbearing, overprotective of others (especially young ones)";
    } else if (dispositionRoll >= 11 && dispositionRoll <= 19) {
      disposition = "Quick tempered, grumpy, easily aggravated";
    } else if (dispositionRoll >= 20 && dispositionRoll <= 28) {
      disposition = "Shy, timid, reserved, not real sure of oneself";
    } else if (dispositionRoll >= 29 && dispositionRoll <= 37) {
      disposition = "Braggart, cocky, exaggerates, usually cheerful but annoying";
    } else if (dispositionRoll >= 38 && dispositionRoll <= 46) {
      disposition = "Schemer, gambler, takes chances, looking for the best deal";
    } else if (dispositionRoll >= 47 && dispositionRoll <= 56) {
      disposition = "Friendly, talkative";
    } else if (dispositionRoll >= 57 && dispositionRoll <= 60) {
      disposition = "Courteous, hospitable";
    } else if (dispositionRoll >= 61 && dispositionRoll <= 70) {
      disposition = "Tough guy, impudent, self-reliant, confident";
    } else if (dispositionRoll >= 71 && dispositionRoll <= 78) {
      disposition =
        "Complainer, constantly aggravated about something or somebody";
    } else if (dispositionRoll >= 79 && dispositionRoll <= 88) {
      disposition = "Arrogant, snobbish, feels superior";
    } else if (dispositionRoll >= 89 && dispositionRoll <= 95) {
      disposition =
        "Easy going, laid back, trusts almost anyone until they are proven unworthy of trust.";
    } else if (dispositionRoll >= 96 && dispositionRoll <= 100) {
      disposition = "Paranoid, trusts no one";
    }
  
    // Display disposition in the final character table
    document.getElementById("final-character-disposition").textContent =
      "Disposition: " + disposition;
  }
  
  // Function to roll for personal hostilities
  function rollPersonalHostilities() {
    const hostilitiesRoll = rollDice(100, 1); // Roll 1d100
    let hostility = "";
  
    // Assign hostility based on the roll
    if (hostilitiesRoll >= 1 && hostilitiesRoll <= 4) {
      hostility = "None";
    } else if (hostilitiesRoll >= 5 && hostilitiesRoll <= 8) {
      hostility = "None";
    } else if (hostilitiesRoll >= 9 && hostilitiesRoll <= 14) {
      hostility = "Knights/Palladins";
    } else if (hostilitiesRoll >= 15 && hostilitiesRoll <= 24) {
      hostility = "Magic/Men of magic";
    } else if (hostilitiesRoll >= 25 && hostilitiesRoll <= 32) {
      hostility = "Dwarves";
    } else if (hostilitiesRoll >= 33 && hostilitiesRoll <= 41) {
      hostility = "Elves";
    } else if (hostilitiesRoll >= 42 && hostilitiesRoll <= 48) {
      hostility = "Wolfen";
    } else if (hostilitiesRoll >= 49 && hostilitiesRoll <= 56) {
      hostility = "Non-human races";
    } else if (hostilitiesRoll >= 57 && hostilitiesRoll <= 68) {
      hostility = "Clergy";
    } else if (hostilitiesRoll >= 69 && hostilitiesRoll <= 73) {
      hostility = "Merchants";
    } else if (hostilitiesRoll >= 74 && hostilitiesRoll <= 82) {
      hostility = "Soldiers/military";
    } else if (hostilitiesRoll >= 83 && hostilitiesRoll <= 90) {
      hostility = "Thieves";
    } else if (hostilitiesRoll >= 91 && hostilitiesRoll <= 100) {
      hostility = "The supernatural (Gods, ghosts, demons, etc.)";
    }
  
    // Display hostility in the final character table under personal hostilities
    document.getElementById("final-character-hostility").textContent =
      "Personal Hostility: " + hostility;
  }
  
  // Function to roll for land of origin
  function rollLandOfOrigin() {
    const originRoll = rollDice(100, 1); // Roll 1d100
    let origin = "";
  
    // Assign origin based on the roll
    if (originRoll >= 1 && originRoll <= 5) {
      origin = "Ophids grasslands (North)";
    } else if (originRoll >= 6 && originRoll <= 7) {
      origin = "Northern Mountains (North)";
    } else if (originRoll >= 8 && originRoll <= 12) {
      origin = "Kingdom of Bizantium (North)";
    } else if (originRoll >= 13 && originRoll <= 14) {
      origin = "Phi Island (East)";
    } else if (originRoll >= 15 && originRoll <= 17) {
      origin = "Lopan (East)";
    } else if (originRoll >= 18 && originRoll <= 20) {
      origin = "Tim ro Kingdom (East)";
    } else if (originRoll >= 21 && originRoll <= 38) {
      origin = "Eastern Territory (East)";
    } else if (originRoll >= 39 && originRoll <= 54) {
      origin = "The Old Kingdom (West)";
    } else if (originRoll >= 55 && originRoll <= 68) {
      origin = "The Western Empire (West)";
    } else if (originRoll >= 69 && originRoll <= 79) {
      origin = "The Great Northern Wilderness (North)";
    } else if (originRoll >= 80 && originRoll <= 82) {
      origin = "Baalgor Waste lands (South)";
    } else if (originRoll === 90) {
      origin = "Mt. Nimro (South)";
    } else if (originRoll >= 91 && originRoll <= 100) {
      origin = "Yin-Sloth Jungles (South)";
    }
  
    // Display origin in the final character table under personal hostilities
    document.getElementById("final-character-origin").textContent =
      "Land of Origin: " + origin;
  }
  