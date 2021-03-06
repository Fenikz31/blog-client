import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Blog from '../pages/blog';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import SignUp from '../pages/signup';
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
      <Route path='/blog' element={
        <ProtectedRoutes auth={ isAuth } >
          <Blog key={ 1 } />
        </ProtectedRoutes>
      } />
      <Route path='/users' element={
        <ProtectedRoutes auth={ isAuth } >
          <Users key={ 2 } />
        </ProtectedRoutes>
      } />
      <Route path='/signup' element={ <SignUp /> } />
      <Route path='/login' element={ <Login /> } />
    </Routes>
  )
}
