import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="center-align">
        <img className="center-img" src={require('../../assets/dice-header-icon.png')} />
        <h1 className="center-align">Dice API - Troy Edwards</h1>
      </div>
    );
  }
}

export default Header;