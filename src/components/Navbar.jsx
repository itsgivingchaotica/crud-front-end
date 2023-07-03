import React from 'react';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import ScholarLogo from './ScholarLogo';
import SideMenuToggle from './SideMenuToggle'
import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import SideNavlinks from './SideNavlinks';

const Navbar = () => {
  const isMobileScreen = useMediaQuery("(maxWidth: 414px)");
  const isSmallScreen = useMediaQuery("(maxWidth: 700px")
  
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
              {isSmallScreen ? (<SideMenuToggle/>) : (<SideNavlinks/>)}
              </div>
          </>
      </div>
      {isMobileScreen ? (<div style={{transform:'translateY(-22px)', opacity: '!important'}}><SearchBar /></div>) : (<SearchBar/>)}
    </div>
  );
};

export default Navbar;