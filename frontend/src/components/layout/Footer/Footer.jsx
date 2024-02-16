import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='main-footer'>
    <div className='footer-links'>
      <a
        target={'_blank'} rel="noreferrer"
        href='https://twitter.com'
      ><i className='fab fa-twitter icon'></i></a>
      <a
        target={'_blank'} rel="noreferrer"
        href='https://github.com/'
       
      ><i  className='fab fa-github icon'></i></a>
      <a
        target={'_blank'} rel="noreferrer"
        href='https://www.linkedin.com/in/'
       >
        <i  className='fab fa-linkedin icon'></i>
       </a>
    </div>
    <div className='footer-text'>© No Copyright, Feel free to replicate.</div>
  </footer>
  )
}

export default Footer