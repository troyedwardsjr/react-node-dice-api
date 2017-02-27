var express = require('express');
var router  = express.Router();
var MathUtil = require('./MathUtil');

router.post('/roll', function(req, res) {
  var mathUtil = new MathUtil(res);
  var type = req.body.type;
  var payload = req.body.payload;
  if(type && payload) {
    switch(type) {
      case 'ONE_DIE_ROLL':
        res.json({rollValue: mathUtil.rollDie(1, payload.rollValue)});
        break;
      case 'DICE_ROLL':
        res.json(mathUtil.rollDice(payload.rollValue));
        break;
      case 'DROP_LOWEST_ROLLS':
        res.json(mathUtil.dropLowestRolls(payload.rollValue))
        break;
      case 'KEEP_HIGHEST_ROLLS':
        res.json(mathUtil.keepHighestRolls(payload.rollValue))
        break;
      case 'EXPLOSIVE_ROLL':
        res.json(mathUtil.explosiveRoll(payload.rollValue))
        break;
      case 'LITERAL_VALUE':
        res.json(mathUtil.literalValue(payload.rollValue));
        break;
      default:
        console.log("No type submitted.");
        break;
    }
  }
});

module.exports = router;
