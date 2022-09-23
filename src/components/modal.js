import React, { Children, forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Close, Delete, Edit, Save } from '@material-ui/icons';
import { Box, IconButton } from '@mui/material';

const Transition = forwardRef(function Transition( props, ref ) {
  return <Slide direction='up' ref={ ref } { ...props } />;
});

export default function Modal({
  actions= {
    close: null,
    create: null,
    delete: null,
    reset: null,
    search: null,
    update: null
  },
  children,
  data = null,
  id = null,
  title = null,
  type = 'search',
  ...rest
} = {}) {
  const [ open, setOpen ] = useState( true )

  function handleCancel () {
    setOpen( false )
    if ( 'cancel' in actions ) {
      if ( typeof actions.cancel === 'function' ) {
        actions.cancel()
      }
    }
  }

  function handleClose ( event, reason ) {
    console.log( type )
    if ( reason !== 'backdropClick' ) {
      setOpen( false )
      if ( 'close' in actions ) {
        if ( typeof actions.close === 'function' ) {
          actions.close()
        }
      }
    }
  }

  function handleDelete () {
    if ( 'delete' in actions ) {
      if ( typeof actions.delete === 'function' ) {
        dispatch( actions.delete( id ))
      }
    }

    handleClose()
  }

  function handleReset () {
    if ( 'reset' in actions ) {
      if ( typeof actions.reset === 'function' ) {
        actions.reset()
      }
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    const action = actions[ type ]
    
    /*
     const content = MergeObject( fields.map(
        ({ name, onSubmit }) =>  (
          onSubmit ? ({ [ name ]: onSubmit( name, values ) }) : (
            typeof values[ name ] === 'object' ? null : ({
              [ name ]: values[ name ]
            })
          )
        )
      ).filter(( value ) => value !== null )),
      validated = Object.keys( warnings ).filter(
        ( key ) => warnings[ key ] === true
      ).length === 0
    */

    // if ( validated ) {
      if ( typeof action === 'function' ) {
        if ( type !== 'search' && type !== 'warning' ) {
          dispatch( action( content ))
        }
        else {
          action( e )
        }
      }
      handleClose()
    // }
  }

  function handleWarning () {    
    setOpen( false )
    if ( 'warning' in actions ) {
      if ( typeof actions.warning === 'function' ) {
        actions.warning()
      }
    }
  }

  function renderButtonCancel () {
    if ( type === 'warning' ) {
      return (
        <Button onClick={ handleCancel } color='error' variant='contained' title='CANCEL'>CANCEL</Button>
      )
    }
  }

  function renderButtonClose () {
    return (
      <IconButton aria-label='close' onClick={ handleCancel } variant='contained'>
        <Close />
      </IconButton>
    )
  }

  function renderButtonCreate () {
    if ( type === 'create'  ) {
      return (
        <Button color='primary' onClick={ handleSubmit } startIcon={ <Save /> } variant='contained' title='CREATE' type='submit'>CREATE</Button>
      )
    }
  }
  

  function renderButtonRemove () {
    if ( type === 'update' ) {
      return (
        <Button onClick={ handleDelete } color='error' endIcon={ <Delete /> } variant='contained' title='CANCEL'>CANCEL</Button>
      )
    }
  }

  function renderButtonReset () {
    if (type === 'search') {
      return (
        <Button onClick={ handleReset } color='error' endIcon={ <Delete /> } variant='contained' title='RESET'>RESET</Button>
      )
    }
  }

  function renderButtonSearch () {
    if ( type === 'search' ) {
      return (
        <Button onClick={ handleSubmit } color='primary'  startIcon={ <Edit /> } variant='contained' title='SEARCH' type='submit'>SEARCH</Button>
      )
    }
  }

  function renderButtonUpdate () {
    if ( type === 'update' ) {
      return (
        <Button onClick={ handleSubmit } color='primary'  startIcon={ <Edit /> } variant='contained' title='UPDATE' type='submit'>UPDATE</Button>
      )
    }
  }

  function renderButtonValidate () {
    if ( type === 'warning' ) {
      return (
        <Button color='primary' onClick={ handleWarning } variant='contained' title='OK'>OK</Button>
      )
    }
  }

  return (
    <div>
      <Dialog
        aria-describedby='alert-dialog-slide-description'
        disableEscapeKeyDown={ type === 'warning' }        
        keepMounted
        maxWidth={ rest.maxWidth || 'md' }
        onClose={ handleClose }
        open={ open }
        scroll='paper'
        TransitionComponent={ Transition }
        { ...rest }
      >
        <DialogTitle>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            { title }
            { renderButtonClose() }
          </Box>
        </DialogTitle>
        <DialogContent>
          <children.type data={ data } { ...children.props }/>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          { renderButtonCancel() }
          { renderButtonCreate() }
          { renderButtonRemove() }
          { renderButtonReset() }
          { renderButtonSearch() }
          { renderButtonUpdate() }
          { renderButtonValidate() }
        </DialogActions>
      </Dialog>
    </div>
  );
}