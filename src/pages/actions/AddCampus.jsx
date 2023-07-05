import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { deleteBatchCampusThunk, fetchAllCampusesThunk, clearBatchCampuses } from '../../redux/campuses/campus.actions'
import StudentInputForm from '../../components/StudentInputForm'
import BatchCampusCard from '../../components/BatchCampusCard'
import "../../styles/addCampusForm.css"

const AddCampus = () => {

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

    const campusBatch = useSelector((state) => state.campuses.batchCampusList);

    const dispatch = useDispatch();
    const navigate = useNavigate();

     const fetchAllCampuses = () => {
    return dispatch(fetchAllCampusesThunk());
  };


     const handleDeleteCampus = (campusId) => {
    try {
      dispatch(deleteBatchCampusThunk(campusId));
      dispatch(fetchAllCampusesThunk());
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };

   useEffect(() => {
    fetchAllCampuses();
  }, []);

  useEffect(() => {
    dispatch(clearBatchCampuses());
  },[dispatch])


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
      <div className = "grid" styles={{backgroundColor:'red'}}>
     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{justifyContent: "flex-start", paddingTop: '80px', paddingLeft:'15px' }}>
      <Grid item xs={12} md={6}>
        <StudentInputForm/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} >
        {/* LIST THE BATCH OF CAMPUSES IN STACK FASHION */}
          {campusBatch.map((entry, index) => (
          <Grid item xs={6} key={index}>
               <BatchCampusCard entry={entry} handleDeleteCampus={handleDeleteCampus}/>
            </Grid>
          )).reverse()}
        </Grid>
      </Grid>
    </Grid>
    </div>




    






    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default AddCampus