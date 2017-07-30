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
    return accountService().buyProduct({data: product, userId})
      .then((response) => {
        dispatch(buyProductSuccess(response.data));
      })
      .catch((err) => {
        dispatch(buyProductError(err));
      });
  };
}

function beginTransferMoney() {
  return { type: types.TRANSFER_MONEY};
}

function transferMoneySuccess() {
  return {
    type: types.TRANSFER_MONEY_SUCCESS,
    message: 'Transfer successful'
  };
}

function transferMoneyError(message) {
  return { type: types.TRANSFER_MONEY_ERROR, message };
}

export function transferMoney(phone, amount) {
  return (dispatch) => {
    dispatch(beginTransferMoney());
    return accountService().transferMoney({phone, data: {amount} })
      .then((response) => {
        dispatch(transferMoneySuccess(response.data));
      })
      .catch((err) => {
        dispatch(transferMoneyError(err));
      });
  };
}

