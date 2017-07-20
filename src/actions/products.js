import { push } from 'react-router-redux';
import { prodService } from '../services';

import * as types from '../constants/ActionTypes';


function beginFetchAll() {
  return { type: types.FETCH_ALLPRODUCTS};
}

function fetchSuccessAll(products) {
  return {
    type: types.FETCH_SUCCESS_ALLPRODUCTS,
    products
  };
}

function fetchErrorAll(message) {
  return { type: types.FETCH_ERROR_ALLPRODUCTS, message };
}

export function fetchAllProducts() {
  return (dispatch) => {
    dispatch(beginFetchAll());

    return prodService().getProducts()
      .then((response) => {
        dispatch(fetchSuccessAll(response.data));
      })
      .catch((err) => {
        dispatch(fetchErrorAll(err));
      });
  };
}

function beginFetch() {
  return { type: types.FETCH_PRODUCT};
}

function fetchSuccess(product) {
  return {
    type: types.FETCH_SUCCESS_PRODUCT,
    product
  };
}

function fetchError(message) {
  return { type: types.FETCH_ERROR_PRODUCT, message };
}

export function fetchProduct(id) {
  return (dispatch) => {
    dispatch(beginFetch());

    return prodService().getProduct({id})
      .then((response) => {
        dispatch(fetchSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
}

