import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Button, Form } from 'semantic-ui-react';
import TextInput from '../../components/TextInput/TextInput';
import Dialog from './NewRoomDialog';

import * as actions from '../../store/actions/index';


export class MainMenu extends Component {
  state = {
    username: '',
  }

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  }

  submitUsername = () => {
    this.props.onCreateUser(this.state.username);
  }

  resetUser = () => {
    this.props.onRemoveUser();
    window.location.href = '/';
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

          <br />
          <Dialog
            trigger={this.renderButton}
            content={<h1> Are you sure you want to create a room? </h1>}
            confirm={this.props.onCreateRoom}
            cancel={() => console.log('Canceled creation of new private room')}
          />

          <br />
          {this.renderButton('Reset', 'red', this.resetUser)}
        </Form>
      );
    }

    return (
      <div align="center" style={{ marginTop: '15%' }} >
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
  onRemoveUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNewUser: state.createUser.uid === null || state.createUser.username === null,
  username: state.createUser.username || '',
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: username => dispatch(actions.createUser(username)),
  onCreateRoom: () => dispatch(actions.createRoom()),
  onRemoveUser: () => dispatch(actions.removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
