import React from 'react';
import Box from '@mui/material/Box';

export function TabPanel({ children, value, index, ...rest } = {}) {
  console.log( 'children => ', children )
  console.log( 'index => ', index )
  console.log( 'value => ', value )
  return (
    <div
      role='tabpanel'
      hidden={ value !== index }
      id={ `vertical-tabpanel-${ value }` }
      aria-labelledby={ `vertical-tab-${ value }` }
      style={{ bgcolor: 'pink' , height:'100%', width: '100%', m:0, p:0}}
      { ...rest }
    >
      { value === index && ( children ) }
    </div>
  );
}
