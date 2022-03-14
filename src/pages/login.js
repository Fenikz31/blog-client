import React, { useState } from 'react';

import { Box, Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { login } from '../redux/actions';

import { AccountCircle, Password } from '@mui/icons-material';
const image = 'https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg'
// const image = 'https://wallpaperaccess.com/download/admin-16683'
export default function Login () {
  const dispatch = useDispatch(),
        { isAuth } = useSelector(({ auth }) => auth),
        location = useLocation(),
        navigate = useNavigate(),
        from = location.state?.from?.pathname || '/',
        [ values, setValues ] = useState({
          username: '',
          password: ''
        })

  function handleChange ( e ) {
    const { name, value } = e.target
    setValues({ ...values, [ name ]: value })
  }

  function handleSignUp ( e ) {
    e.preventDefault()
    navigate( '/signup', { replace: true })
  }

  function handleSubmit ( e ) {
    e.preventDefault()
    dispatch( login( values ))
  }

  if ( !isAuth )
    return (
      <Paper sx={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${ image })`, backgroundSize: 'cover', height: '100%', width: '100%', m: 0, p: 0 }}>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', m: 0, p: 1 }}>
          <Paper
            elevation={ 8 }
            sx={{ display: 'flex', flexDirection: 'column', height: 400, justifyContent: 'space-between', width: 500 }}
          >
            <Typography p={ 2 } variant='h4'>
              Sign in
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'space-around', p: 2 }}>
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              label='Username'
              name='username'
              onChange={ handleChange }
              placeholder='Username'
              type='text'
            />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Password />
                    </InputAdornment>
                  ),
                }}
                label='Password'
                name='password'
                onChange={ handleChange }
                placeholder='Password'
                type='password'
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              <Button color='secondary' onClick={ handleSignUp } variant='contained' >Sign Up</Button>
              <Button onClick={ handleSubmit } variant='contained' >Login</Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
    )

  return <Navigate to='/' replace={ true } />

}
