import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import DisplayContainer from './display';
import NavContainer from './nav';
import SideContainer from './side';
import ViewContainer from './views';

export default function AppContainer ({ children , ...rest } = {}) {
  const { auth }  = useSelector(( state ) => state ),
        { isAuth } = auth;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <NavContainer />
      <DisplayContainer>
        { isAuth ? <SideContainer /> : null }
        <ViewContainer />
      </DisplayContainer>
      { children }
    </Box>
  )
}