import React from 'react';
import { Visibility } from '@material-ui/icons';
import styled from 'styled-components';
import { newMember } from '../dummy';

export default function Small () {
  return (
    <Container>
      <Title>Last Members</Title>
      <List>
        {
          newMember && newMember.map(( member ) => (
            <li key={ member.id } className='ListItem' >
              <Img src={ member.avatar } alt={ member.username } />
              <User>
                <span className='Username' >{ member.username }</span>
                <span className='UserTitle' >{ member.occupation }</span>
              </User>
              <WidgetButton>
                <Visibility className='WidgetIcon' />
                Display
              </WidgetButton>
            </li>
          ))
        }
      </List>
    </Container>
  )
}

const Container = styled.div`
    flex: 1;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`
const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
`
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    .ListItem{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0px;
    }
`
const User = styled.div`
    display: flex;
    flex-direction: column;
    .Username{
        font-weight: 600;
    }
.UserTitle{
        font-weight: 300;
    }
`
const WidgetButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
    .WidgetIcon{
        font-size: 16px !important;
        margin-right: 5px;
    }
`
