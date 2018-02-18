import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

export const initialState = {
  rid: null,
  loading: false,
  error: null,
};

/**
 * Update the state to reflect the start of an action
 * @param {Object} state
 *   the current state of the room reducer
 * @returns {Object}
 *   the updated state
 */
const roomActionStart = state => updateObject(state, { loading: true });

/**
 * Update the state to reflect a failure of an action
 * @param {Object} state
 *   the current state of the room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const roomActionFailure = (state, action) => updateObject(state, {
  loading: false,
  error: action.error,
});

/**
 * Update the state to reflect the CREATE_ROOM_SUCCESS action
 * @param {Object} state
 *   the current state of the room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createRoomSuccess = (state) => {
  const updatedState = {
    ...state,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

const joinRoomSuccess = (state, action) => {
  const updatedState = {
    ...state,
    rid: action.rid,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

/**
 * Handler for the current action type
 * @param {Object} state
 *   the current state of the room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ROOM_ACTION_START:
      return roomActionStart(state);
    case actionTypes.ROOM_ACTION_FAILURE:
      return roomActionFailure(state, action);
    case actionTypes.CREATE_ROOM_SUCCESS:
      return createRoomSuccess(state, action);
    case actionTypes.JOIN_ROOM_SUCCESS:
      return joinRoomSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
