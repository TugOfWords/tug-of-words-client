import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Game extends Component {
  state = {}

  render() {
    return (
      <h1>Game Page</h1>
    );
  }
}

export default connect(null, null)(Game);
