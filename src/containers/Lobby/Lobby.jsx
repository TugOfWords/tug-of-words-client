import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lobby extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Lobby Page</h1>
        <div>
          <h2> Team 1 </h2>
          {this.props.teamOne.map(p => <h3> {p} </h3>)}
        </div>
        <div>
          <h2> Team 2 </h2>
          {this.props.teamTwo.map(p => <h3> {p} </h3>)}
        </div>
      </div>
    );
  }
}

Lobby.defaultProps = {
  teamOne: [],
  teamTwo: [],
};

Lobby.propTypes = {
  teamOne: PropTypes.arrayOf(PropTypes.string),
  teamTwo: PropTypes.arrayOf(PropTypes.string),
};

export default connect(null, null)(Lobby);
