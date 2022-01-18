import React from 'react';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router';

import { ItemAddButton, ItemContainer, ItemShowImg, ItemTitleContainer, ItemUpdateButton, ItemUpload, ItemUploadImg } from '../styles/styles';

export default function User() {
  const { id } = useParams(),
        dispatch = useDispatch(),
        { loading, rows } = useSelector(({ users })=> users ),
        action = useSelector(({ action })=> action.type ),
        { avatar, city, country, createdAt, email, firstname, lastname, role, updatedAt, username } = rows.filter(({ _id }) => _id === id)[0],
        fullname = `${ firstname } ${ lastname }`
 
  return (
    <ItemContainer>
      <ItemTitleContainer>
        <h1>Edit User</h1>
        <Link to='/newUser'>
          <ItemAddButton>Create</ItemAddButton>
        </Link>
      </ItemTitleContainer>
      <UserContainer>
        <ShowUser>
          <ShowUserTop>
            <ItemShowImg
              src={ avatar }
              alt='show-image'
            />
            <ShowTopTitle>
              <FontWeight bolder>{ fullname }</FontWeight>
              <FontWeight>{ role }</FontWeight>
            </ShowTopTitle>
          </ShowUserTop>
          <ShowUserBottom>
            <UserShowTitle>Account Details</UserShowTitle>
            <UserShowInfo>
              <PermIdentity className='showIcon' />
              <span className='showInfoTitle'>{ username }</span>
            </UserShowInfo>
            <UserShowInfo>
            <UserShowTitle>Created at</UserShowTitle>
              <CalendarToday className='showIcon' />
              <span className='showInfoTitle'>{ createdAt.split('T')[ 0 ] }</span>
            </UserShowInfo>
            <UserShowInfo>
            <UserShowTitle>Updated at</UserShowTitle>
              <CalendarToday className='showIcon' />
              <span className='showInfoTitle'>{ updatedAt.split('T')[ 0 ] }</span>
            </UserShowInfo>
            <UserShowTitle>Contact Details</UserShowTitle>
            <UserShowInfo>
              <MailOutline className='showIcon' />
              <span className='showInfoTitle'>{ email }</span>
            </UserShowInfo>
            <UserShowInfo>
              <LocationSearching className='showIcon' />
              <span className='showInfoTitle'>{ city ? city : null } | { country? country : null }</span>
            </UserShowInfo>
          </ShowUserBottom>
        </ShowUser>
        <UpdateUser>
          <UpdateTitle>Edit</UpdateTitle>
          <UpdateForm>
            <div>
              <UpdateItem>
                <label>Username</label>
                <input
                  type='text'
                  placeholder={ username }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Full Name</label>
                <input
                  type='text'
                  placeholder={ fullname }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Email</label>
                <input
                  type='text'
                  placeholder={ email }
                />
              </UpdateItem>
              <UpdateItem>
                <label>City</label>
                <input
                  type='text'
                  placeholder={ city }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Country</label>
                <input
                  type='text'
                  placeholder={ country }
                />
              </UpdateItem>
            </div>
            <UpdateRight>
              <ItemUpload>
                <ItemUploadImg
                  src={ avatar }
                  alt='upload-img'
                />
                <label htmlFor='file'>
                  <MyPublish />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} />
              </ItemUpload>
              <ItemUpdateButton>Update</ItemUpdateButton>
            </UpdateRight>
          </UpdateForm>
        </UpdateUser>
      </UserContainer>
    </ItemContainer>
  );
}

const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
const ShowUser = styled.div`
    flex: 1;
    padding: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const UpdateUser = styled.div`
    flex: 2;
    padding: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`
const ShowUserTop = styled.div`
    display: flex;
    align-items: center;
`
const ShowUserBottom = styled.div`
    margin-top: 20px;
`
const ShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const FontWeight = styled.span`
    font-weight: ${( props ) => props.bolder ? "600" : "300"};
`
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`
const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
    .showIcon{
        font-size: 16px !important;
    }
    .showInfoTitle{
        margin-left: 10px;
    }
`
const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const UpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        margin-bottom: 5px;
        font-size: 14px;
    }
    input{
        border: none;
        width: 250px;
        height: 30px;
        border-bottom: 1px solid gray;
    }
`
const UpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MyPublish = styled( Publish )`
    cursor: pointer;
`
