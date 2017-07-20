import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialAccounts = {
  accounts: []
};


const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_ACCOUNTS:
      return '';
    case types.FETCH_ERROR_ACCOUNTS:
    case types.BUY_PRODUCT_SUCCESS:
    case types.BUY_PRODUCT_ERROR:
      return action.message;
    default:
      return state;
  }
};

const accounts = (state = initialAccounts, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      };
    default:
      return state;
  }
};

const accountReducer = combineReducers({
  message,
  accounts
});

export default accountReducer;
