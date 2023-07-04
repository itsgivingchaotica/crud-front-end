import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ContactsIcon from '@mui/icons-material/Contacts'
import AddIcon from '@mui/icons-material/Add'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useMediaQuery } from '@mui/material'
import { addCampusThunk } from '.././redux/campuses/campus.actions';
import { useDispatch } from 'react-redux'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import ".././styles/addCampusForm.css"


const CampusInputForm= () => {

    
    const [errorMessage, setErrorMessage] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);
    // CONTACT CARD DATA
    const [name, setName] = useState("")
    const [isNameTouched, setIsNameTouched] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const [address, setAddress] = useState("")
    const [isAddressTouched, setIsAddressTouched] = useState(false);
    const [description, setDescription] = useState("")
    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isMobileScreen = useMediaQuery("(max-width: 414px)");
    const isSmallScreen = useMediaQuery("(max-width: 700px")
    const navigate = useNavigate();
    const dispatch = useDispatch();

       const navigateToAllCampuses = () => {
      navigate("/campuses");
    }

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
        //   navigateToAllCampuses();   TO NAVIGATE BACK TO ALL CAMPUSES PAGE
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
        setIsNameTouched(false);
        setIsAddressTouched(false);
        setIsDescriptionTouched(false);
        }
        else {
          setErrorMessage(true);
          setFailedSubmit(true);
        }

    }


    useEffect(() => {
    // This effect will run only once when the component mounts
    setIsNameTouched(false);
    setIsAddressTouched(false);
    setIsDescriptionTouched(false);
  }, []);

    return (
        //  <div style={{position: 'fixed'}}>
        <Card sx={{ padding: '36px', height:'100%'}}>
        <Typography variant="h4" mb={2} mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight: '700', transform:'translateX(-30px)' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <img width="80" height="80" src="https://img.icons8.com/bubbles/80/plus.png" alt="plus" />
  </div>
  ADD CAMPUS
</Typography>
        <Stack component="form" maxWidth='500px' sx={{margin:"0 auto"}}>
            {/* CAMPUS NAME */}
            <TextField 
                id="outlined-basic" 
                helperText="Name" 
                variant="outlined"
                value={name}
                required
                onChange={(e) => (handleChangeSchoolName(e))}
                error={isNameTouched && !name}
                InputProps={{ onBlur: () => setIsNameTouched(true) }}
                />
            {/* IMAGE URL */}
            <TextField 
                id="outlined-basic" 
                helperText="Image Url" 
                variant="outlined" 
                value={imageUrl} 
                onChange={(e) => handleChangeImageUrl(e)}
                />
            {/* CAMPUS ADDRESS */}
            <TextField 
                id="outlined-basic" 
                helperText="Address" 
                variant="outlined" 
                value={address} 
                required
                multiline
                onChange={(e) => handleChangeAddress(e)}
                error={isAddressTouched && !address}
                InputProps={{ onBlur: () => setIsAddressTouched(true) }}
                />
            {/* DESCRIPTION */}
            <TextField 
                id="outlined-basic" 
                helperText="Description" 
                variant="outlined" 
                value={description} 
                required
                multiline
                onChange={(e) => handleChangeDescription(e)}
                error={isDescriptionTouched && !description}
                InputProps={{ onBlur: () => setIsDescriptionTouched(true) }}
                />
             <Stack direction="row" justifyContent={'space-around'}>
             <Button id="btn-return-add-campus" onClick={navigateToAllCampuses} variant="contained" endIcon={<KeyboardReturnRoundedIcon/>}><Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} sx={{ color: 'var(--bone)', fontWeight: '700', textShadow: '3px 1px 2px black', fontFamily: `'Ysabeau Infant', sans-serif` }}>
              Back
            </Typography></Button>
            <Button id='btn-add-campus'
                variant="outlined" 
                type="submit"  
                endIcon={<AddIcon />} 
                onClick={handleSubmit}>
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
    </Card>
    )
}

export default CampusInputForm