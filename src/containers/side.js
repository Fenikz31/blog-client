import { Box } from '@mui/material';
import React from 'react';
import SideBar from '../components/side';

export default function SideContainer ({ children , ...rest } = {}) {
  return (
    <Box sx={{ bgcolor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', width: 120 }}>
      <SideBar />
    </Box>
  )
}