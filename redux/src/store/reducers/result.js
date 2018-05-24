import * as actionTypes from '../actions';

const initialState = {
	results: []
};

const reducer = (state = initialState, action) => {
	let optionType = null;

	switch (action.type) {
		case actionTypes.STORE_RESULT:
			optionType = {
				results: state.results.concat({
					id: new Date(),
					value: action.result,
				})
			};
			break;

		case actionTypes.DELETE_RESULT:
			optionType = {
				results: state.results.filter(result => result.id !== action.id)
			};
			break;

		default:
			break;
	}

	return optionType !== null ?
		{ ...optionType }
		:
		state;
}

export default reducer;