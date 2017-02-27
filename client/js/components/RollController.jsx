import React, { Component } from 'react';
import OneDieRoll from './controllers/OneDieRoll'
import DiceRoll from './controllers/DiceRoll'
import DropLowestRolls from './controllers/DropLowestRolls'
import KeepHighestRolls from './controllers/KeepHighestRolls'
import ExplosiveRoll from './controllers/ExplosiveRoll'
import LiteralValue from './controllers/LiteralValue'

class RollController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.rollType);
    switch(this.props.rollType) {
      case "ONE_DIE_ROLL":
        return <OneDieRoll />
      case 'DICE_ROLL':
        return <DiceRoll />
      case 'DROP_LOWEST_ROLLS':
        return <DropLowestRolls />
      case 'KEEP_HIGHEST_ROLLS':
        return <KeepHighestRolls />
      case 'EXPLOSIVE_ROLL':
        return <ExplosiveRoll />
      case 'LITERAL_VALUE':
        return <LiteralValue />
      default:
        return <OneDieRoll />
    }
  }
}

export default RollController;