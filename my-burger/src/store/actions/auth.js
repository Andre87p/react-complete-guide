import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignup = true) => (
	{
		type: actionTypes.AUTH_USER,
		email: email,
		password: password,
		isSignup: isSignup
	}
);

export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const setAuthRedirectPath = (path) => (
	{ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path }
);

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_STATE });

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = (idToken, localId) => (
	{
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		localId: localId
	}
);
export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error: error });

export const checkAuthTimeout = (expirationTime) => (
	{ type: actionTypes.AUTH_CHECK_TIMEOUT, expirationTime: expirationTime }
);