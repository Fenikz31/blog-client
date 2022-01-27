import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { MyDeleteOutline } from '../styles/styles';

import { get_users } from '../redux/actions/users';
import Modal from '../components/modal';
import User from './user';
import { Box } from '@mui/material';

export default function Users () {
  const dispatch = useDispatch(),
        { loading, rows } = useSelector(({ users })=> users ),
        [ columns, setColumns ] = useState([]),
        parsed = rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest })),
        [ data, setData ] = useState( parsed ),
        [ modal, setModal ] = useState({
          selected: null,
          title: null,
          type: null
        }),
        handleDelete = ( id ) => setData( data.filter(( item ) => item._id !== id ))
        
  function handleColumns () {
    const row =  data[ 0 ],
          fields = Object.keys( row ).filter(( field ) => [ '__v', 'articles', 'avatar', 'chatList', 'city', 'country', 'followers', 'following', 'images', 'notifications', 'password', 'posts' ].indexOf( field ) === -1),
          columns = fields.map(( field ) => ({
            field,
            headerName:  `${ field.charAt( 0 ).toUpperCase() }${ field.slice( 1 ) }`,
            valueGetter: ( params ) => {
              if ( field === 'created' )
                return formatDistanceToNow( parseISO( params.row[ field ]))

              if ( field === 'updated' )
                return formatDistanceToNow( parseISO( params.row[ field ]))
              
              return params.row[ field ]
            },
            width: 140
          }))

    columns.push({
        field: 'action',
        headerName: 'Action',
        width: 30,
        renderCell: ( params ) => {
          return (
            <MyDeleteOutline
              onClick={() => handleDelete( params.row.id )}
            />
          );
        },
      })

    setColumns( columns )
  }
  function handleClose () {
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
  }

  useEffect(() => {
    dispatch( get_users())
  }, [ dispatch ])

  useEffect(() => {
    if ( data.length === 0 && rows.length !== 0 ) {
      setData( parsed )
    }
  }, [ rows ])

  useEffect(() => {
    if ( data[ 0 ]?.id && data.length !== 0 && columns.length === 0 ) {
      handleColumns()
    }
  }, [ data ])


  return (
    <>
    {
      loading || columns.length === 0 ? 'Loading ...' :
      <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: '100%', p: 2, width: '100%' }}>
          <DataGrid
            rows={ data }
            onRowClick={ handleRowClick }
            rowsPerPageOptions={[ 10, 25, 50, 100 ]}
            disableSelectionOnClick
            columns={ columns }
            pageSize={ 10 }
            checkboxSelection
            components={{ Toolbar: GridToolbar }} 
          />
        { renderModal() }
      </Box>
    }
    </>
  )
}
