import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class LiteralValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      reqLoaded: false,
      reqData: [],
      rollValue: 4,
      diceValue: 1,
      keepValue: 1
    }
    this.rollDice = this.rollDice.bind(this);
    this.onRollChange = this.onRollChange.bind(this);
    this.renderDice = this.renderDice.bind(this);
  }
  onRollChange(event) {
    if(!isNaN(event.target.value) && event.target.value > 0 && event.target.value <= 8) {
      this.setState({rollValue: event.target.value})
    }
  }
  rollDice() {
    this.setState({reqLoaded: false, initialLoad: true})
    var axiosInstance = axios.create({timeout: 30000});
    axiosInstance.post('/roll', {
    type: "LITERAL_VALUE", 
    payload: { rollValue: this.state.rollValue }})
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
        <div style={{display: "inline-block", padding: 20}}>
          <img src={require(`../../../assets/dice-${this.state.reqData.rollValue}.png`)}/>
          <p> Die Value: {this.state.reqData.rollValue} </p>
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
          <CardTitle title="Literal Value" subtitle="Where X​ is any positive number, eg: 2 (result is always 2). (Accepted Values [1-8])" />
          <div className="row">
            <span>X</span>
            <input 
            type="number" 
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

export default LiteralValue;