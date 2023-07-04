import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

const SideNavlinks = () => {
  return (
    <div className='side-navlinks'>
        <NavLink to="/campuses" className="navlink">CAMPUSES</NavLink>
        <NavLink to="/students" className="navlink">STUDENTS</NavLink>
    </div>
  )
}

export default SideNavlinks