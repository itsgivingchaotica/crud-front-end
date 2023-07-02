import React from 'react';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import ScholarLogo from './ScholarLogo';
import SideMenuToggle from './SideMenuToggle'
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import SideNavlinks from './SideNavlinks';

const Navbar = () => {
  const isMobileScreen = useMediaQuery("(max-width: 414px)");
  
  return (
    <div id="navbar-container">
      <div id="navbar">
          <>
            <div className="home-navlink">
              <NavLink to="/">
                <ScholarLogo />
              </NavLink>
            </div>
              <div >
              {isMobileScreen ? (<SideMenuToggle/>) : (<SideNavlinks/>)}
              </div>
          </>
      </div>
    </div>
  );
};

export default Navbar;