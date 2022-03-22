import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


export default function GridComponent ({
  actions = {
    select: null
  },
  columns = [],
  data = [],
  ...props
} = {}) {
  const [ filter, setFilter ] = useState({ items: []}),
        [ pageSize, setPageSize ] = useState( 10 )

  return (
    <Box sx={{ display: 'flex', height: '100%', p: 2, width: '100%' }}>
      <DataGrid
        columns={ columns }
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          baseButton: {
            color: 'inherit'
          }
        }}
        disableSelectionOnClick
        filterModel={ filter }
        onFilterModelChange={( filter ) => {
          setFilter( filter )}
        }
        onPageSizeChange={( size ) => setPageSize( size )}
        onRowClick={ actions.select }
        onSortModelChange={( sort ) => console.log( sort )}
        pageSize={ pageSize }
        rows={ data }
        rowsPerPageOptions={[ 10, 25, 50, 100 ]}
        sx={{
          bgcolor: 'background.main',
          '& .MuiDataGrid-booleanCell[data-value="false"]': {
            color: 'red'
          },
          '& .MuiDataGrid-booleanCell[data-value="true"]': {
            color: 'green'
          },
        }}
        { ...props }
      />
    </Box>
  )
}
