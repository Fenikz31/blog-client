import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Users from '../pages/users';

function ProtectedRoutes ({ auth, children } = {}) {
  if ( auth )
    return children

  const location = useLocation()
  return <Navigate to='/login' state={{ from: location }} replace />
}

export default function Router ({ children, tabs, ...rest } = {}) {
  const { auth }  = useSelector(( state ) => state ),
        { isAuth } = auth;

  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoutes auth={ isAuth } >
          <Dashboard key={ 0 }/>
        </ProtectedRoutes>
      } />
      <Route path='/users' element={
        <ProtectedRoutes auth={ isAuth } >
          <Users key={ 1 } />
        </ProtectedRoutes>
      } />
      <Route path='/login' element={ <Login /> } />
    </Routes>
  )
}
