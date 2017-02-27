import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class DiceRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      reqLoaded: false,
      reqData: [],
      rollValue: "1d4",
    }
    this.rollDice = this.rollDice.bind(this);
    this.onRollChange = this.onRollChange.bind(this);
    this.renderDice = this.renderDice.bind(this);
  }
  onRollChange(event) {
      this.setState({rollValue: event.target.value})
  }
  rollDice() {
    this.setState({reqLoaded: false, initialLoad: true})
    var axiosInstance = axios.create({ timeout: 30000 });
    axiosInstance.post('/roll', {type: "DICE_ROLL", payload: { rollValue: this.state.rollValue}})
    .then((res)=>{
      console.log(res);
      this.setState({reqData: res.data, reqLoaded: true})
    }).catch((res)=>{
      console.log(res.response.data);
      this.setState({reqLoaded: false, initialLoad: false});
      alert("Request to server has failed - " + res.response.data);
    })
  }
  renderDice() {
    if(this.state.reqLoaded) {
      return (
        <div> 
          <h4> Total: {this.state.reqData.rollTotal} </h4>
          {(() => {
            return this.state.reqData.diceGroup.map((die) => {
              return (
                <div style={{display: "inline-block", padding: 20}}>
                  <img src={require(`../../../assets/dice-${die.rollValue}.png`)}/>
                  <p> Die Value: {die.rollValue} </p>
                </div>
              )
            }, this);
          })()} 
        </div>
      )
    } else if (this.state.initialLoad) {
      return (
        <div>
          <CircularProgress size={60} thickness={7} />
        </div>
      )
    } else {
      return (
        <h4 style={{marginBottom: 50}}> Choose a dice expression. </h4>
      )
    }
  }
  render() {
    return (
      <div className="col-md-5" style={{verticalAlign: "middle"}}>
        <Card style={{textAlign: "center"}}>
          <CardTitle 
          title="Dice Roll" 
          subtitle="Roll Multiple Dice (Accepted Values [1-∞]d[1-8])" />
          <div className="row">
            <input 
            type="text" 
            value={this.state.rollValue}
            onChange={(event) => this.onRollChange(event)}/>
            <CardActions>
              <FlatButton label="Roll Dice" onClick={() => this.rollDice()}/>
            </CardActions>
            {this.renderDice()}
          </div>
        </Card>
      </div>
    );
  }
}

export default DiceRoll;