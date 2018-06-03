import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action, true);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return ingredientsFailed(state, action);
        default: return state;
    }
}
export default reducer;


const addRemoveIngredient = (state, action, remove) => {
    const inverse = remove ? -1 : 1;
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1 * inverse
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + (inverse * INGREDIENT_PRICES[action.ingredientName])
    };
    return updateObject(state, updatedState);
}

const addIngredient = (state, action) => addRemoveIngredient(state, action);
const removeIngredient = (state, action) => addRemoveIngredient(state, action, true);

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const ingredientsFailed = (state, action) => updateObject(state, { error: true });