import { push } from 'react-router-redux';
import { accountService } from '../services';

import * as types from '../constants/ActionTypes';

function beginFetchAccounts() {
  return { type: types.FETCH_ACCOUNTS};
}

function fetchSuccessAccounts(accounts) {
  return {
    type: types.FETCH_SUCCESS_ACCOUNTS,
    accounts
  };
}

function fetchErrorAccounts(message) {
  return { type: types.FETCH_ERROR_ACCOUNTS, message };
}

export function fetchAccounts() {
  return (dispatch) => {
    dispatch(beginFetchAccounts());

    return accountService().getAccounts()
      .then((response) => {
        dispatch(fetchSuccessAccounts(response.data));
      })
      .catch((err) => {
        dispatch(fetchErrorAccounts(err));
      });
  };
}


function beginBuyProduct() {
  return { type: types.BUY_PRODUCT};
}

function buyProductSuccess() {
  return {
    type: types.BUY_PRODUCT_SUCCESS,
    message: 'Purchase successful'
  };
}

function buyProductError(message) {
  return { type: types.BUY_PRODUCT_ERROR, message };
}

export function buyProduct(product, userId) {
  return (dispatch) => {
    dispatch(beginBuyProduct());
    console.log(product);
    return accountService().buyProduct({data: product, userId})
      .then((response) => {
        dispatch(buyProductSuccess(response.data));
      })
      .catch((err) => {
        dispatch(buyProductError(err));
      });
  };
}

