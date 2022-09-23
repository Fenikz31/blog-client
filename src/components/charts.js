import { Box } from '@mui/material';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import styled from 'styled-components';

export default function Chart ({
  data,
  grid,
  dataKey,
  title
} = {}) {
  return (
    <Box sx={{ boxShadow: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '93.5%' }} >
      <Title>{ title }</Title>
      <ResponsiveContainer width='100%' aspect={ 4 / 1 } style={{ padding: 2 }} >
        <LineChart data={ data } margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <XAxis dataKey='name'stroke='#5550bd' />
          <Line type='monotone' dataKey={ dataKey } stroke='#483D8B' strokeDasharray='3 4 5 2' />
          <Tooltip />
          { grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' /> }
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

const Container = styled.div`
  margin: 20px;
  padding: 20 px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`

const Title = styled.h3`
  margin-bottom: 20px;
`
