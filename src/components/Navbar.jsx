import React from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div id="navbar-container">
      <div id="navbar">
        <div className="home-navlink">
          <NavLink to="/">
            <div className="logo">
              <div>
                <img width="82" height="82" src="https://img.icons8.com/external-justicon-flat-justicon/64/external-graduation-elearning-and-education-justicon-flat-justicon.png" alt="external-graduation-elearning-and-education-justicon-flat-justicon"/>
                </div>
                <div className="typography">
                <Typography
                  variant="h2"
                  sx={{ fontFamily: `'Tangerine', cursive`, textShadow: '1px 1px 2px black' }}
                >
                  Scholar
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ marginLeft: '20px', fontFamily: `'Manrope', sans-serif`, transform: 'translate(13px,-20px)', fontWeight: '700', textShadow: '1px 1px 2px black',  
                '&:hover': { color: 'var(--mint)'},}}
                >
                  CENTRAL
                </Typography>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="side-navlinks">
          <NavLink to="/campuses" className="navlink">Campuses</NavLink>
          <NavLink to="/students" className="navlink">Students</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
