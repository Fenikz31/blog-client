import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import common from './common';
import users from './users';

import { routerReducer } from 'react-router-redux';

const action = ( state = {}, { type } ) => ({ ...state, type })

export default combineReducers({
  action,
  articles,
  auth,
  common,
  router: routerReducer,
  users
});
