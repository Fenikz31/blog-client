import React from 'react';
import { useSelector } from 'react-redux';

import Snackbars from './components/snackbar';


import './app.css';
import AppContainer from './containers/appContainer';


export default function App () {
  const { feedback }  = useSelector(( state ) => state ),
        { code, message, reason, status } = feedback;

  return (
    <AppContainer>
      <Snackbars code={ code } message={ message } reason={ reason } status={ status }  />
    </AppContainer>
  )
}


