import React, { Component } from 'react';
import Header from './Header'
import RollList from './RollList'
import RollController from './RollController'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollType: 'ONE_DIE_ROLL'
    }
  }
  render() {
    console.log(this.state.rollType)
    return (
      <div>
        <Header/>
        <div className="row">
          <RollList setRollType={(rollType) => {
            console.log(rollType);
            this.setState({rollType: rollType});
          }}/>
          <RollController rollType={this.state.rollType}/>
        </div>
      </div>
    );
  }
}
