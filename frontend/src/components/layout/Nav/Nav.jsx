import React, { useEffect } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserOptions from '../Nav/UserOptions';

const Nav = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    const handleBarClick = () => {
      nav.classList.add('active');
    };
    const handleCloseClick = () => {
      nav.classList.remove('active');
    };
    if (bar) {
      bar.addEventListener('click', handleBarClick);
    }
    if (close) {
      close.addEventListener('click', handleCloseClick);
    }
    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      if (bar) {
        bar.removeEventListener('click', handleBarClick);
      }
      if (close) {
        close.removeEventListener('click', handleCloseClick);
      }
    };
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div className='header'>
      <div className='brand lg'>ShopKart</div>
      <div>
        <ul id='navbar'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Products</NavLink>
          </li>
          {isAuthenticated || <li><NavLink to='/login'>Login</NavLink></li>}
          <li><NavLink to='/cart'>Cart</NavLink></li>
          <li id='lg-bag'>
            {isAuthenticated && <UserOptions user={user} />}
          </li>
          <NavLink href='#' id='close'>
            <i className='far fa-times'></i>
          </NavLink>
        </ul>
      </div>
      <div id='mobile'>
        <i id='bar' className='fas fa-outdent '></i>
        {isAuthenticated && <UserOptions user={user} />}
      </div>
    </div>
  );
};

export default Nav;
