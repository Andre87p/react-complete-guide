import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga() {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart);

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};

	const apiKey = 'AIzaSyBVDC-xl1sUYqtpGQb4o3jCkn1DSYvRh8E';
	const url = action.isSignup ?
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser'
		:
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';


	try {
		const response = yield axios.post(`${url}?key=${apiKey}`, authData);
		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(actions.authSuccess(response.data.idToken, response.data.localId));
		yield put(actions.checkAuthTimeout(response.data.expiresIn));

	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
}

export function* authCheckStateSaga() {
	const token = yield localStorage.getItem('token');
	const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

	if (!token || expirationDate <= new Date()) {
		yield put(actions.logout());
		return;
	}
	const userId = yield localStorage.getItem('userId');
	put(actions.authSuccess(token, userId));
	put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
}