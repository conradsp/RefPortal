import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import user from './user';
import product from './product';
import account from './account';

const reducers = {
  routing: routerReducer,
  user,
  product,
  settings,
  account
};

module.exports = combineReducers(reducers);
