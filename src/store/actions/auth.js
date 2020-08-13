import * as actionTypes from './actionTypes';
import * as firebase from '../../firebase';

const authStart= () => {
    return {
        type: actionTypes.AUTH_START
    }
}
const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
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


export const auth = (email, password, authType) => {
    return dispatch => {
        dispatch(authStart());
        if (authType === actionTypes.AUTH_LOGIN) {
            firebase.auth.signInWithEmailAndPassword(email, password).then(res => {
                console.log("LOGIN: ", res);
                res.user.getIdToken().then(token => {
                    console.log(token);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userid', res.user.uid);
                    sessionStorage.setItem('displayName', res.user.displayName);
                    dispatch(authSuccess(token));
                });
            }).catch(error => {
                console.log(error);
                dispatch(authFail(error.message));
            });
        } else { // for signup
            firebase.auth.createUserWithEmailAndPassword(email, password).then(res => {
                console.log("SIGNUP: ", res);
                res.user.getIdToken().then(token => {
                    console.log(token);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userid', res.user.uid);
                    sessionStorage.setItem('displayName', res.user.displayName);
                    dispatch(authSuccess(token));
                });
            }).catch(error => {
                console.log(error);
                dispatch(authFail(error.message));
            });
        }
    };
};