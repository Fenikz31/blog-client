import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar';

export default function NavContainer ({ children , ...rest } = {}) {  
  const { auth }  = useSelector(( state ) => state ),
        { isAuth, profile } = auth
  return (
    <Box sx={{ maxHeight: 64, position: 'sticky', width: '100%' }}>
      < Navbar isAuth={ isAuth } profile={ profile } />
    </Box>
  )
}