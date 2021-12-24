import React from 'react';

import './app.css';
import Header from './components/header';

export default function App () {
  const { pathname } = window.location
  return (
    <div className='App'>
      { !pathname.includes('editor') ? <Header /> : '' }
    </div>
  )
}
