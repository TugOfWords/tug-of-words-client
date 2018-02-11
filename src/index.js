/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createUser from './store/reducers/createUser';
import createRoom from './store/reducers/createRoom';

// add all new reducers here...
const appReducer = combineReducers({
  createUser,
  createRoom
});

/**
 * Reset the app state if the user is exiting the app
 * @param {Object} state
 *   the current global state of the app
 * @param {Object} action
 *   the current action being dispatched
 * @returns {Object}
 *   the new app reducer with the modified state
 */
const rootReducer = (state, action) => {
  if (action.type === 'REMOVE_USER') state = undefined;
  return appReducer(state, action);
};

// enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// apply any middleware here...
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
