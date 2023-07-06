import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchAllStudentsThunk } from '../../redux/students/student.actions';
import { StudentListItems } from '../../components';
import StudentDrawer from '../../components/StudentDrawer';
import '../../styles/students.css';

const Students = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 414px)');

  const allStudents = useSelector((state) => state.students.studentList);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [location]);

  const fetchAllStudents = () => {
    return dispatch(fetchAllStudentsThunk());
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
      <div style={{ marginTop: '120px', minHeight: '550vh', width: '100%', backgroundColor: 'var(--off-white)' }}>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center', paddingTop: '10px', paddingLeft: '15px', height: '100vh', width: '100%', textShadow: '1px 1px 1px black', color: 'var(--garnet)'}}>
          <Typography variant={isMobileScreen ? 'h3' : 'h1'} sx={{ fontFamily: `'Tangerine', sans-serif`, fontWeight: '700', marginTop: '30px', marginLeft: '20px', border:'3px solid white', width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
            Student Profiles
          </Typography>
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center', marginTop: '-20px' }}>
            <NavLink to="/students/addStudent" style={{ textDecoration: 'none' }}>
              <Button style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                <Typography variant={isMobileScreen ? 'subtitle2' : 'h5'} sx={{ fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight: '700', '&:hover': { cursor: 'pointer', textShadow: '1px 1px 1px var(--dark-green)' } }}>
                  Quick Add
                </Typography>
                {isMobileScreen ? <img width="50" height="50" src="https://img.icons8.com/bubbles/50/plus.png" alt="plus" /> : <img width="100" height="100" src="https://img.icons8.com/bubbles/100/plus.png" alt="plus" />}
              </Button>
            </NavLink>
            <StudentDrawer />
          </Grid>

          <Grid item xs={12} md={12}>
            {allStudents.length > 0 ? <StudentListItems allStudents={allStudents} /> : <h1>No students in our list!Add some!</h1>}
          </Grid>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};

export default Students;