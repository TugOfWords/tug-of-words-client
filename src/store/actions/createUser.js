import shortid from 'shortid';
import * as actionTypes from './actionTypes';
import socket from '../socket-client';

/**
 * Handle the CREATE_USER_START action
 * @returns {Object}
 *   the data for CREATE_USER_START
 */
export const createUserStart = () => ({
  type: actionTypes.CREATE_USER_START,
});

/**
 * Handle the CREATE_USER_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for CREATE_USER_FAILURE
 */
export const createUserFailure = error => ({
  type: actionTypes.CREATE_USER_FAILURE,
  error,
});

/**
 * Handle the CREATE_USER_SUCCESS action
 * @param {String} uid
 *   the unique userid entered by the user
 * @returns {Object}
 *   the data for CREATE_USER_SUCCESS
 */
export const createUserSuccess = uid => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  uid,
});

/**
 * Handle the REMOVE_USER action
 * @returns {Object}
 *   the data for the REMOVE_USER action
 */
export const removeUser = () => {
  localStorage.removeItem('uid');
  localStorage.removeItem('username');
  return {
    type: actionTypes.REMOVE_USER,
  };
};

/**
 * Handle the CREATE_USER_AUTO action
 * @returns {Object}
 *   the data for the CREATE_USER_AUTO action
 */
export const createUserAuto = () => (dispatch) => {
  const username = localStorage.getItem('username');
  const uid = localStorage.getItem('uid');
  if (!username || !uid) {
    dispatch(removeUser());
  } else {
    dispatch(createUserSuccess(uid));
  }
};

/**
 * Handle the creation of a new user
 * @param {String} username
 *   the username entered by the user
 */
export const createUser = username => (dispatch) => {
  dispatch(createUserStart());
  const id = shortid.generate();
  const userData = { id, username };
  try {
    socket.emit('createUser', userData);
  } catch (e) {
    dispatch(createUserFailure(e));
  }
};

