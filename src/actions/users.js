import { push } from 'react-router-redux';
import { authService, accountService } from '../services';

import * as types from '../constants/ActionTypes';

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message, phone) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    phone
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

function beginFetch() {
  return { type: types.FETCH_USER};
}

function fetchSuccess(user) {
  return {
    type: types.FETCH_SUCCESS_USER,
    user
  };
}

function fetchError(message) {
  return { type: types.FETCH_ERROR_USER, message };
}

export function fetchUser(phone) {
  return (dispatch) => {
    dispatch(beginFetch());

    return authService().getUser({phone})
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        if (response.data.blockchain_id) {
          dispatch(fetchAllTransactions(response.data.blockchain_id));
        }
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
}

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('phone', data.phone);
        dispatch(loginSuccess('You have been successfully logged in', data.phone));
        dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(loginError('Invalid phone number or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!'));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('phone');
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}

function beginFetchTransactions() {
  return { type: types.FETCH_TRANSACTIONS};
}

function fetchSuccessTransactions(transactions) {
  return {
    type: types.FETCH_SUCCESS_TRANSACTIONS,
    transactions
  };
}

function fetchErrorTransactions(message) {
  return { type: types.FETCH_ERROR_TRANSACTIONS, message };
}

export function fetchAllTransactions(id) {
  return (dispatch) => {
    dispatch(beginFetchTransactions());
    return accountService().getTransactions(id)
      .then((response) => {
        dispatch(fetchSuccessTransactions(response.data));
      })
      .catch((err) => {
        dispatch(fetchErrorTransactions(err));
      });
  };
}
