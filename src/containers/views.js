import { Box } from '@mui/material';
import React from 'react';
import Router from '../components/Router';

export default function ViewContainer ({ children , ...rest } = {}) {
  return (
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Router />
    </Box>
  )
}