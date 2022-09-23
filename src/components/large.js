import React from 'react';
import { Visibility } from '@material-ui/icons';
import styled from 'styled-components';
import { lastTransctions } from '../dummy';

export default function Large () {
  return (
    <Container>
      <Title>Lastest Transactions</Title>
      <Table>
        <thead>
          <tr>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {
            lastTransctions && lastTransctions.map(( item, index ) => (
              <tr key={ index }>
                <User>
                  <Img src={ item.avatar } alt={ item.username } />
                  <span>{ item.username }</span>
                </User>
                <LightTd>{ item.date }</LightTd>
                <LightTd>{ item.transaction }</LightTd>
                <td>
                  <WidgetButton bgColor={ item.bgColor } fdColor={ item.fdColor } >{ item.type }</WidgetButton>
                </td>
              </tr>          
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`
const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
`
const WidgetButton = styled.button`
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    background-color:${( props ) => props.bgColor || "#ebf1fe" };
    color:${( props ) => props.fdColor || "#2a7ade" };
`
const Table = styled.table`
    width: 100%;
    border-spacing: 20px;
`
const Th = styled.th`
    text-align: left;
`
const User = styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const LightTd = styled.td`
    font-weight: 300;
`
