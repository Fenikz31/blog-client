import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app.js';
import { store, history } from './redux/store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
