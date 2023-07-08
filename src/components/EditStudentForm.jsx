import React from 'react';
import "../styles/addStudentForm.css" //reusing styles from add student form
import { TextField, Button, MenuItem, createTheme, ThemeProvider} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const EditStudentForm = ({handleChangeFirstName, handleChangeLastName, handleChangeImageUrl, handleChangeEmail, 
    handleChangeGpa, handleChangeCampus, handleSubmit, editedStudent, allCampuses, failedSubmit, inputRef}) => {

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
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
                boxShadow: '2px 2px 2px black',
                },
              '&:hover fieldset': {
                borderWidth: '0.15rem',
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
    
  const isEmpty = !editedStudent.firstName && !editedStudent.lastName && !editedStudent.email && !editedStudent.imageUrl && !editedStudent.gpa && !editedStudent.campusId;  
    
  return (
    <ThemeProvider theme={theme}>
    <>
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <TextField id="form-input" type="text" label="First Name" placeholder="First Name" 
        error={isEmpty && failedSubmit} helperText={isEmpty && failedSubmit? "At least one field required": null}
        variant="outlined" name="firstName" value={editedStudent.firstName} onChange={handleChangeFirstName} inputRef={inputRef}/>
      </div>
      <div className="input-container">
        <TextField id="form-input" type="text" label="Last Name" placeholder="Last Name"
        error={isEmpty && failedSubmit} helperText={isEmpty && failedSubmit? "At least one field required": null}
        variant="outlined" name="lastName" value={editedStudent.lastName} onChange={handleChangeLastName}/>
      </div>
      <br></br>
      <div className="input-container">
        <TextField id="form-input-long" type="email" label="Email" placeholder="Email" 
        helperText={isEmpty && failedSubmit? "At least one field required": null}
        variant="outlined" name="email" value={editedStudent.email} error={isEmpty && failedSubmit} 
        onChange={handleChangeEmail}/>
      </div>
      <br></br>
      <div className="input-container">
        <TextField id="form-input-long" type="text" label="Image URL" placeholder="Image URL" 
        helperText={isEmpty && failedSubmit? "At least one field required": null}
        variant="outlined" name="imageURL" value={editedStudent.imageUrl} error={isEmpty && failedSubmit} 
        onChange={handleChangeImageUrl}/>
      </div>
      <br></br>
      <div className="input-container">
        <TextField id="form-input-gpa" inputProps={{ step: ".01" }} 
        error={(failedSubmit && isEmpty) || editedStudent.gpa<0 || editedStudent.gpa>4 ? true : false}
        type="number" label="GPA" placeholder="GPA" variant="outlined" name="gpa" value={editedStudent.gpa} step="5" 
        onChange={handleChangeGpa} helperText={isEmpty && failedSubmit? "At least one field required":"Must be between 0 and 4"}/>               
      </div>
      <div className="input-container">
        <TextField id="form-input-select" select label="Campus" defaultValue="choose" value={editedStudent.campusId} onChange={handleChangeCampus} 
        error={failedSubmit &&isEmpty} helperText={isEmpty && failedSubmit? "At least one field required" : null}>
          <MenuItem value="choose" disabled>Select Campus</MenuItem>
            {allCampuses.map((campus) => {
              return <MenuItem key={campus.id} value={campus.id} id={campus.id}>
                    {campus.name + " - " + campus.id}
                    </MenuItem>
            })}
        </TextField>                
      </div>
      <br></br>
      <div className="input-container">
        <Button id="btn-form-edit-student" type="submit" variant="contained" endIcon={<CheckRoundedIcon/>}>Done</Button>    
      </div>
    </form>
    </>
    </ThemeProvider>
  )
}

export default EditStudentForm