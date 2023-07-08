import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchAllStudentsThunk, fetchStudentSliceThunk } from '../../redux/students/student.actions';
import { StudentListItems } from '../../components';
import StudentDrawer from '../../components/StudentDrawer';
import StudentPagination from '../../components/StudentPagination'

const Students = () => {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery('(max-width: 414px)');
  //student slice acts as the campus profile content for default and all sorted data
  const studentSlice = useSelector((state) => state.students.studentSliceList)
  //  const studentSorted = useSelector((state) => state.students.studentSortedList)
  //top of container ref
  const topRef = useRef(null)
  //keep track of how many items are being put in view based, paginating based on screen size
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: isMobileScreen ? 3 : 9,
  });
  //default list
  const fetchAllStudents = () => {
    return dispatch(fetchAllStudentsThunk());
  };

  
  useEffect(() => {
    fetchAllStudents();
    dispatch(fetchStudentSliceThunk(pagination.from,pagination.to))
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
      <div ref={topRef} style={{ marginTop: '120px', minHeight: '380vh', width: '100%', backgroundColor: 'var(--off-white)' }}>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center', paddingTop: '10px', paddingLeft: '15px', height: '100vh', width: '100%', textShadow: '1px 1px 1px black', color: 'var(--garnet)'}}>
          <Typography variant={isMobileScreen ? 'h3' : 'h1'} sx={{ fontFamily: `'Tangerine', sans-serif`, fontWeight: '700', marginTop: '130px', marginLeft: '20px', border:'3px solid white', width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
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
            <StudentDrawer pagination={pagination}/>
          </Grid>

          <Grid item xs={12} md={12} sx={{marginBottom:'20px'}}>
            {studentSlice.length > 0 ? <StudentListItems allStudents={studentSlice} pagination={pagination}/> : <Typography variant='h2' sx={{fontFamily:`'Ysabeau Infant', sans-serif`}}>No students in our list!Add some!</Typography>}
          </Grid>
        </Grid>
        <div style={{backgroundColor:'var(--bone)', position:'absolute', bottom:0, left:0, width: '100%'}}>
          <StudentPagination pagination={pagination} setPagination={setPagination} pageSize={isMobileScreen ? 3 : 9}/>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Students;