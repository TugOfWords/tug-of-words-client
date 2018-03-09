import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

export const initialState = {
  lid: null,
  teamNumber: 0,
  loading: false,
  error: null,
};

/**
 * Update the state to reflect the start of an action
 * @param {Object} state
 *   the current state of the lobby reducer
 * @returns {Object}
 *   the updated state
 */
const lobbyActionStart = state => updateObject(state, { loading: true });

/**
 * Update the state to reflect a failure of an action
 * @param {Object} state
 *   the current state of the lobby reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const lobbyActionFailure = (state, action) => updateObject(state, {
  loading: false,
  error: action.error,
});

/**
 * Update the state to reflect the CREATE_LOBBY_SUCCESS action
 * @param {Object} state
 *   the current state of the lobby reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createLobbySuccess = (state) => {
  const updatedState = {
    ...state,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

const joinLobbySuccess = (state, action) => {
  const updatedState = {
    ...state,
    lid: action.lid,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

const joinTeamSuccess = (state, action) => {
  const updatedState = {
    ...state,
    teamNumber: action.teamNumber,
  };
  return updateObject(state, updatedState);
};

/**
 * Handler for the current action type
 * @param {Object} state
 *   the current state of the lobby reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOBBY_ACTION_START:
      return lobbyActionStart(state);
    case actionTypes.LOBBY_ACTION_FAILURE:
      return lobbyActionFailure(state, action);
    case actionTypes.CREATE_LOBBY_SUCCESS:
      return createLobbySuccess(state, action);
    case actionTypes.JOIN_LOBBY_SUCCESS:
      return joinLobbySuccess(state, action);
    case actionTypes.JOIN_TEAM_SUCCESS:
      return joinTeamSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
