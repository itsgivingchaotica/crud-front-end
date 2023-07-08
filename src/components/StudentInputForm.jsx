import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useMediaQuery } from '@mui/material'
import { addBatchStudentThunk } from '.././redux/students/student.actions'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import ".././styles/addCampusForm.css"


const StudentInputForm= () => {

    
    const [errorMessage, setErrorMessage] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);
    // CONTACT CARD DATA
    const [firstName, setFirstName] = useState("")
    const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
    const [lastName, setLastName] = useState("")
    const [isLastNameTouched, setIsLastNameTouched] = useState(false);
    const [email, setEmail] = useState("")
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const [gpa, setGpa] = useState("")
    const [isGpaTouched, setIsGpaTouched] = useState(false);
    const [campusId, setCampusId] = useState()
    const [isCampusIdTouched, setIsCampusIdTouched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isMobileScreen = useMediaQuery("(max-width: 414px)");
    const isSmallScreen = useMediaQuery("(max-width: 700px)")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCampuses = useSelector((state) => state.campuses.campusList);


       const navigateToAllStudents= () => {
      navigate("/students");
    }

     const trimmedImageUrl = imageUrl.trim();
  const newImageUrl = trimmedImageUrl ? trimmedImageUrl : "https://i0.wp.com/cfe.umich.edu/wp-content/uploads/2015/09/blank-profile.jpg?fit=4016%2C2677&ssl=1";

     const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    }

     const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeGpa = (event) => {
        setGpa(event.target.value);
    }

    const handleChangeCampusId = (event) => {
        event.preventDefault();
        setCampusId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newStudent = {
            "firstName": firstName,
            "lastName": lastName,
            "imageUrl": newImageUrl,
            "email": email,
            "gpa": gpa,
            "campusId": campusId
        }
        if (firstName && lastName && email && gpa){
            if(gpa<0 || gpa>4){
                setErrorMessage("GPA must be between 0 and 4");
                setFailedSubmit(true);
            }
            else{
                dispatch(addBatchStudentThunk(newStudent))
                setFirstName("");
                setLastName("");
                setCampusId("");
                setGpa("");
                setImageUrl("");
                setEmail("");
                setFailedSubmit(false);
              //   navigateToAllCampuses();   TO NAVIGATE BACK TO ALL CAMPUSES PAGE
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
                setIsFirstNameTouched(false);
                setIsLastNameTouched(false);
                setIsEmailTouched(false);
                setIsGpaTouched(false);
                setIsCampusIdTouched(false);
            }
        }
        else {
          setErrorMessage("Valid first name, last name, email and gpa (between 0 and 4) required");
          setFailedSubmit(true);
        }

    }


  useEffect(() => {
    setIsFirstNameTouched(false);
    setIsLastNameTouched(false);
    setIsGpaTouched(false);
    setIsCampusIdTouched(false);
    setIsEmailTouched(false);
  }, []);

    return (
        //  <div style={{position: 'fixed'}}>
        <Card sx={{ padding: '36px', height:'100%' }}>
        <Typography variant={isMobileScreen ? "h5" : "h4"} mb={2} mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight: '700', transform:isMobileScreen ? 'translateX(-10px)' : 'translateX(-30px)'}}>
  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px'}}>
  {isMobileScreen ? (<img width="50" height="50" src="https://img.icons8.com/bubbles/50/plus.png" alt="plus" />) :(<img width="80" height="80" src="https://img.icons8.com/bubbles/80/plus.png" alt="plus" />)}
  </div>
  ADD STUDENT
</Typography>
<FormControl onSubmit={handleSubmit}>
        <Stack component="form" >
        <Stack direction='row' justifyContent='space-evenly' > 
            <TextField 
                id="outlined-basic" type="text"
                helperText="First Name *" name="firstName"
                variant="outlined"
                value={firstName}
                multiline
                sx={{width:'50%'}}
                onChange={handleChangeFirstName}
                error={(isFirstNameTouched && !firstName) || (failedSubmit && !firstName)}
                InputProps={{ onBlur: () => setIsFirstNameTouched(true) }}
                />
                {/* LAST NAME*/}
            <TextField 
                id="outlined-basic" type="text"
                helperText="Last Name *" name="lastName"
                variant="outlined"
                multiline
                value={lastName}
                sx={{width:'50%', marginLeft:'10px'}}
                onChange={handleChangeLastName}
                error={(isLastNameTouched && !lastName) || (failedSubmit && !lastName)}
                InputProps={{ onBlur: () => setIsLastNameTouched(true) }}
                />
            </Stack>
            {/* IMAGE URL */}
            <TextField 
                id="outlined-basic" type="text"
                helperText="Image Url" 
                multiline
                name="imageURL"
                variant="outlined" 
                value={imageUrl} 
                onChange={handleChangeImageUrl}
                />
            {/* EMAIL */}
            <TextField 
                id="outlined-basic" type="email"
                helperText="Email *" name="email"
                variant="outlined" 
                multiline
                value={email} required
                onChange={handleChangeEmail}
                error={(isEmailTouched && !email) || (failedSubmit && !email)}
                InputProps={{ onBlur: () => setIsEmailTouched(true) }}
                />
                <Stack direction='row' justifyContent='space-evenly' >
            {/* CAMPUS ID */}
            <TextField select helperText="Campus" defaultValue="choose" value={campusId} sx={{width:'80%', textAlign: "left"}} onChange={handleChangeCampusId} name='campusId'>
                <MenuItem value={"choose"} disabled>Select Campus</MenuItem>
                    {allCampuses.map((campus) => {
                        return <MenuItem key={campus.id} value={campus.id} id={campus.id}>
                                {campus.name + " - " + campus.id}
                            </MenuItem>
                    })}
            </TextField>  
                {/* GPA */}
            <TextField 
                id="outlined-basic" 
                type="number" inputProps={{ step: "0.01",  onBlur: () => setIsGpaTouched(true)}} 
                helperText={(gpa<0 || gpa>4) ?"GPA * (0-4)" : "GPA *"}
                variant="outlined" 
                value={gpa} name='gpa'
                sx={{marginLeft:'10px'}}
                onChange={handleChangeGpa}
                error={(isGpaTouched && !gpa) || (failedSubmit && !gpa) || (gpa<0 || gpa>4) ? true : false}
                InputProps={{ onBlur: () => setIsGpaTouched(true) }}
                />                
            </Stack>
             <Stack direction="row" justifyContent={'space-around'}>
             <Button id="btn-return-add-campus" onClick={navigateToAllStudents} variant="contained" endIcon={<KeyboardReturnRoundedIcon/>}><Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '700', textShadow: '3px 1px 2px black', fontFamily: `'Ysabeau Infant', sans-serif` }}>
              Back
            </Typography></Button>
              <Button id='btn-add-campus'
                variant="outlined" 
                type="submit"  
                endIcon={<AddIcon />} 
                >
                 <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '700', textShadow: '3px 1px 2px black', fontFamily: `'Ysabeau Infant', sans-serif` }}>
              Add
            </Typography>
            </Button>
             </Stack>
                <Typography 
                    variant="h5"
                    sx={{ textAlign: "center", opacity: isSubmitted ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out', transform:'translateY(30px)'}}>
                <DoneOutlineIcon sx={{mr:1, color: 'green'}}/> 
                    Submitted!
            </Typography>
        </Stack>
        </FormControl>
    </Card>
    )
}

export default StudentInputForm