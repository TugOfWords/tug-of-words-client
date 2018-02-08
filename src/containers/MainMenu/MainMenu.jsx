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
    let form;
    if (this.props.isNewUser) {
      // main menu for users who have not created a username
      form = (
        <Form>
          <h1> Enter a username to start playing </h1>
          <TextInput
            placeholder="Enter your username"
            onChange={e => this.updateUsername(e.target.value)}
          />
          {this.renderButton('Submit Name', 'green', this.submitUsername, '0px')}
          <br />
        </Form>
      );
    } else {
      // main menu for the users who already have a username & uid
      form = (
        <Form>
          <h1> Hello, {this.props.username}! </h1>
          {this.renderButton('Play Now', 'green', () => console.log('Joining random lobby...'))}
          <NewRoomDialog
            trigger={this.renderButton}
            content={<h1> Are you sure you want to create a room? </h1>}
            confirm={this.props.onCreateRoom}
            cancel={() => console.log('Canceled creation of new private room')}
          />
          <br />
        </Form>
      );
    }

    return (
      <div align="center" style={{ marginTop: '50px' }} >
        {form}
      </div>
    );
  }
}

MainMenu.propTypes = {
  isNewUser: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onCreateUser: PropTypes.func.isRequired,
  onCreateRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNewUser: state.createUser.uid === null || state.createUser.username === null,
  username: state.createUser.username || '',
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: username => dispatch(actions.createUser(username)),
  onCreateRoom: () => dispatch(actions.createRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
