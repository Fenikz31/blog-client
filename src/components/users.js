import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { TheList, EditButton, MyDeleteOutline } from '../styles/styles';

import { get_users } from '../redux/actions/users';

export default function Users () {  
  const dispatch = useDispatch(),
        { loading, rows } = useSelector(({ users })=> users ),
        action = useSelector(({ action })=> action.type ),
        [ columns, setColumns ] = useState([])

  const [ data, setData ] = useState( rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest }))),
        handleDelete = ( id ) => setData( data.filter(( item ) => item._id !== id ))

  function handleColumns () {
    const row =  data [0],
          fields = Object.keys( row ).filter(( field ) => [ '__v', 'articles', 'avatar', 'chatList', 'city', 'country', 'followers', 'following', 'images', 'notifications', 'password', 'posts' ].indexOf( field ) === -1),
          columns = fields.map(( field ) => ({
            field,
            headerName:  `${ field.charAt( 0 ).toUpperCase() }${ field.slice( 1 ) }`
          }))

    columns.push({
        field: 'action',
        headerName: 'Action',
        width: 100,
        renderCell: ( params ) => {
          return (
            <>
              <Link to={ `/users/${ params.row.id }` }>
                <EditButton primary>Edit</EditButton>
              </Link>
              <MyDeleteOutline
                onClick={() => handleDelete( params.row.id )}
              />
            </>
          );
        },
      })
    setColumns( columns )
  }

  useEffect(() => {
    dispatch( get_users())
  }, [ dispatch ])

  useEffect(() => {
    if ( data.length === 0 && !loading ) {
      setData( rows.map(({ _id: id, ...rest }) => ({ id, ...rest })))
    }
  }, [ rows ])

  useEffect(() => {
    if ( data.length !== 0 & columns.length === 0 ) {
      handleColumns()
    }
  }, [ data ])

  return (
    <>
    {
      loading || columns.length === 0 ? 'Loading ...' :
      <TheList style={{ padding: 8 }}>
        <DataGrid
          rows={ data }
          rowsPerPageOptions={[ 10, 25, 50, 100 ]}
          disableSelectionOnClick
          columns={ columns }
          pageSize={ 10 }
          checkboxSelection
        />
        <Outlet />
      </TheList>
    }
    </>
  )
}
