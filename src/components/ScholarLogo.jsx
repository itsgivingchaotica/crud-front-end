import React from 'react';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import '../styles/navbar.css'

const ScholarLogo = () => {

    const isMobileScreen = useMediaQuery("(max-width: 414px)")
  return (
   <div className="logo">
                  <div>
                    <img width={isMobileScreen ? '58' : '82'} height={isMobileScreen ? '58' : '82'}  src="https://img.icons8.com/external-justicon-flat-justicon/64/external-graduation-elearning-and-education-justicon-flat-justicon.png" alt="external-graduation-elearning-and-education-justicon-flat-justicon" style={{marginLeft:'30px'}}/>
                  </div>
                  <div className={isMobileScreen ? ("mobile-typography") : ("typography")}>
                    <Typography
                      variant={isMobileScreen ? 'h3' : 'h2'}
                      sx={{ fontFamily: `'Tangerine', cursive`, textShadow: '1px 1px 2px black' }}
                    >
                      Scholar
                    </Typography>
                    <Typography
                      variant={isMobileScreen ? 'h5' : 'h4'}
                      sx={{ marginLeft: '20px', fontFamily: `'Manrope', sans-serif`, transform: 'translate(13px,-20px)', fontWeight: '700', textShadow: '1px 1px 2px black', '&:hover': { color: 'var(--bone)' } }}
                    >
                      CENTRAL
                    </Typography>
                  </div>
                </div>
  );
};

export default ScholarLogo;