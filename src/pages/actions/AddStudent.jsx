import React, {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, addStudentThunk } from '../../redux/students/student.actions';
import { useNavigate } from 'react-router-dom';
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions';
import { TextField, MenuItem, FormControl, Button, Grid, createTheme, ThemeProvider} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
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

    const allCampuses = useSelector((state)=> state.campuses.campusList);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [campusId, setCampusId] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);

    const fetchAllCampuses = () => {
        return dispatch(fetchAllCampusesThunk());
    }
    useEffect(()=>{
        fetchAllCampuses();
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeGpa = (event) => {
        setGpa(event.target.value)
    }

    const handleChangeCampus = (event) => {
        setCampusId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newStudent = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "gpa": gpa,
            "campusId": campusId
        }
        // const newStudentObj = JSON.parse(newStudent);
        if(firstName && lastName && email && gpa){
            if(gpa<0 || gpa>4){
                setErrorMessage("Gpa must be between 0 and 4")
                setFailedSubmit(true);
            }
            else{
                dispatch(addStudentThunk(newStudent))
                setFirstName("");
                setLastName("");
                setEmail("");
                setGpa("");
                setCampusId("");
                navigateToAllStudents();
            }
        }
        else{
            setErrorMessage("Valid first name, last name, email and gpa (between 0 and 4) are required");
            setFailedSubmit(true)
        }

    }

    const navigateToAllStudents = () => {
        navigate("/students");
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
    <div className="add-student-page" style={{marginTop:"100px"}}>
        <h1 id="header">Add new student</h1>
        <form onSubmit={handleSubmit}>
        {/* <FormControl> */}
            <div className="input-container">
                <TextField id="form-input" type="text" label="First Name *" placeholder="First Name" 
                error={!firstName && failedSubmit} helperText={!firstName && failedSubmit? "Required": null}
                variant="outlined" name="firstName" value={firstName} onChange={handleChangeFirstName}/>
            </div>
            <div className="input-container">
                <TextField id="form-input" type="text" label="Last Name *" placeholder="Last Name"
                error={!lastName && failedSubmit} helperText={!lastName && failedSubmit? "Required": null}
                variant="outlined" name="lastName" value={lastName} onChange={handleChangeLastName}/>
            </div>
            <br></br>
            <div className="input-container">
                <TextField id="form-input" type="email" label="Email *" placeholder="Email" 
                helperText={!email && failedSubmit? "Required": null}
                variant="outlined" name="email" value={email} error={!email && failedSubmit} 
                onChange={handleChangeEmail}/>
            </div>
            <br></br>
            <div className="input-container">
                <TextField id="form-input" inputProps={{ step: ".01" }} error={(failedSubmit && !gpa) || gpa<0 || gpa>4 ? true : false}
                type="number" label="GPA *" placeholder="GPA" variant="outlined" name="gpa" value={gpa} step="5" 
                onChange={handleChangeGpa} helperText="Must be between 0 and 4"/>               
            </div>
            <div className="input-container">
                <TextField id="form-input" select label="Campus" defaultValue="choose" onChange={handleChangeCampus}>
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
                <Button id="btn-form" type="submit" variant="contained" endIcon={<CheckRoundedIcon/>}>Done</Button>    
            </div>
        {/* </FormControl> */}
        </form>
        <br></br>
        <br></br>
        {/* {errorMessage?<h3>{errorMessage}</h3>: null} */}
        <Button id="btn-return" onClick={navigateToAllStudents} variant="contained" endIcon={<KeyboardReturnRoundedIcon/>}>Back to Student List</Button>
    </div>
    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default AddStudent