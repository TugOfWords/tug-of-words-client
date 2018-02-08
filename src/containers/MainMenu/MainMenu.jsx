import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// components
import { Button, Form } from 'semantic-ui-react';
import TextInput from '../../components/TextInput/TextInput';
import NewRoomDialog from './NewRoomDialog';

import * as actions from '../../store/actions/index';


class MainMenu extends Component {
  state = {
    username: '',
  }

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  }

  submitUsername = () => {
    this.props.onCreateUser(this.state.username);
  }

  renderButton = (text, color, action, top) => (
    <Button basic color={color} onClick={action} style={{ marginTop: top || '10px' }}>
      {text}
    </Button>
  );

  render() {
    return (
      <div align="center" style={{ marginTop: '50px' }} >
        <Form>
          <h1> Enter a username to start playing </h1>

          <TextInput
            placeholder="Enter your username"
            onChange={e => this.updateUsername(e.target.value)}
          />

          {/* Play Button */}
          {this.renderButton('Play Now', 'green', this.submitUsername, '0px')}
          <br />

          <NewRoomDialog
            trigger={this.renderButton}
            content={<h1> Are you sure you want to create a room? </h1>}
            confirm={this.props.onCreateRoom}
            cancel={() => console.log('Canceled creation of new private room')}
          />
        </Form>
      </div>
    );
  }
}

MainMenu.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
  onCreateRoom: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateUser: username => dispatch(actions.createUser(username)),
  onCreateRoom: () => dispatch(actions.createRoom()),
});

export default connect(null, mapDispatchToProps)(MainMenu);
