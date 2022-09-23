import React from 'react';

export default function Header({ isAuth = '', openSignInWith = null } = {}) {
  return (
    <div className='head-flex header header-block'>
      <div className='border-bottom header-block position-relative z-500'>
        <div>header Component</div>
        <div>header Component</div>
        <div>header Component</div>
      </div>
    </div>
  )
}
