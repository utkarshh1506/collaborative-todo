import React from 'react'
import './NavBar.css'

const NavBar = ({onLoginClick, onRegisterClick}) => {
  return (
    <div className='navbar'>
        <div className="logo-side">
            <h1>TaskFlow</h1>
        </div>
        <div className="button-side">
            <a 
              href="#"
              onClick={(e)=>{
                e.preventDefault(); 
                onLoginClick();
              }}>
                Login
            </a>
            <a 
              href="#"
              onClick={(e)=>{
                e.preventDefault()
                onRegisterClick(true)
              }}>Register</a>
        </div>
    </div>
  )
}

export default NavBar