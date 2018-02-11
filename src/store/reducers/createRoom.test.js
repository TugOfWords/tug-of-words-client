import reducer, { initialState } from './createRoom';
import * as actionTypes from '../actions/actionTypes';

describe('createRoom reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should store the rid after creating a room', () => {
    expect(reducer({
      ...initialState,
    }, { type: actionTypes.CREATE_ROOM_SUCCESS, rid: 'some-id' })).toEqual({
      ...initialState,
      rid: 'some-id',
    });
  });
});
