import React from 'react'
import { TextField, Button, createTheme, ThemeProvider} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import "../styles/addCampusForm.css"; //reusing styles from add campus form
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

const EditCampusForm = ({handleChangeName, handleChangeAddress, handleChangeImageUrl, 
  handleChangeDescription, handleSubmit, editedCampus, failedSubmit, editFormRef}) => {

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

  const isEmpty = !editedCampus.name && !editedCampus.address && !editedCampus.description;

  return (
    <ThemeProvider theme={theme}>
    <>
    <form onSubmit={handleSubmit}>
      <div className="input-container-add-campus">
        <TextField id="form-input-add-campus" type="text" label="Name" placeholder="Campus Name" inputRef={editFormRef}
          variant="outlined" name="name" value={editedCampus.name} onChange={handleChangeName}
          error={failedSubmit && isEmpty} helperText={failedSubmit && isEmpty? "At least one field required" : null}
        />
      </div>
      <div className="input-container-add-campus">
        <TextField id="form-input-add-campus" type="text" label="Address" placeholder="Address" 
          variant="outlined" name="address" value={editedCampus.address} onChange={handleChangeAddress}
          error={failedSubmit && isEmpty} helperText={failedSubmit && isEmpty? "At least one field required" : null}
        />
      </div> 
      <br></br>
      <div className="input-multiline-container-add-campus">
        <TextField id="form-input-multiline-add-campus" type="text" multiline rows={4} label="Description" placeholder="Description" 
          variant="outlined" name="description" value={editedCampus.description} onChange={handleChangeDescription}
          error={failedSubmit && isEmpty} helperText={failedSubmit && isEmpty? "At least one field required" : null}
          />
      </div>
      <div className="input-multiline-container-add-campus">
        <Button id="btn-form-add-campus" type="submit" variant="contained" endIcon={<CheckRoundedIcon/>}>Done</Button>    
      </div>
    </form>
    </>
    </ThemeProvider>
  )
}

export default EditCampusForm