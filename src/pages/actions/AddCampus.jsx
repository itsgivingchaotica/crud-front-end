import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux'
import { addCampusThunk } from '../../redux/campuses/campus.actions';
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem, FormControl, Button, Grid, createTheme, ThemeProvider} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
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

    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeSchoolName = (event) => {
        setName(event.target.value);
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCampus = {
            "name": name,
            "imageUrl": imageUrl,
            "address": address,
            "description":description,
        }
        if (name && address && description){
          dispatch(addCampusThunk(newCampus))
          setName("");
          setAddress("");
          setDescription("");
          navigateToAllCampuses();
        }
        else {
          setErrorMessage(true);
          setFailedSubmit(true);
        }

    }

    const navigateToAllCampuses = () => {
      navigate("/campuses");
    }


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
     <div className="add-campus-page" style={{marginTop:"120px"}}>
        <h1 id="header-add-campus">Add new campus</h1>
        <form onSubmit={handleSubmit} style={{maxHeight: '100vh'}}>
          <div className="input-container-add-campus">
            <TextField id="form-input-add-campus" type="text" label="Name *" placeholder="Campus Name" 
            variant="outlined" name="name" value={name} onChange={handleChangeSchoolName}
              error={failedSubmit && !name} helperText={failedSubmit && !name? "Required" : null}
            />
          </div>
          <div className="input-container-add-campus">
            <TextField id="form-input-add-campus" type="text" label="Address *" placeholder="Address" 
            variant="outlined" name="address" value={address} onChange={handleChangeAddress}
              error={failedSubmit && !address} helperText= {failedSubmit && !address? "Required" : null}
            />
          </div> 
          <br></br>
          <div className="input-multiline-container-add-campus">
            <TextField id="form-input-multiline-add-campus" type="text" multiline rows={4} label="Description *" placeholder="Description" 
            variant="outlined" name="description" value={description} onChange={handleChangeDescription}
              error={failedSubmit && !description} helperText={failedSubmit && !description? "Required" : null}
            />
          </div>
          <div className="input-multiline-container-add-campus">
            <Button id="btn-form-add-campus" type="submit" variant="contained" endIcon={<CheckRoundedIcon/>}>Done</Button>    
          </div>
        </form>
        {/* {errorMessage?<h3>Valid name, address and description are required</h3>: null} */}
        <Button id="btn-return-add-campus" onClick={navigateToAllCampuses} variant="contained" endIcon={<KeyboardReturnRoundedIcon/>}>Back to Campus List</Button>
    </div>
    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default AddCampus