import React, { useState } from 'react';

import { Box, Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { login } from '../redux/actions';

import { AccountCircle, Password } from '@mui/icons-material';
import { AlternateEmail } from '@material-ui/icons';
const image = 'https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg'
// const image = 'https://wallpaperaccess.com/download/admin-16683'
export default function SignUp () {
  const dispatch = useDispatch(),
        { isAuth } = useSelector(({ auth }) => auth),
        location = useLocation(),
        navigate = useNavigate(),
        [ values, setValues ] = useState({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: ''
        })

  function handleChange ( e ) {
    const { name, value } = e.target
    setValues({ ...values, [ name ]: value })
  }

  function handleSignIn ( e ) {
    e.preventDefault()
    navigate( '/login', { replace: true })
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
            sx={{ display: 'flex', flexDirection: 'column', height: 600, justifyContent: 'space-between', width: 500 }}
          >
            <Typography p={ 2 } variant='h4'>
              Sign Up
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 400, justifyContent: 'space-around', p: 2 }}>
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              label='Firstname'
              name='firstname'
              onChange={ handleChange }
              placeholder='Firstname'
              required
              type='text'
            />
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              label='Lastname'
              name='lastname'
              onChange={ handleChange }
              placeholder='Lastname'
              required
              type='text'
            />
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
              required
              type='text'
            />
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
              label='Email'
              name='email'
              onChange={ handleChange }
              placeholder='Email'
              required
              type='email'
            />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Password />
                    </InputAdornment>
                  ),
                }}
                label='Password confirmation'
                name='password-confirmed'
                onChange={ handleChange }
                placeholder='Password'
                required
                type='password'
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
                required
                type='password'
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              <Button color='secondary' onClick={ handleSignIn } variant='contained' >Sign In</Button>
              <Button onClick={ handleSubmit } variant='contained' >Sign up</Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
    )

}
