import React from 'react';
import { Box } from '@mui/material';

export default function DisplayContainer ({ children , ...rest } = {}) {
  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      { children }
    </Box>
  )
}