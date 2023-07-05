import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions';
import {  fetchAllStudentsThunk, deleteBatchStudentThunk, clearBatchStudents } from '../../redux/students/student.actions';
import { useMediaQuery, createTheme, ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import StudentInputForm from '../../components/StudentInputForm';
import BatchStudentCard from '../../components/BatchStudentCard'
import "../../styles/addStudentForm.css"

const AddStudent = () => {

    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& label': {
                  color: 'black',
                },
                '& label.Mui-focused': {
                  color: 'black',
                },
                // '& .MuiInput-underline:after': {
                //   borderBottomColor: '#3E68A8',
                // },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                    boxShadow: '2px 2px 2px black',
                  },
                  '&:hover fieldset': {
                    // borderColor: 'var(--burnt-umber)',
                    borderWidth: '0.15rem',
                  },
                  '&.Mui-focused fieldset': {
                    // borderColor: 'green',
                  },
                },
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                textTransform: 'initial',
                fontSize: '0.7rem',
                backgroundColor: "none",
                color: "black",

              },
            },
          },
        },
      });

      const dispatch = useDispatch();
      const isMediumScreen = useMediaQuery('(max-width: 900px)');

     const fetchAllStudents = () => {
    return dispatch(fetchAllStudentsThunk());
  };

  const handleDeleteStudent = (studentId) => {
    try {
      dispatch(deleteBatchStudentThunk(studentId));
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  useEffect(() => {
    dispatch(clearBatchStudents());
  },[dispatch])

  const studentBatch = useSelector((state) => state.students.batchStudentList);

    const fetchAllCampuses = () => {
        return dispatch(fetchAllCampusesThunk());
    }
    useEffect(()=>{
        fetchAllCampuses();
    }, [])
    
  return (
    <ThemeProvider theme={theme}>
     <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{justifyContent: "flex-start", paddingTop: '80px', paddingLeft:'15px' }}>
      <Grid item xs={12} md={6}>
        <StudentInputForm/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} sx={{overflow:'auto', marginTop: isMediumScreen ? '100px' : '20px', padding:'5px'}}>
        {/* LIST THE BATCH OF STUDENTS IN STACK FASHION */}
          {studentBatch.map((entry, index) => (
          <Grid item xs={12} key={index}>
              <BatchStudentCard entry={entry} handleDeleteStudent={handleDeleteStudent}/>
            </Grid>
          )).reverse()}
        </Grid>
      </Grid>
    </Grid>
    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default AddStudent