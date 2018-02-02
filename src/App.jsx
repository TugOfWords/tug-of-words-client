import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import * as actions from './store/actions/index';

// containers
import MainMenu from './containers/MainMenu/MainMenu';


class App extends Component {
  state = {}

  componentDidMount() {
    this.props.onCreateUserAuto(); // check for valid credentials in local storage
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.isNewUser ?
          <Switch>
            <Route exact path="/" component={MainMenu} />
            <Redirect to="/" />
          </Switch> :
          <Switch>
            <Route exact path="/" render={() => <h1> Hello, {localStorage.getItem('username')} </h1>} />
            <Redirect to="/" />
          </Switch>
        }
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isNewUser: PropTypes.bool.isRequired,
  onCreateUserAuto: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNewUser: state.createUser.uid === null,
});

const mapDispatchToProps = dispatch => ({
  onCreateUserAuto: () => dispatch(actions.createUserAuto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
