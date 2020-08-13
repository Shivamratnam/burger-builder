import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    authErrorMsg: null,
    loading: false,
    token: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                authErrorMsg: null,
                isAuthenticated: true,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                authErrorMsg: action.error,
                isAuthenticated: false,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loading: false,
                token: null,
                authErrorMsg: null,
                isAuthenticated: false,
            }
        default: return state
    }
}

export default reducer;