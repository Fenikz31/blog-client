import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Chart from '../components/charts';
import Featured from '../components/featured';
import Large from '../components/large';
import Small from '../components/small';

import { user_data } from '../dummy';

export default function Home () {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
    </Box>
  )
}
      {/* <Featured />
      <Chart data={ user_data } title={ 'User analytics' } grid dataKey='Active user' />
      <Widgets>
        <Small />
        <Large />
      </Widgets> */}

const Widgets = styled.div`
  display: flex;
  margin: 20px;
`
