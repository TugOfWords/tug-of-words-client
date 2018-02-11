import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  rid: null,
  loading: false,
  error: null,
};

/**
 * Update the state to reflect the CREATE_ROOM_START action
 * @param {Object} state
 *   the current state of the create room reducer
 * @returns {Object}
 *   the updated state
 */
const createRoomStart = state => updateObject(state, { loading: true });

/**
 * Update the state to reflect the CREATE_ROOM_FAILURE action
 * @param {Object} state
 *   the current state of the create room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createRoomFailure = (state, action) => updateObject(state, {
  loading: false,
  error: action.error,
});

/**
 * Update the state to reflect the CREATE_ROOM_SUCCESS action
 * @param {Object} state
 *   the current state of the create room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const createRoomSuccess = (state, action) => {
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
 *   the current state of the create room reducer
 * @param {Object} action
 *   the current action object
 * @returns {Object}
 *   the updated state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ROOM_START:
      return createRoomStart(state);
    case actionTypes.CREATE_ROOM_FAILURE:
      return createRoomFailure(state, action);
    case actionTypes.CREATE_ROOM_SUCCESS:
      return createRoomSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
