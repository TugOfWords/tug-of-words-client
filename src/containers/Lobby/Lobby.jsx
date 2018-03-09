import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Card } from 'semantic-ui-react';
import TeamCard from '../../components/TeamCard/TeamCard';

// actions
import * as actions from '../../store/actions/index';
import socket from '../../socket';

class Lobby extends Component {
  state = {
    private: true,
    t1: [],
    t2: [],
  }

  componentDidMount() {
    socket.onJoinLobby({ lid: this.props.lid }, (res) => {
      const teams = this.getUsersOnTeams(res);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });

    socket.onJoinTeam({ lid: this.props.lid }, (res) => {
      console.log('joined team...');
      const teams = this.getUsersOnTeams(res);
      console.log(teams);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });
  }

  getUsersOnTeams = (res) => {
    const t1 = Object.assign({}, ...Object.keys(res.t1).map((k, i) =>
      ({ [i]: res.t1[k].username })));
    const t2 = Object.assign({}, ...Object.keys(res.t2).map((k, i) =>
      ({ [i]: res.t2[k].username })));
    return { t1: Object.values(t1), t2: Object.values(t2) };
  }

  joinTeam = (teamNumber) => {
    this.props.onJoinTeam(this.props.lid, teamNumber, this.props.uid);
  }

  render() {
    return (
      <div align="center" style={{ marginTop: '25px' }}>
        <h1>Pregame Lobby</h1>

        {/* Team 1 */}
        <Card.Group itemsPerRow={2} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px' }}>
          <TeamCard
            joinTeam={() => this.joinTeam(1)}
            players={this.state.t1}
            teamNumber={1}
            private={this.state.private}
            disabled={this.props.teamNumber === 1}
          />

          {/* Team 2 */}
          <TeamCard
            joinTeam={() => this.joinTeam(2)}
            players={this.state.t2}
            teamNumber={2}
            private={this.state.private}
            disabled={this.props.teamNumber === 2}
          />
        </Card.Group>
      </div>
    );
  }
}

Lobby.propTypes = {
  uid: PropTypes.string.isRequired,
  lid: PropTypes.string.isRequired,
  onJoinTeam: PropTypes.func.isRequired,
  teamNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  teamNumber: state.lobby.teamNumber,
  uid: state.user.uid,
  lid: state.lobby.lid,
});

const mapDispatchToProps = dispatch => ({
  onJoinTeam: (lid, teamNumber, uid) => dispatch(actions.joinTeam(lid, teamNumber, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
