import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions'
import { CampusListItems } from '../../components'
import CampusDrawer from '../../components/CampusDrawer'
import CampusPagination from '../../components/CampusPagination'

const Campuses = () => {
  const dispatch = useDispatch();
   const isMobileScreen = useMediaQuery('(max-width: 414px)');
  //campus slice acts as the campus profile content for default and all sorted data
   const campusSlice = useSelector((state) => state.campuses.campusSliceList)
  //  const campusSorted = useSelector((state) => state.campuses.campusSortedList)
  const topRef = useRef(null)
   //keep track of how many items are being put in view based, paginating based on screen size
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: isMobileScreen ? 3 : 9,
  });
   //default list
  const fetchAllCampuses = () => {
    return dispatch(fetchAllCampusesThunk());
  }

  useEffect(() => {
    fetchAllCampuses();
    //when change in pagination and dispatching of thunk occurs, scroll to top of page
    const scrollToTop = () => {
      topRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
    };
    scrollToTop();
  }, [dispatch,pagination]);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
      <div ref={topRef} style={{ marginTop: '120px', minHeight: '340vh', width: '100%', backgroundColor: 'var(--off-white)', position:'relative' }}>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center', paddingTop: '10px', paddingLeft: '15px', height: '100vh', width: '100%', textShadow: '1px 1px 1px black', color: 'var(--garnet)'}}>
          <Typography variant={isMobileScreen ? 'h3' : 'h1'} sx={{ fontFamily: `'Tangerine', sans-serif`, fontWeight: '700', marginTop: '130px', marginLeft: '20px', border:'3px solid white', width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
            Campus Profiles
          </Typography>
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center', marginTop: '-20px' }}>
            <NavLink to="/campuses/addCampus" style={{ textDecoration: 'none' }}>
              <Button style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                <Typography variant={isMobileScreen ? 'subtitle2' : 'h5'} sx={{ fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight: '700', '&:hover': { cursor: 'pointer', textShadow: '1px 1px 1px var(--dark-green)' } }}>
                  Quick Add
                </Typography>
                {isMobileScreen ? <img width="50" height="50" src="https://img.icons8.com/bubbles/50/plus.png" alt="plus" /> : <img width="100" height="100" src="https://img.icons8.com/bubbles/100/plus.png" alt="plus" />}
              </Button>
            </NavLink>
            <CampusDrawer pagination={pagination}/>
          </Grid>

          <Grid item xs={12} md={12} sx={{marginBottom:'20px'}}>
            {campusSlice.length > 0 ? <CampusListItems allCampuses={campusSlice} pagination={pagination}/> : <Typography variant='h2' sx={{fontFamily:`'Ysabeau Infant', sans-serif`}}>No campuses in our list! Add some!</Typography>}
          </Grid>
        </Grid>
        <div style={{backgroundColor:'var(--bone)', position:'fixed', bottom:0, left:0, width: '100%'}}>
          <CampusPagination pagination={pagination} setPagination={setPagination} pageSize={isMobileScreen ? 3 : 9}/>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Campuses