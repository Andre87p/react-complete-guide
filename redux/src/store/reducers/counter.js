import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	counter: 0
};

const newState = (state, counterModifier) => {
	const updatedCounter = state.counter + counterModifier;
	return updateObject(state, { counter: updatedCounter });
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INCREMENT: return newState(state, 1);
		case actionTypes.DECREMENT: return newState(state, -1);
		case actionTypes.ADD: return newState(state, action.value);
		case actionTypes.SUBTRACT: return newState(state, -action.value);
		default: return state;
	}
}

export default reducer;