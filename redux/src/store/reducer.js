import * as actionTypes from './actions';

const initialState = {
	counter: 0,
	results: []
};

const reducer = (state = initialState, action) => {
	let optionType = null;
	switch (action.type) {

		case actionTypes.INCREMENT:
			optionType = { counter: state.counter + 1 };
			break;

		case actionTypes.DECREMENT:
			optionType = { counter: state.counter - 1 };
			break;

		case actionTypes.ADD:
			optionType = { counter: state.counter + action.value };
			break;

		case actionTypes.SUBTRACT:
			optionType = { counter: state.counter - action.value };
			break;

		case actionTypes.STORE_RESULT:
			optionType = {
				results: state.results.concat({
					id: new Date(),
					value: state.counter,
				})
			};
			break;

		case actionTypes.DELETE_RESULT:
			optionType = {
				results: state.results.filter(result => result.id !== action.id)
			};
			break;
	}

	return optionType !== null ?
		{ ...state, ...optionType }
		:
		state;
}

export default reducer;