import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import SideBar from './components/side';
import User from './components/user';
import Users from './components/users';
import Home from './containers/home';

import './app.css';

export default function App () {
  return (
    <Router>
      <div className='App'>
        < Navbar/>
        <div className='container'>
          <SideBar />
            <Routes>
              <Route index exact path='/' element={ <Home /> } />
              <Route path='/users' element={ <Users /> } />
              <Route path='/users/:id' element={ <User /> } />
            </Routes>
        </div>
      </div>
    </Router>
  )
}
