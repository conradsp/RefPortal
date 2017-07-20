import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialProfile = {
  phone: null,
  info: { initiative: {} },
  transactions: [],
  session: sessionStorage.jwt
};

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.FETCH_SUCCESS_TRANSACTIONS:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.FETCH_ERROR_TRANSACTIONS:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const profile = (state = initialProfile, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
      return {
        ...state,
        phone: action.phone,
        session: sessionStorage.jwt
      };
    case types.FETCH_SUCCESS_USER:
      return {
        ...state,
        info: action.user
      };
    case types.FETCH_SUCCESS_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      };
    case types.LOGOUT_SUCCESS_USER:
      return initialProfile;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message,
  profile
});

export default userReducer;
