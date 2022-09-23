import React from 'react';
import { ArrowUpward } from '@material-ui/icons';
import styled from 'styled-components';
import { featured_data } from '../dummy'
import { Box } from '@mui/material';

export default function Featured () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, width: '100%' }} >
      {
        featured_data && featured_data.map(( item, index ) => (
          <Item key={ index } >
            <Title>{ item.title }</Title>
            <MoneyContainer>
              <span className='featured_money'>{ item.money }</span>
              <span className='featured_rate'>{ item.rate } <ArrowUpward className='featured_icon' /></span>
            </MoneyContainer>
            <Sub>Compared to previous month</Sub>
          </Item>
        ))
      }
    </Box>
  )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Item = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Title = styled.span`
    font-size: 20px;
`
const MoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
    .featured_money{
        font-size: 30px;
        font-weight: 600;
    }
    .featured_rate{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
.featured_icon{
        font-size: 14px;
        margin-left: 5px;
        color: green;
    }
.featured_icon.negative{
        color: red;
    }
`
const Sub = styled.span`
    font-size: 15px;
    color: gray;
`
