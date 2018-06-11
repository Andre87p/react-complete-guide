import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

describe('Auth reducer', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Should store the token upon login', () => {
		expect(reducer(initialState,
			{
				type: actionTypes.AUTH_SUCCESS,
				idToken: 'some-token',
				localId: 'some-user-id'
			}
		)).toEqual(updateObject(initialState,
			{
				token: 'some-token',
				userId: 'some-user-id'
			}
		));
	});
});