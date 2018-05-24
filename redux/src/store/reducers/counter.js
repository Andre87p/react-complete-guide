import * as actionTypes from '../actions';

const initialState = {
	counter: 0
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

		default:
			break;
	}

	return optionType !== null ?
		{ ...optionType }
		:
		state;
}

export default reducer;