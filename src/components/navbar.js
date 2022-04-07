import React, { useState } from 'react';
import { Language, NotificationsNone, Settings } from '@material-ui/icons';
import styled from 'styled-components';
import { AppBar, Avatar, Badge, Box, Container, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import AccountMenu from './menu';
const S3_URL = `${ process.env.S3_URL }`
export default function Navbar ({ isAuth, profile } = {}) {
  const { avatar, notifications } = profile,
        [ anchorEl, setAnchorEl ] = useState( null ),
        open = Boolean( anchorEl );

  function handleClick( e ) {
    setAnchorEl( e.currentTarget )
  }

  function handleClose() {
    setAnchorEl( null )
  }

  function renderTopRight() {
    if ( isAuth )
      return (
        <>
          <Stack direction='row' spacing={ 2 } sx={{ alignItems: 'center', height: '100%' }}>
           {/*  <Badge badgeContent={ notifications.length } color='error'>
              <NotificationsNone style={{ color: 'white', display: 'block', padding: 2 }}/>
            </Badge>
            <Badge badgeContent={ notifications.length } color='error'>
              <Language style={{ color: 'white', display: 'block' }}/>
            </Badge>
            <Tooltip title='Open settings'>
              <IconButton >
                <Settings />
              </IconButton>
            </Tooltip> */}
            <IconButton onClick={ handleClick } >
              <Avatar alt='avatar' src={`${S3_URL}blog/${ avatar }`} sx={{ color: 'white', height: 24, width: 24 }} />
            </IconButton>
          </Stack>
          <AccountMenu anchorEl={ anchorEl } open={ open } onClose={ handleClose } />
        </>

      )
      
    return null
  }


  return (
    <AppBar position='static' sx={{ boxShadow: 3, display: 'flex', m: 0, p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 0, p: '0 24px'  }}>
        <Toolbar disableGutters sx={{ display: 'flex', m: 0, p: 0}}>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex', xl: 'flex' } }}
          >
            Links Admin
          </Typography>


        </Toolbar>
        <Box>
        { renderTopRight() }
        </Box>
      </Box>
    </AppBar>
  )

  function renderWorldNotifications() {
    return (
    <IconButton sx={{ my: 2, color: 'white', display: 'block' }}>
      <Language />
      <IconBadge>3</IconBadge>
    </IconButton>
    );
  }
}

// const Container = styled.div`
//     width: 100%;
//     height: 50px;
//     background-color: white;
//     position: sticky;
//     top: 0;
//     z-index: 999;
// `
const IconBadge = styled.span`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`
// const Avatar = styled.img`
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     cursor: pointer;
// `