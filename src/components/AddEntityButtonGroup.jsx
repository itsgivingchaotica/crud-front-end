import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import '../styles/home.css';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '15px',
          boxShadow: '2px 2px 3px black',
          width: '70%',
          backgroundColor: 'rgb(127, 47, 42, 0.96)',
          '&:hover': {
            backgroundColor: 'rgb(45, 106, 79, 0.96)',
          },
          textTransform: 'none',
        },
      },
    },
  },
});

const AddEntityButtonGroup = () => {

  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  // Separated code for isSmallScreen
  const renderIsSmallScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '50%' }}>
        {/* ADD NEW CAMPUS */}
        <Button variant='contained' style={{ flex: 1}}>
        <NavLink to='/campuses/addCampus' style={{textDecoration: 'none'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '470', textShadow: '3px 1px 2px black', fontFamily: `'Jost', sans-serif` }}>
              Campus
            </Typography>
            <img
              width="80"
              height="80"
              style={{ marginTop: '10px' }}
              src="https://img.icons8.com/bubbles/80/library.png"
              alt="library"
            />
          </div>
          </NavLink>
        </Button>
        {/* ADD NEW STUDENT */}
        <Button variant='contained' className='button-content' style={{ flex: 1 }}>
        <NavLink to='/students/addStudent' style={{textDecoration: 'none'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '450', textShadow: '3px 1px 2px black', fontFamily: `'Jost', sans-serif`}}>
              Student
            </Typography>
            <img
              width="80"
              height="80"
              style={{ marginTop: '10px' }}
              src="https://img.icons8.com/bubbles/80/graduation-cap.png"
              alt="graduation-cap"
            />
          </div>
          </NavLink>
        </Button>
      </div>
    </div>
  );

  // Code for other screen sizes
  const renderDefaultScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '70%' }}>
        {/* ADD NEW CAMPUS */}
        <Button variant='contained'>
         <NavLink to='/campuses/addCampus' style={{textDecoration: 'none'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '470', textShadow: '3px 1px 2px black', fontFamily: `'Jost', sans-serif`, marginRight: '20px' }}>
              Campus
            </Typography>
            <img
              width="80"
              height="80"
              src="https://img.icons8.com/bubbles/80/library.png"
              alt="library"
            />
          </div>
          </NavLink>
        </Button>
        {/* ADD NEW STUDENT */}
        <Button variant='contained'>
        <NavLink to='/students/addStudent' style={{textDecoration: 'none'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '450', textShadow: '3px 1px 2px black', fontFamily: `'Jost', sans-serif`, marginRight: '20px' }}>
              Student
            </Typography>
            <img
              width="80"
              height="80"
              src="https://img.icons8.com/bubbles/80/graduation-cap.png"
              alt="graduation-cap"
            />
          </div>
          </NavLink>
        </Button>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      {isSmallScreen ? renderIsSmallScreen() : renderDefaultScreen()}
    </ThemeProvider>
  );
};

export default AddEntityButtonGroup;
