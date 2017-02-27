import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class OneDieRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqLoaded: true,
      reqValue: 1,
      rollValue: 4
    }
    this.rollDice = this.rollDice.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    if(!isNaN(event.target.value) && event.target.value > 0 && event.target.value <= 8) {
      this.setState({rollValue: event.target.value})
    }
  }
  rollDice() {
    this.setState({reqLoaded: false})
    var axiosInstance = axios.create({timeout: 30000});
    axiosInstance.post('/roll', {type: "ONE_DIE_ROLL", payload: {rollValue: this.state.rollValue}})
    .then((res)=>{
        this.setState({reqValue: res.data.rollValue, reqLoaded: true})
    }).catch((res)=>{
      console.log(res.response.data);
      this.setState({reqLoaded: false, initialLoad: false});
      alert("Request to server has failed - " + res.response.data);
    })
  }
  render() {
    return (
      <div className="col-md-5" style={{verticalAlign: "middle"}}>
        <Card style={{textAlign: "center"}}>
          <CardTitle 
          title="One Die Roll" 
          subtitle="Roll One Die (Accepted Values: [1-8])" />
          <div className="row">
            {this.state.reqLoaded ? 
            <div>
              <img src={require(`../../../assets/dice-${this.state.reqValue}.png`)}/>
              <p> Die Value: {this.state.reqValue} </p>
              <span>1d</span><input 
              type="number" 
              value={this.state.rollValue}
              onChange={(event) => this.onChange(event)}/>
            </div>
            : 
            <div>
              <CircularProgress size={60} thickness={7} />
            </div>}
          </div>
          <CardActions>
            <FlatButton label="Roll Dice" onClick={() => this.rollDice()}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default OneDieRoll;