import 'react-hot-loader';
import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app.js';
import { store } from './redux/store';
import { login } from './redux/actions/index.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3D5AFE',
    },
    secondary: {
      main: '#f13736',
    },
    background: {
      default: '#565454',
    },
  }
})

ReactDOM.render(
  <Provider store={ store }>
    <ThemeProvider theme={ theme } >
      <CssBaseline
        children={ <Router children={ <App /> } /> }
        style={{ height: '100%', width: '100%', margin: 0, padding: 0 }}/>
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);

const environment = `${process.env.ENV}`
/* */
if ( environment === 'development' )
  store.dispatch( login({ password: `${ process.env.PASSWORD }`, username: `${ process.env.USERNAME }` }))
/* **/