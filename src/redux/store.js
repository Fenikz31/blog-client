import { applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);
export const store = createStore(
  reducers, composeWithDevTools(applyMiddleware( thunk )));
