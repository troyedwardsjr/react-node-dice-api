import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class ExplosiveRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      reqLoaded: false,
      reqData: [],
      rollValue: "2d4x2"
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
    var axiosInstance = axios.create({timeout: 100000});
    axiosInstance.post('/roll', {
    type: "EXPLOSIVE_ROLL", 
    payload: { 
        rollValue: this.state.rollValue,
      }
    })
    .then((res)=>{
      console.log(res.data)
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
          <h4> Exploded: {this.state.reqData.exploded} </h4>
          {(() => {
            return this.state.reqData.diceGroup.map((dieRoll) => {
              return (
                <div style={{display: "inline-block", padding: 20}}>
                  <img src={require(`../../../assets/dice-${dieRoll}.png`)}/>
                  <p> Die Value: {dieRoll} </p>
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
          <CardTitle title="Explosive Roll" subtitle="For each value that is equal or greater than E​ roll again until no values
          need to be re-rolled. (Accepted Values [1-∞]d[1-8]x[1-8])" />
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

export default ExplosiveRoll;