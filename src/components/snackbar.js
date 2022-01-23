import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert, Stack } from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { AUTH, USERS } from '../redux/constants';

const Alert = forwardRef(
  function Alert( props, ref ) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant='filled' { ...props } />
});

export default function Snackbars({ code, message, reason, status } = {}) {
  const [ open, setOpen ] = useState( false ),
        { action } = useSelector(( state ) => state);

  const handleClose = ( event, reason ) => {
    if ( reason === 'clickaway' )
    return;

    setOpen( false );
  };

  const handleSeverity = ( status ) => {
    if (( status < 200 ) || (( 300 <= status ) && ( status < 400 )))
      return 'info'

    if (( 200 <= status ) && ( status < 300 ))
      return 'success'
      
    if (( 400 <= status ) && ( status < 500 ))
      return 'warning'
      
    if ( status >= 500 )
      return 'error'
  };

  function renderAlert () {
    return ( <Alert severity={ handleSeverity( status )} >{ `${ code ? `${ code } - ` : '' }${ message }${ reason ? ` - ${ reason }` : '' }` }</Alert> )
  }

  useEffect(() => {
    switch ( action ) {
      case AUTH.SET.USER.FAILURE:
      case AUTH.SET.USER.SUCCESS:
      case USERS.GET.ALL.FAILURE:
      case USERS.GET.ALL.SUCCESS:
        return setOpen( true )

      default:
        return ;
    }
  }, [ action ])
 

  return (
    <Stack spacing={ 2 } sx={{ width: '100%' }}>
      <Snackbar open={ open } autoHideDuration={ 5000 } onClose={ handleClose }>
        { renderAlert() }
      </Snackbar>
    </Stack>
  );
}