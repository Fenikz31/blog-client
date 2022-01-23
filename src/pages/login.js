import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../redux/actions';

import { LoginButton } from '../styles/styles'
const image = 'https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg'
// const image = 'https://wallpaperaccess.com/download/admin-16683'
export default function Login () {
  const dispatch = useDispatch(),
        { isAuth } = useSelector(({ auth }) => auth),
        location = useLocation(),
        from = location.state?.from?.pathname || '/',
        [ values, setValues ] = useState({
          username: '',
          password: ''
        })

  function handleChange ( e ) {
    const { name, value } = e.target
    setValues({ ...values, [ name ]: value })
  }

  function handleSubmit ( e ) {
    e.preventDefault()
    dispatch( login( values ))
  }

  if ( !isAuth )
    return (
      <Paper sx={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${ image })`, backgroundSize: 'cover', height: '100%', width: '100%', m: 0, p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', m: 0, p: 0 }}>
          <Bottom>
            <Form>
              <input name='username' type='text' placeholder='Username or Email' onChange={ handleChange } />
              <input name='password' type='password' placeholder='Password' onChange={ handleChange } />
              <LoginButton onClick={ handleSubmit } >Sign In</LoginButton>
            </Form>
          </Bottom>
        </Box>
      </Paper>
    )

  return <Navigate to='/' replace={ true } />

}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
        ),
        url("https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.ava-viti.com%2Fclient%2FFichierPro%2F&psig=AOvVaw2mTv_tG3gtG0ztzEQHWfrX&ust=1642609415881000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNC6lZDbu_UCFQAAAAAdAAAAABAE");
    background-size: cover;
    position: relative;
`

const Bottom = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`
const Form = styled.form`
        width: 300px;
        height: 300px;
        padding: 30px;
        border-radius: 5px;
        background-color: #0b0b0b;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
input {
        height: 40px;
        border-radius: 5px;
        background-color: white;
        color: black;
        padding-left: 10px;
    }
span {
        color: lightgray;
        b {
            color: white;
        }
    }
`
