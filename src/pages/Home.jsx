import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchBar from '../components/SearchBar'
import { useMediaQuery } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/home.css';
import AddEntityButtonGroup from '../components/AddEntityButtonGroup';

const Home = () => {
  const isMediumScreen = useMediaQuery('(max-width: 900px)');

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
      {isMediumScreen ? (
        <div className="home">
          <div style={{ color: 'white', transform: 'translateY(100px)', backgroundColor:'rgba(66, 55, 52,0.5)'}}>
             <Typography variant='h6' sx={{fontFamily: `'Manrope', sans-serif`, fontWeight:'700', textShadow: '-1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black', marginTop:'30px', marginLeft:'10px', }}>
                  <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}><Typography variant='h2'sx={{fontFamily:`'Tangerine', cursive`, textShadow: '1px 1px 1px var(--dark-green)', color:'var(--celadon-2)'}}>Faster</Typography>
                  <Typography variant='subtitle1' sx={{transform:'translateY(5px)',marginLeft:'10px', marginRight:'10px', textShadow: '-1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black'}}> and more 
                  </Typography>
                  <Typography variant='h2'sx={{fontFamily:`'Tangerine', cursive`, textShadow: '1px 1px 1px var(--dark-green)', color:'var(--celadon-2)'}}>
                  Effective.
                  </Typography>
                  </div>
                </Typography>
                <div style={{justifyContent:'center'}}>
                 <Typography variant='h6' sx={{fontFamily: `'Manrope', sans-serif`, fontWeight:'700',color:'white', paddingBottom:'20px', textShadow:'3px 3px 3px black'}}>Upload New Entry:</Typography>
            <AddEntityButtonGroup />
             <Typography variant="subtitle1" sx={{fontFamily: `'Manrope', sans-serif`, fontWeight: '700', textShadow: '1px 1px 1px black'}}>
                  With seamless integration and streamlined workflows, ScholarCentral empowers you to efficiently
                  organize and access essential data.
                </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div className="home" style={{display:'flex', justifyContent:'center'}}>
          <Grid container sx={{maxHeight:'50vh', marginLeft:'80px'}}>
            <Grid item xs={6} md={7} style={{ display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{ color: 'white', transform: 'translateY(200px)', padding:'20px',backgroundColor:'rgb(66, 55, 52,0.9)'}}>
                <Typography variant='h3' sx={{fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight:'700', textShadow: '-1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black, -1px 1px 0 black'}}>
                  Experience software designed to make your academic operations 
                  <div style={{display: 'flex', justifyContent:'center'}}><Typography variant='h1'sx={{fontFamily:`'Tangerine', cursive`, color:'var(--celadon-2)'}}>faster</Typography>
                  <Typography variant='h4' sx={{transform:'translateY(46px)',marginLeft:'25px', marginRight:'25px'}}> and more 
                  </Typography>
                  <Typography variant='h1'sx={{fontFamily:`'Tangerine', cursive`, color:'var(--celadon-2)'}}>
                  effective.
                  </Typography>
                  </div>
                </Typography>
                <Typography variant="h5" sx={{fontFamily: `'Manrope', sans-serif`, textShadow:'3px 3px 3px black'}}>
                  With seamless integration and streamlined workflows, ScholarCentral empowers you to efficiently
                  organize and access essential data.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={5} style={{transform:'translateY(33vh)', paddingTop:'20px'}}>
            <Typography variant='h4' sx={{fontFamily: `'Manrope', sans-serif`, fontWeight:'700',color:'white', paddingBottom:'20px', textShadow:'3px 3px 3px black'}}>Upload New Entry:</Typography>
              <AddEntityButtonGroup />
            </Grid>
          </Grid>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Home;
