import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password, isSignup = true) => (
	dispatch => {
		dispatch(authStart());

		const apiKey = 'AIzaSyBVDC-xl1sUYqtpGQb4o3jCkn1DSYvRh8E';
		const url = isSignup ?
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser'
			:
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		axios
			.post(`${url}?key=${apiKey}`, authData)
			.then(response => {
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	}
);

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return { type: actionTypes.AUTH_LOGOUT }
};

export const setAuthRedirectPath = (path) => (
	{ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path }
);

export const authCheckState = () => (
	dispatch => {
		const token = localStorage.getItem('token');
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (!token || expirationDate <= new Date()) {
			dispatch(logout());
			return;
		}
		const userId = localStorage.getItem('userId');
		dispatch(authSuccess(token, userId));
		dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
	}
);

const authStart = () => (
	{ type: actionTypes.AUTH_START }
);
const authSuccess = (idToken, localId) => (
	{
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		localId: localId
	}
);
const authFail = (error) => (
	{ type: actionTypes.AUTH_FAIL, error: error }
);

const checkAuthTimeout = (expirationTime) => (
	dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	}
);