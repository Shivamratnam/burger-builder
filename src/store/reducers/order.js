import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders.concat(),
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.START_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ORDER_PURCHASED:
            return {
                ...state,
                purchased: true
            }
        case actionTypes.RESET_PURCHASED:
            return {
                ...state,
                purchased: false
            }
        default: return state;
    }
}

export default reducer;