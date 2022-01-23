import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import common from './common';
import info from './info';
import users from './users';

import { routerReducer } from 'react-router-redux';

const action = ( state = '', { type } ) => type

export default combineReducers({
  action,
  articles,
  auth,
  common,
  info,
  router: routerReducer,
  users
});
