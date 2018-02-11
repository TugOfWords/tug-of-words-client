import reducer, { initialState } from './createUser';
import * as actionTypes from '../actions/actionTypes';

describe('createUser reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should store the uid and username after submitting the username', () => {
    expect(reducer({
      ...initialState,
    }, { type: actionTypes.CREATE_USER_SUCCESS, uid: 'some-id', username: 'some-name' })).toEqual({
      ...initialState,
      uid: 'some-id',
      username: 'some-name',
    });
  });
});
