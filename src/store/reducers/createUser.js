import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

export const initialState = {
  uid: null,
  username: null,
  loading: false,
  error: null,
};

/**
 * Update the state to reflect the CREATE_USER_START action
 * @param {Object} state
 *   the current state of the create user reducer
 * @returns {Object}
 *   the updated state
 */
const createUserStart = state => updateObject(state, { loading: true });

/**
 * Update the state to reflect the CREATE_USER_FAILURE action
 * @param {Object} state
 *   the current state of the create user reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createUserFailure = (state, action) => updateObject(state, {
  loading: false,
  error: action.error,
});

/**
 * Update the state to reflect the CREATE_USER_SUCCESS action
 * @param {Object} state
 *   the current state of the create user reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createUserSuccess = (state, action) => {
  const updatedState = {
    ...state,
    uid: action.uid,
    username: action.username,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

/**
 * Update the state to reflect the REMOVE_USER action
 * @param {Object} state
 *   the current state of the create user reducer
 * @returns {Object}
 *   the updated state
 */
const removeUser = (state) => {
  const updatedState = {
    ...state,
    uid: null,
    error: null,
  };
  return updateObject(state, updatedState);
};

/**
 * Handler for the current action type
 * @param {Object} state
 *   the current state of the create user reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START:
      return createUserStart(state);
    case actionTypes.CREATE_USER_FAILURE:
      return createUserFailure(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.REMOVE_USER:
      return removeUser(state);
    default:
      return state;
  }
};

export default reducer;
