const initialState = {
	counter: 0,
	results: []
};

const reducer = (state = initialState, action) => {
	const options = {
		INCREMENT: { counter: state.counter + 1 },
		DECREMENT: { counter: state.counter - 1 },
		ADD: { counter: state.counter + action.value },
		SUBTRACT: { counter: state.counter - action.value },
		STORE_RESULT: {
			results: state.results.concat({
				id: new Date,
				value: state.counter,
			})
		}
	};

	const optionType = options[action.type];
	return typeof optionType !== 'undefined' ?
		{ ...state, ...optionType }
		:
		state;
}

export default reducer;