import * as actionTypes from './actionTypes';

// export const storeResult = (res) => ({ type: STORE_RESULT, result: res });
export const saveResult = (res) => ({ type: actionTypes.STORE_RESULT, result: res });
export const storeResult = (res) => (dispatch, getState) => {
	setTimeout(() => dispatch(saveResult(res)), 2000);
};

export const deleteResult = (id) => ({ type: actionTypes.DELETE_RESULT, id: id });