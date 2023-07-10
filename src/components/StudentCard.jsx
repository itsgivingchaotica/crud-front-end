import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import { deleteStudentThunk, fetchStudentSliceThunk } from '../redux/students/student.actions';
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import "../styles/studentCard.css";

const StudentCard = (props) => {
  const [enrolledCampus, setEnrolledCampus] = useState("");
  const { id, firstName, lastName, email, imageUrl, gpa, campusId, pagination } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickDelete = async () => {
  await dispatch(deleteStudentThunk(id));
  setTimeout(() => dispatch(fetchStudentSliceThunk({from:pagination.from, to:pagination.to}),200));
};

  const visitSingleCampusPage = () => {
    navigate(`/campuses/${enrolledCampus.id}`);
  }

  useEffect(()=> {
    const fetchStudentCampus = async()=>{
      try {
        // dispatch(fetchStudentSliceThunk({from:pagination.from, to:pagination.to}));
        // const res = await axios.get(`http://localhost:8080/api/campuses/${campusId}`);
        const res = await axios.get(`https://crud-backend-dusky.vercel.app/api/campuses/${campusId}`);
        const campusResponse = res.data;
        setEnrolledCampus(campusResponse);
      } catch(error){
        console.log(error.message);
      }
    }
    fetchStudentCampus();  
  }, [])
  
  return (
    <Card sx={{paddingBottom: '30px'}}>
      {/* NAME: REQUIRED, FIRST, LAST*/}
       <NavLink to={`/students/${id}`} style={{textDecoration:'none', color:'black' }} >
       <CardContent sx={{
  borderBottom: '4px solid black',
  '&:hover': {
    cursor: 'pointer',
    color: 'var(--garnet)',
    textShadow: '1px 1px 1px var(--dark-green)', backgroundColor:'var(--bone)'
  },
}}>
        <Typography 
          className="name" 
          variant='h5'
          sx={{fontFamily:`'Ysabeau Infant', sans-serif`, fontWeight:'700'}}
        > 
          {firstName} {lastName}
        </Typography>
      </CardContent>
      </NavLink>
      {/* IMAGE URL: OPTIONAL */}
          <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CardMedia component="img" src={imageUrl} alt={`${firstName} ${lastName} profile`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', height: '200px', width: '300px' }} />
          </Box>
            <Stack direction='row' justifyContent='space-between' width='100%'>
            {/* STUDENT DETAILS AND OPTIONS */}
            <Stack direction='column'>
            {/* EMAIL: REQUIRED */}
            <Tooltip title="CONTACT" TransitionComponent={Zoom}  arrow>
              <CardContent onClick={() => window.location.href = `mailto:${email}`} sx={{ display:'flex', alignItems: 'center', width:'100%',  '&:hover': {
          cursor: 'pointer', color:'var(--mint-2)'
        , textShadow: '1px 1px 1px var(--dark-green)'},}}>
                <EmailIcon sx={{width:'30px', height:'30px',color:'black'}}/>
                <Typography 
                  variant="subtitle1" 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px'}}>
                    {email}
                </Typography>
              </CardContent>
              </Tooltip>
                <Divider light width="500px"/>
              {/* GPA: REQUIRED */}
              <Tooltip title="SHOW TRANSCRIPT" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px', '&:hover': {
          cursor: 'pointer', color:'var(--indigo)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <img width="35" height="35" src="https://img.icons8.com/sf-regular-filled/48/report-card.png" alt="report-card"/>
                <Typography 
                  variant='subtitle1'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`, '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {parseFloat(gpa).toFixed(2)} GPA 
                </Typography>
              </CardContent>
              </Tooltip>
               <Divider light sx={{width: '500px'}}/>
                {/* CAMPUS ID: OPTIONAL */}
                <Tooltip title="VISIT SITE" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', '&:hover': {
          cursor: 'pointer', color:'var(--gold)', textShadow: '1px 1px 1px var(--dark-green)'}}} onClick={visitSingleCampusPage}>
                <div styles={{marginRight:'10px'}}>
                  <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/35/university-campus.png" alt="university-campus"/>
                </div>
                {/* SHOW CAMPUS IF ENROLLED */}
                {enrolledCampus.name? (
                  <Typography variant='subtitle1' 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px', '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}>
                    {enrolledCampus.name}
                  </Typography>) : ( <Typography variant='subtitle1' 
                    sx={{marginLeft:'10px'}}>Not Enrolled</Typography>)
                  }
                </CardContent>
              </Tooltip>
            </Stack>
            
          </Stack>
          <CardContent sx={{marginLeft:'30px', justifyContent: 'center'}}>
                <NavLink to={`/students/${id}`} style={{textDecoration:'none'}} >
                  <Tooltip title="GO TO PROFILE" placement='left' arrow TransitionComponent={Zoom}>
                    <Button variant='contained' color="success" sx={{marginRight:'10px', marginLeft:'-40px',flexDirection:'column', paddingLeft:'22px', paddingRight:'22px'}}>
                      <img width="55" height="55" src="https://img.icons8.com/color/70/student-center.png" alt="student-center"/>
                      Profile
                    </Button>
                  </Tooltip>
                </NavLink>
                {/* DELETE STUDENT AND UNDO SNACKBAR*/}
                <DeleteButtonSnackbar handleClickDelete={handleClickDelete}/>
              </CardContent>
    </Card>
  )
}

export default StudentCard