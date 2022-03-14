import React, { useEffect, useState } from 'react';

import { Box, Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { signup } from '../redux/actions';

import { AccountCircle, Password } from '@mui/icons-material';
import { AlternateEmail } from '@material-ui/icons';
const image = 'https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg'

export default function SignUp () {
  const dispatch = useDispatch(),
        { action, auth } = useSelector(( state ) => state),
        { isAuth } = auth,
        navigate = useNavigate(),
        [ errors, setErrors ] = useState({
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          password: true,
          password_confirmed: true
        }),
        [ values, setValues ] = useState({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          password_confirmed: true
        })

  function handleChange ( e ) {
    const { name, value } = e.target,
          regex = {
            email: /^.+\@.+\..+$/,
            firstname: /^[a-zA-Z0-9]{3,20}$/,
            lastname: /^[a-zA-Z0-9]{2,30}$/,
            username: /^[a-zA-Z0-9]{6,20}$/,
            password: /^[a-zA-Z0-9]{3,30}$/,
          }
    
    if ( name === 'email' ) {
      setValues({ ...values, [ name ]: value })

      if( regex[ name ].test( value ))    
        return setErrors({ ...errors, [ name ]: false })

      setErrors({ ...errors, [ name ]: true })
    }
    
    if ( name === 'firstname' ) {
      setValues({ ...values, [ name ]: value })

      if  ( regex[ name ].test( value ))
        return setErrors({ ...errors, [ name ]: false })
      
      setErrors({ ...errors, [ name ]: true })
    }
    
    if ( name === 'lastname') {
      setValues({ ...values, [ name ]: value }) 
      if ( regex[ name ].test( value ))    
        return setErrors({ ...errors, [ name ]: false })

      setErrors({ ...errors, [ name ]: true })
    }
    
    if ( name === 'username' ) {
      setValues({ ...values, [ name ]: value })
      if ( regex[ name ].test( value ))
        return setErrors({ ...errors, [ name ]: false })

      setErrors({ ...errors, [ name ]: true })
    }
    
    if ( name === 'password' ) {
      setValues({ ...values, [ name ]: value })
      if ( regex[ name ].test( value ))  
        return setErrors({ ...errors, [ name ]: false })

      setErrors({ ...errors, [ name ]: true })
    }
    
    if ( name === 'password_confirmed' ) {
      if ( regex[ 'password' ].test( value ) && ( value === values[ 'password' ]))  
        return setErrors({ ...errors, [ name ]: false })

      setErrors({ ...errors, [ name ]: true })
    }
  }

  function handleSignIn ( e ) {
    e.preventDefault()
    navigate( '/login', { replace: true })
  }

  function handleSubmit ( e ) {
    e.preventDefault()
    dispatch( signup( values ))
  }

  useEffect(() => {
    if ( action === 'AUTH.SIGNUP.SUCCESS' ) {
      navigate( '/login', { replace: true })
    }
  }, [ action ])

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
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 500, justifyContent: 'space-around', p: 2 }}>
              <TextField
                error={ errors[ 'firstname' ]}
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
                error={ errors[ 'lastname' ]}
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
                error={ errors[ 'username' ]}
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
                error={ errors[ 'email' ]}
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
                error={ errors[ 'password' ]}
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
              <TextField
                error={ errors[ 'password_confirmed' ]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Password />
                    </InputAdornment>
                  ),
                }}
                label='Password confirmation'
                name='password_confirmed'
                onChange={ handleChange }
                placeholder='confirm your password'
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
