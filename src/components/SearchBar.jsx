import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

//modification of the following code: https://codesandbox.io/s/7lrrw6?file=/demo.tsx:0-1166
const SearchBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 700px")

  const searchStyle = {
  position: 'relative',
  borderRadius: '16px',
  color: 'black',
  backgroundColor: 'white', 
  marginLeft: isSmallScreen ? '-10%' : '20%',
  width: isSmallScreen ? '100%' : '60%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
};

  const searchIconWrapperStyle = {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Box sx={{ flexGrow: 1, transform:'translateY(110px)' }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:'var(--bone)'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <div style={searchStyle}>
            <div style={searchIconWrapperStyle}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar