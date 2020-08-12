import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 10,
}

const INGREDIENT_PRICE = {
    salad: 3,
    meat: 5,
    bacon: 7,
    cheese: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredient]
            };
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                totalPrice: 10,
                ingredients: {...action.ingredients}
            }
        default: return state;
    }
}

export default reducer;