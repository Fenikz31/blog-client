import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { MyDeleteOutline } from '../styles/styles';

import { get_users } from '../redux/actions/users';
import Modal from '../components/modal';
import User from './user';
import { Box } from '@mui/material';
import { fr } from 'date-fns/locale';
import GridComponent from '../components/grid';

import { default as grid } from '../../config/grid';

export default function Users () {
  const dispatch = useDispatch(),
        { loading, rows } = useSelector(({ users })=> users ),
        parsed = rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest })),
        [ data, setData ] = useState( parsed ),
        [ modal, setModal ] = useState({
          selected: null,
          title: null,
          type: null
        }),
        { columns } = grid.users

  /* function handleClose () {
    setModal({
      selected: null,
      title: null,
      type: null
    })
  }

  function handleCreate () {
    setModal({
      selected: null,
      title: 'Create',
      type: 'create'
    })
  }

  function handleEdit ( e, { id, ...rest } ) {
    setModal({
      selected: id,
      title: 'Edit',
      type: 'update',
      rest
    })
  }

  function handleRowClick ( params, event ) {
    handleEdit( event, params.row )
  }

  function handleSearch () {
    setModal({
      selected: null,
      title: 'Search',
      type: 'search'
    })
  }

  function renderModal () {
    const { selected, title, type, rest } = modal
    
    if (type !== null) {
      return (
        <Modal actions={{ close: handleClose }}
          data={ rest }
          id={ selected }
          title={ title }
          type={ type }>
            <User />
        </Modal>
      )
    }
  } */

  useEffect(() => {
    dispatch( get_users())
  }, [ dispatch ])

  useEffect(() => {
    if ( data.length === 0 && rows.length !== 0 ) {
      setData( parsed )
    }
  }, [ rows ])

  useEffect(() => {}, [ data ])
  return (
    <Box sx={{ display: 'flex', height: '100%', p: 2, width: '100%' }}>
      <GridComponent
        columns={ columns }
        data={ data }
      />
    </Box>
  )
}
