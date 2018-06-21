import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
		default: return state;
	}
}
export default reducer;


const authStart = (state) => updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) => updateObject(state,
	{
		token: action.idToken,
		userId: action.localId,
		error: null,
		loading: false
	}
);

const authFail = (state, action) => updateObject(state,
	{
		token: null,
		userId: null,
		error: action.error,
		loading: false
	}
);
const authLogout = (state) => updateObject(state, { token: null, userId: null });

const setAuthRedirectPath = (state, action) => updateObject(state,
	{ authRedirectPath: action.path }
);