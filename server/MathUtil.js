function MathUtil(res) {

  var handleError = function(rollValue) {
    res.status(500).send("Invalid dice expression - " + rollValue);
    throw "Invalid dice expression: " + rollValue;
  } 

  var rollDie = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var rollDice = function(rollValue) {
    var rollRegex = /^([0-9]*)?d([1-8])$/.exec(rollValue);
    var rollNum = 0;
    var diceNum = 0;
    var diceGroup = [];
    var rollTotal = 0;
    console.log(rollRegex)
    if (!rollRegex) {
      handleError(rollValue);
    } else {
      if (rollRegex[1]) {
        diceNum = parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2]) {
        rollNum = parseInt(rollRegex[2]);
      } else {
        handleError(rollValue);
      }
      for (var i = 0; i < diceNum; i++) {
        var roll = rollDie(1, rollNum);
        rollTotal += roll;
        diceGroup.push({rollValue: roll});
      }
      return {diceGroup: diceGroup, rollTotal: rollTotal};
    }
  }

  var dropLowestRolls = function(rollValue) {
    var rollRegex = /^([0-9]*)?d([1-8])?d([1-8])$/.exec(rollValue);
    var rollNum = 0;
    var diceNum = 0;
    var dropNum = 0;
    
    var diceIntGroup = [];
    var rollTotal = 0;

    if (!rollRegex) {
      handleError(rollValue);
    } else {

      if (rollRegex[1]) {
        diceNum = parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2]) {
        rollNum = parseInt(rollRegex[2]);
      }
      if (rollRegex[3]) {
        dropNum = parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (var i = 0; i < diceNum; i++) {
        var roll = rollDie(1, rollNum);
        diceIntGroup.push(roll);
      }

      diceIntGroup = diceIntGroup.sort();
      console.log({Original: diceIntGroup});

      diceIntGroup = diceIntGroup.slice(0, diceIntGroup.length - parseInt(dropNum));
      console.log({DroppedArray: diceIntGroup});
      console.log({DroppedValue: parseInt(dropNum)});

      diceIntGroup.map((value) => {
        rollTotal += value;
      })
      console.log({rollTotal: rollTotal});

      return {diceGroup: diceIntGroup, rollTotal: rollTotal, dropped: dropNum};
    }
  }

  var keepHighestRolls = function(rollValue) {
    var rollRegex = /^([0-9]*)?d([1-8])?k([1-8])$/.exec(rollValue);
    var rollNum = 0;
    var diceNum = 0;
    var keepNum = 0;

    var diceIntGroup = [];
    var rollTotal = 0;

    if (!rollRegex) {
      handleError(rollValue);
    } else {

      if (rollRegex[1]) {
        diceNum = parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2]) {
        rollNum = parseInt(rollRegex[2]);
      }
      if (rollRegex[3]) {
        keepNum = parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (var i = 0; i < diceNum; i++) {
        var roll = rollDie(1, rollNum);
        diceIntGroup.push(roll);
      }

      diceIntGroup = diceIntGroup.sort();
      diceIntGroup = diceIntGroup.reverse();
      
      diceIntGroup = diceIntGroup.slice(0, parseInt(keepNum))
      console.log({KeptArray: diceIntGroup});
      console.log({KeptValue: parseInt(keepNum)});
      diceIntGroup.map((value) => {
        rollTotal += value;
      })
      console.log({rollTotal: rollTotal});
      return {diceGroup: diceIntGroup, rollTotal: rollTotal, kept: keepNum};
    }
  }

  var explosiveRoll = function(rollValue) {
    var rollRegex = /^([0-9]*)?d([1-8])?x([1-8])$/.exec(rollValue);
    var rollNum = 0;
    var diceNum = 0;
    var explodedNum = 0;
    var exploded = 0;
    var diceIntGroup = [];
    var rollTotal = 0;

    if (!rollRegex) {
      handleError(rollValue);
    } else {

      if (rollRegex[1]) {
        diceNum = parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2]) {
        rollNum = parseInt(rollRegex[2]);
      }
      if (rollRegex[3]) {
        explodedNum = parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (var i = 0; i < diceNum; i++) {
        var roll = rollDie(1, rollNum);
        if(roll < explodedNum) {
          rollTotal += roll;
          diceIntGroup.push(roll);
        } else {
          while(roll > explodedNum) {
            console.log({Exploded: roll});
            exploded++;
            roll = rollDie(1, rollNum);
          }
          rollTotal += roll;
          diceIntGroup.push(roll);
        }
      }
      console.log({ExplosiveArray: diceIntGroup});
      console.log({ExplosiveValue: parseInt(explodedNum)});
      return {diceGroup: diceIntGroup, rollTotal: rollTotal, exploded: exploded};
    }
  }

  var literalValue = function(rollValue) {
    return {rollValue: rollValue};
  }

  return {
    rollDie: rollDie,
    rollDice: rollDice,
    dropLowestRolls:  dropLowestRolls,
    keepHighestRolls: keepHighestRolls,
    explosiveRoll: explosiveRoll,
    literalValue: literalValue
  }

}

module.exports = MathUtil;