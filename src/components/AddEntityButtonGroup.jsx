import React from 'react';
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
          maxWidth: '77%',
          backgroundColor: 'rgb(127, 47, 42, 0.96)',
          '&:hover': {
            backgroundColor: 'rgb(45, 106, 79, 0.96)',
          },
        },
      },
    },
  },
});

const AddEntityButtonGroup = () => {
  const isSmallScreen = useMediaQuery('(max-width:700px)');
  const isMobileScreen = useMediaQuery('(max-width:414px)');

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: isSmallScreen ? 'center' : undefined }}>
        <div style={{ maxWidth: isSmallScreen ? '80%' : '40%' }}>
          <Button variant='contained'>
            <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center' }}>
              <Typography variant={isMobileScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '700', textShadow: '3px 1px 2px black' }}>
                New Campus
              </Typography>
              <img
                width="80"
                height="80"
                style={{ ...(isSmallScreen && { marginTop: '10px' }) }}
                src="https://img.icons8.com/bubbles/80/library.png"
                alt="library"
              />
            </div>
          </Button>
          <Button variant='contained' className={isSmallScreen ? 'button-content' : ''}>
            <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center'}}>
              <Typography variant={isMobileScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '700', textShadow: '3px 1px 2px black'}}>
                New Student
              </Typography>
              <img
                width="80"
                height="80"
                style={{ ...(isSmallScreen && { marginTop: '10px' }) }}
                src="https://img.icons8.com/bubbles/80/graduation-cap.png"
                alt="graduation-cap"
              />
            </div>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddEntityButtonGroup;
