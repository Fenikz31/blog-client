import renderCellExpand from '../src/components/gridCellExpand';

export default {
  blog: {
    columns: [
      {
          field: 'created',
          headerName: 'Created',
          type: 'dateTime',
          flex: 1 / 8,
          sortable: true,
          valueGetter: ({ value }) => value
            ? new Date( value )
            : value 
      },
      {
          field: 'updated',
          headerName: 'Updated',
          type: 'dateTime',
          flex: 1 / 8,
          sortable: true,
          valueGetter: ({ value }) => value
            ?  new Date( value )
            : value 
      },
      {
          field: 'title',
          headerName: 'Title',
          type: 'string',
          flex: 1 / 8,
          sortable: true
      },
      {
          field: 'description',
          headerName: 'Description',
          type: 'string',
          flex: 1 / 8,
          sortable: true,
          renderCell: renderCellExpand
      },
      {
          field: 'published',
          headerName: 'Published',
          type: 'boolean',
          flex: 1 / 8,
          sortable: true
      },
      {
          field: 'tags',
          headerName: 'Tags',
          type: 'string',
          flex: 1 / 8,
          sortable: false
      },
      {
          field: 'author',
          headerName: 'Author',
          type: 'string',
          flex: 1 / 8,
          sortable: true,
          valueGetter: ({ value }) => value.username
      }
    ]
  },

  users: {
    columns: [
      {
          field: 'id',
          headerName: 'Id',
          minWidth: 100,
          flex: 0.125,
          renderCell: renderCellExpand
      },
      {
          field: 'created',
          headerName: 'Created',
          minWidth: 100,
          flex: 0.125,
          type: 'dateTime',
          valueGetter: ({ value }) => value
            ? new Date( value )
            : value 
      },
      {
          field: 'updated',
          headerName: 'Updated',
          minWidth: 100,
          flex: 0.125,
          type: 'dateTime',
          valueGetter: ({ value }) => value
            ? new Date( value )
            : value 
      },
      {
          field: 'lastname',
          headerName: 'Lastname',
          minWidth: 100,
          flex: 0.125
      },
      {
          field: 'firstname',
          headerName: 'Firstname',
          minWidth: 100,
          flex: 0.125
      },
      {
          field: 'username',
          headerName: 'Username',
          minWidth: 100,
          flex: 0.125
      },
      {
          field: 'email',
          headerName: 'Email',
          minWidth: 100,
          flex: 0.125
      },
      {
          field: 'role',
          headerName: 'Role',
          minWidth: 100,
          flex: 0.125
      }
    ]
  }
}
