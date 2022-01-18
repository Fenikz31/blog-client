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
    <Container>
      <Title>{ title }</Title>
      <ResponsiveContainer width='100%' aspect={ 4 / 1 }>
        <LineChart data={ data }>
          <XAxis dataKey='name' stroke='#5550bd' />
          <Line type='monotone' dataKey={ dataKey } stroke='#483D8B' strokeDasharray='3 4 5 2' />
          <Tooltip />
          { grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' /> }
        </LineChart>
      </ResponsiveContainer>
    </Container>
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
