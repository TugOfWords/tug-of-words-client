import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button, Card } from 'semantic-ui-react';

const TeamCard = (props) => {
  /**
   * Assign a color to the card from the teamNumber
   * @param {Number} teamNumber
   *   The number of the current team
   * @returns {String}
   *   The color of the card
   */
  const getColor = teamNumber => (teamNumber === 1 ? 'blue' : 'red');

  /**
   * Create a list of formatted team players to display on the card
   * @param {Array} players
   *   List of the players usernames that belong to the current team
   * @returns {Array}
   *   The formatted list of players
   */
  const renderPlayerNames = players => players.map((player, i) => <h4 key={`key: ${i + 1}`} className="playerName"> {`${player}`} </h4>);

  const renderJoinButton = () => {
    if (!props.private) return null;
    return (
      <Button basic color="green" content="Join Team" onClick={teamNumber => props.joinTeam(teamNumber)} disabled={props.disabled} />
    );
  };

  return (
    <Card fluid color={getColor(props.teamNumber)} align="center">
      <Card.Header> <h2>{`Team ${props.teamNumber}`}</h2> </Card.Header>
      <Card.Content>
        {props.players.length > 0 ? renderPlayerNames(props.players) : 'No players on this team'}
      </Card.Content>
      <Card.Content extra>
        {renderJoinButton()}
      </Card.Content>
    </Card>
  );
};

TeamCard.defaultProps = {
  private: false,
  disabled: false,
};

/* eslint-disable */
TeamCard.propTypes = {
  teamNumber: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  private: PropTypes.bool,
  joinTeam: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TeamCard;
