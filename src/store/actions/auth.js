import * as actionTypes from './actionTypes';
import * as firebase from '../../firebase';

const authStart= () => {
    return {
        type: actionTypes.AUTH_START
    }
}
const authSuccess = (token, uid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        uid: uid
    }
}
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const setAuthRedirectUrl = (url) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_URL,
        authRedirectUrl: url
    }
}


export const auth = (email, password, authType) => {
    return dispatch => {
        dispatch(authStart());
        if (authType === actionTypes.AUTH_LOGIN) {
            firebase.auth.signInWithEmailAndPassword(email, password).then(res => {
                res.user.getIdToken().then(token => {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userid', res.user.uid);
                    sessionStorage.setItem('displayName', res.user.displayName);
                    dispatch(authSuccess(token, res.user.uid));
                });
            }).catch(error => {
                dispatch(authFail(error.message));
            });
        } else { // for signup
            firebase.auth.createUserWithEmailAndPassword(email, password).then(res => {
                res.user.getIdToken().then(token => {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userid', res.user.uid);
                    sessionStorage.setItem('displayName', res.user.displayName);
                    dispatch(authSuccess(token, res.user.uid));
                });
            }).catch(error => {
                dispatch(authFail(error.message));
            });
        }
    };
};