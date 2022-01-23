import React, { useEffect, useState } from 'react';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router';

import { ItemAddButton, ItemContainer, ItemShowImg, ItemTitleContainer, ItemUpdateButton, ItemUpload, ItemUploadImg } from '../styles/styles';
import { Button, MenuItem, Select } from '@material-ui/core';
import { get_user } from '../redux/actions/users';

export default function User({ data = null } = {}) {
  const [ user, setUser ] = useState( false )
  const /* { id } = useParams(),
        dispatch = useDispatch(),
        { action, users } = useSelector(( state ) => state ),
        { loading, rows } = users,
        */
        { avatar, city, country, created, email, firstname, lastname, role, updated, username } = data, 
        [ values, setValues ] = useState({
          avatar: data ? data.avatar : '',
          city: data ? data.city : '',
          country: data ? data.country : '',
          created: data ? data.created : '',
          email: data ? data.email : '',
          firstname: data ? data.firstname : '',
          lastname: data ? data.lastname : '',
          role: data ? data.role : '',
          updated: data ? data.updated : '',
          username: data ? data.username : ''
        }),
        fullname = `${ values.firstname } ${ values.lastname }`
  function handleChange ( event ) {
    const { files, name, value } = event.target
    console.log( 'event target name => ', name )
    console.log( 'event target value => ', value )
    if ( name !== 'avatar' )
      return setValues({ ...values, [ name ]: value })

    console.log( 'event target files => ', files[0] )
  }

  return (
    <ItemContainer>
      <UserContainer>
        <UpdateUser>
          <UpdateForm>
            <div>
              <UpdateItem>
                <label>Full Name</label>
                <input
                  type='text'
                  disabled
                  placeholder={ fullname }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  onChange={ handleChange }
                  placeholder={ values.username }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={ handleChange }
                  placeholder={ values.email }
                />
              </UpdateItem>
              <UpdateItem>
                <label>City</label>
                <input
                  type='text'
                  name='city'
                  onChange={ handleChange }
                  placeholder={ values.city }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Country</label>
                <input
                  type='text'
                  name='country'
                  onChange={ handleChange }
                  placeholder={ values.country }
                />
              </UpdateItem>
              <UpdateItem>
                <label>Role</label>
                <Select
                  label='Role'
                  name='role'
                  onChange={ handleChange }
                  value={ values.role }
                >
                  {
                    [ 'admin', 'author', 'reader', 'guest', 'user' ].map(( role ) =>{
                      return ( <MenuItem key={ role } value={ role }>{ role }</MenuItem> )
                    })
                  }
                </Select>
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
                <input
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                  name='avatar'
                  onChange={ handleChange }
                  onClick={( e ) => console.log( values, 'upload => ', e.target.files[0] )} />
              </ItemUpload>
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
    padding-right: 8px;
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
        width: 200px;
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
