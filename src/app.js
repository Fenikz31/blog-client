import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Link as RouterLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './components/navbar';
import Snackbars from './components/snackbar';

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Users from './pages/users';

import './app.css';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from './components/panel';
import AppContainer from './containers/appContainer';

function tabProps( index ) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function App () {
  const { auth, feedback }  = useSelector(( state ) => state ),
        { isAuth, profile } = auth,
        { code, message, reason, status } = feedback;

  return (
    <AppContainer>
      <Snackbars code={ code } message={ message } reason={ reason } status={ status }  /> 
    </AppContainer>
  )
}

function ProtectedRoutes ({ auth, children } = {}) {
  if ( auth )
    return children

  const location = useLocation()
  return <Navigate to='/login' state={{ from: location }} replace />
}
