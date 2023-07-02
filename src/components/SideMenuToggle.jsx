import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DiplomaBorder from '.././diploma-border.png';

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          marginTop: '-10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        paper: {
          backgroundImage: `url(${DiplomaBorder})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100px',
          height: '130px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
          fontSize: '14px',
          fontFamily: `'Manrope', sans-serif`,
          fontWeight: '700',
          textShadow: '1px 1px 1px white',
          margin: '4px 0', // Adjust the margin to make items closer together
        },
      },
    },
  },
});

const SideMenuToggle = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          id="dropdown-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontFamily: `'Manrope', sans-serif`, fontWeight: '700', textShadow: '1px 1px 2px black', '&:hover': { color: 'var(--bone)' } }}>
              Menu
            </Typography>
            <MenuIcon />
          </div>
        </Button>
        <Menu
          id="mobile-navlinks"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{transform:'translate(6px,10px)'}}
        >
          <MenuItem onClick={handleClose} sx={{transform:'translateY(3px)'}}>
            <NavLink to="/campuses">Campuses</NavLink>
          </MenuItem>
          <Divider sx={{border: '1px solid rgb(150, 124, 105, 0.4)'}}/>
          <MenuItem onClick={handleClose} sx={{transform:'translateY(-7px)'}}>
            <NavLink to="/students">Students</NavLink>
          </MenuItem>
        </Menu>
      </div>
    </ThemeProvider>
  );
};

export default SideMenuToggle;
