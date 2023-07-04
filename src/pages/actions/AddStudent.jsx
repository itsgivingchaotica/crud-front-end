import React, {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, addStudentThunk } from '../../redux/students/student.actions';
import { useNavigate } from 'react-router-dom';
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions';
import { TextField, MenuItem, FormControl, Button, Grid, createTheme, ThemeProvider} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import StudentInputForm from '../../components/StudentInputForm';
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

    const allStudents = useSelector((state)=> state.students.studentList);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [campusId, setCampusId] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);
    const newEntries = useSelector((state) => state.students.studentList);


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
 <div className = "grid" styles={{backgroundColor:'red'}}>
     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{justifyContent: "flex-start", paddingTop: '80px' }}>
      <Grid item xs={12} md={6}>
        <StudentInputForm/>
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

export default AddStudent