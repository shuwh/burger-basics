import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        localId: authData.localId,
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMyDCSe6aY3j1TZy8smC4qSWYVZKnXmH8';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMyDCSe6aY3j1TZy8smC4qSWYVZKnXmH8'
        }
        axios.post(url, authData)
            .then(response => {
                // console.log(response)
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                // console.log(error.response);
                dispatch(authFail(error.response.data.error));
            });
    }
};