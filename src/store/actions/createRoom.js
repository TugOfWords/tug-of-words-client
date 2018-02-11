import shortid from 'shortid';
import * as actionTypes from './actionTypes';
import socket from '../socket-client';

/**
 * Handle the CREATE_ROOM_START action
 * @returns {Object}
 *   the data for CREATE_ROOM_START
 */
export const createRoomStart = () => ({
  type: actionTypes.CREATE_ROOM_START,
});

/**
 * Handle the CREATE_ROOM_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for CREATE_ROOM_FAILURE
 */
export const createRoomFailure = error => ({
  type: actionTypes.CREATE_ROOM_FAILURE,
  error,
});

/**
 * Handle the CREATE_ROOM_SUCCESS action
 * @param {String} rid
 *   the unique roomid
 * @returns {Object}
 *   the data for CREATE_ROOM_SUCCESS
 */
export const createRoomSuccess = rid => ({
  type: actionTypes.CREATE_ROOM_SUCCESS,
  rid,
});

/**
 * Handle the creation of a new room
 * @param {String} roomname
 *   the roomname entered by the room
 */
export const createRoom = () => (dispatch) => {
  dispatch(createRoomStart());
  const rid = shortid.generate();
  const roomData = { rid };
  try {
    socket.emit('createRoom', roomData);
    localStorage.setItem('currentRoom', rid);
    dispatch(createRoomSuccess(rid));
  } catch (e) {
    dispatch(createRoomFailure(e));
  }
};

