import  React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { Button } from '@mui/material';

export default function AccountMenu({
  anchorEl = null,
  avatar,
  onClose = () => null,
  open
}) {
  const dispatch = useDispatch()
  return (
    <>
      <Menu
        id='account-menu'
        anchorEl={ anchorEl }
        open={ open }
        onClose={ onClose }
        onClick={ onClose }
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: 'background.main',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            // mt: -0.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: 2,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: 'background.main',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {/* <MenuItem>
          <Avatar src={ `${ avatar }` } /> Profile
        </MenuItem>
        <MenuItem disabled >
          <Avatar src={ `${ avatar }` }/> My account
        </MenuItem>
        <Divider /> 
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon >
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>*/}
        <MenuItem onClick={( e ) => dispatch( logout())} >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
