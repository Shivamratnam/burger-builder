import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uid: null,
    isAuthenticated: false,
    authErrorMsg: null,
    loading: false,
    token: null,
    loginRedirectUrl: "/"
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
                uid: action.uid,
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
        case actionTypes.SET_AUTH_REDIRECT_URL:
            return {
                ...state,
                loginRedirectUrl: action.authRedirectUrl
            }
        default: return state
    }
}

export default reducer;