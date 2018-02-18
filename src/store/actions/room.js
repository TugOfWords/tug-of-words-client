import shortid from 'shortid';
import * as actionTypes from './actionTypes';
// import socket from '../socket-client';
import api from '../../api';

/**
 * Handle the ROOM_ACTION_START action
 * @returns {Object}
 *   the data for ROOM_ACTION_START
 */
export const roomActionStart = () => ({
  type: actionTypes.ROOM_ACTION_START,
});

/**
 * Handle the CREATE_ROOM_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for CREATE_ROOM_FAILURE
 */
export const roomActionFailure = error => ({
  type: actionTypes.ROOM_ACTION_FAILURE,
  error,
});

/**
 * Handle the CREATE_ROOM_SUCCESS action
 * @param {String} rid
 *   the unique roomid
 * @returns {Object}
 *   the data for CREATE_ROOM_SUCCESS
 */
export const createRoomSuccess = () => ({
  type: actionTypes.CREATE_ROOM_SUCCESS,
});

export const joinRoomSuccess = rid => ({
  type: actionTypes.JOIN_ROOM_SUCCESS,
  rid,
});

export const joinRoom = (rid, uid) => (dispatch) => {
  dispatch(roomActionStart());
  const data = { rid, uid };
  api.rooms.joinRoom(data);
  localStorage.setItem('currentRoom', rid);
  dispatch(joinRoomSuccess(rid));
};

/**
 * Handle the creation of a new room
 * @param {String} roomname
 *   the roomnam entered by the room
 */
export const createRoom = uid => (dispatch) => {
  dispatch(roomActionStart());
  const rid = encodeURIComponent(shortid.generate());
  const roomData = { rid, uid };
  try {
    api.rooms.createRoom(roomData);
    dispatch(createRoomSuccess());
    dispatch(joinRoom(rid, uid));
  } catch (e) {
    dispatch(roomActionFailure(e));
  }
};
