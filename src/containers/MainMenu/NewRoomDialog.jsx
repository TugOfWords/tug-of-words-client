import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { Button, Header, Modal } from 'semantic-ui-react';

class NewRoomDialog extends Component {
  state = { open: false }

  toggleDialog = () => this.setState({ open: !this.state.open });

  handleCancel = () => {
    this.toggleDialog();
    this.props.cancel();
  }

  handleConfirm = () => {
    this.toggleDialog();
    this.props.confirm();
  }

  render() {
    return (
      <Modal
        basic
        open={this.state.open}
        trigger={this.props.trigger('Create Private Room', 'blue', this.toggleDialog)}
      >
        <Header> {this.props.header} </Header>
        <Modal.Content>
          {this.props.content}
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button basic color="green" onClick={this.handleConfirm}>
            Create
          </Button>
        </Modal.Actions>
      </Modal >
    );
  }
}

NewRoomDialog.defaultProps = {
  header: 'Create Private Room',
};

NewRoomDialog.propTypes = {
  trigger: PropTypes.func.isRequired,
  header: PropTypes.string,
  content: PropTypes.element.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default NewRoomDialog;

