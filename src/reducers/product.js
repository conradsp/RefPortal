import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialProducts = {
  products: [],
  currProduct: { photos: [{filename: null}]}
};


const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_ALLPRODUCTS:
    case types.FETCH_SUCCESS_PRODUCT:
      return '';
    case types.FETCH_ERROR_ALLPRODUCTS:
    case types.FETCH_ERROR_PRODUCT:
      return action.message;
    default:
      return state;
  }
};

const products = (state = initialProducts, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_ALLPRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case types.FETCH_SUCCESS_PRODUCT:
      return {
        ...state,
        currProduct: action.product
      };
    default:
      return state;
  }
};

const productReducer = combineReducers({
  message,
  products
});

export default productReducer;
