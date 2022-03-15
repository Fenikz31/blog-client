import React, { useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Link, matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { TabPanel } from './panel';
import Router from './Router';
import Login from '../pages/login';

function ProtectedRoutes ({ auth, children } = {}) {
  if ( auth )
    return children

  const location = useLocation()
  return <Navigate to='/login' state={{ from: location }} replace />
}

function renderLinks (  tabs ) {
  /* 
  You need to provide the routes in descendant order.
  This means that if you have nested routes like:
  users, users/new, users/edit.
  Then the order should be ['users/add', 'users/edit', 'users'].
   */
  return tabs.map(( tab, index ) => {
    
    if ( tab.label ) {
      const label = tab.label && tab.label === 'Dashboard' ? '' : `${ tab.label.toLowerCase() }`
      return (
        <Tab
          key={ index }
          label={ tab.label }
          style={{ textDecoration: 'none' }}
          to={`/${ label }` }
          component={ Link }
          { ...tabProps( index )} />
      )
    }

      return null
    })

}


function tabProps( index ) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function useRouteMatch( tabs ) {
  const { pathname } = useLocation();

  if ( tabs.length === 0 )
    return null

  return tabs.map(({ label,location }, index) => {
    const match = matchPath( location, pathname )
    console.log( 'match => ', match )
    if ( label === 'Login')
      return null

    if ( match )
      return index

    return null
  })
  .filter(( nullish ) => nullish !== null )[ 0 ]
}

export default function SideBar ({ children, isAuth } = {}) {
  const tabs = [
          '/',
          '/blog',
          '/users'
        ],
        [ value, setValue ] = useState( 0 );

  function handleChange ( event, value ) {
  setValue( value ); 
  }

  return (
    <Tabs
      orientation='vertical'
      variant='scrollable'
      value={ value }
      onChange={ handleChange }
      aria-label='Vertical tabs example'
      selectionFollowsFocus          
      sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
    >
      {/* <Tab
        label='Dashboard'
        component={ Link }
        to='/'
        /> */}
      <Tab
        label='Blog'
        component={ Link }
        to='/blog'
        />
      <Tab
        label='Users'
        component={ Link }
        to='/users'
        />
    </Tabs>
  )
}
