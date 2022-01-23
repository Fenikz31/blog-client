import React, { Children, forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Delete, Edit, Save } from '@material-ui/icons';

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
  Component,
  data = null,
  id = null,
  title = null,
  type = 'search'
} = {}) {
  const [ open, setOpen ] = useState( true )

  console.log( 'data => ', data )
  console.log( 'title => ', title )
  console.log( 'type => ', type )

  function handleClose () {
    setOpen( false )
    if ( 'close' in actions ) {
      if ( typeof actions.close === 'function' ) {
        actions.close()
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
        if ( type !== 'search' ) {
          dispatch( action( content ))
        }
        else {
          action( content )
        }
      }
      handleClose()
    // }
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
        <Button onClick={ handleDelete } color='secondary' endIcon={ <Delete /> } variant='contained' title='CANCEL'>CANCEL</Button>
      )
    }
  }

  function renderButtonReset () {
    if (type === 'search') {
      return (
        <Button onClick={ handleReset } color='secondary' endIcon={ <Delete /> } variant='contained' title='RESET'>RESET</Button>
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

  return (
    <div>
      <Dialog
        open={ open }
        TransitionComponent={ Transition }
        keepMounted
        onClose={ handleClose }
        maxWidth='md'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          <children.type data={ data } { ...children.props }/>
        </DialogContent>
        <DialogActions>
          { renderButtonCreate() }
          { renderButtonRemove() }
          { renderButtonReset() }
          { renderButtonSearch() }
          { renderButtonUpdate() }
        </DialogActions>
      </Dialog>
    </div>
  );
}