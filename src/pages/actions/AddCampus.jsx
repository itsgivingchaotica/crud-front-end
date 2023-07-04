import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { TextField, Button, createTheme, ThemeProvider, Grid} from '@mui/material';
import { useSelector } from 'react-redux'
import CampusInputForm from '../../components/CampusInputForm';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
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

    const newEntries = useSelector((state) => state.campuses.campusList);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{justifyContent: "flex-start", paddingTop: '80px' }}>
      <Grid item xs={12} md={6}>
        <CampusInputForm/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} >
          {newEntries.map((entry, index) => (
          <Grid item xs={6} key={index}>
              {/* <lay.ContactCard contact={contact} /> */}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    </div>




    






    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default AddCampus