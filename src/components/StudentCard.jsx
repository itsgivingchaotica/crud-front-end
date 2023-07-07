import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteStudentThunk } from '../redux/students/student.actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import "../styles/studentCard.css";

const StudentCard = (props) => {
  const [enrolledCampus, setEnrolledCampus] = useState("");
  const { id, firstName, lastName, email, imageUrl, gpa, campusId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickDelete = () => {
    // let result = window.confirm("Are you sure you want to delete the student?");
    // if (result === true){
      dispatch(deleteStudentThunk(id));
    // }

  }

  const visitSingleCampusPage = () => {
    navigate(`/campuses/${enrolledCampus.id}`);
  }

  useEffect(()=> {
    const fetchStudentCampus = async()=>{
      try {
        const res = await axios.get(`http://localhost:8080/api/campuses/${campusId}`)
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
      <CardContent sx={{borderBottom:'4px solid black'}}>
        <Typography 
          variant="h4" 
          className="name" 
          sx={{fontFamily:`'Ysabeau Infant', sans-serif`, fontWeight:'700'}}
        > 
          {firstName} {lastName}
        </Typography>
      </CardContent>
          <Stack direction='row'>
          {/* IMAGE URL: DEFAULT REQUIRED */}
            {(<CardContent
              sx={{ display: 'flex', alignItems: 'center', height:'100%',width:'100%'}}>
                <img src={imageUrl} alt={`${firstName} ${lastName} profile`}  styles={{justifyContent:'center' }}/>
              </CardContent>)}
            </Stack>
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
                  variant="h5" 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px'}}>
                    {email}
                </Typography>
              </CardContent>
              </Tooltip>
                <Divider light/>
              {/* GPA: REQUIRED */}
              <Tooltip title="SHOW TRANSCRIPT" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px', '&:hover': {
          cursor: 'pointer', color:'var(--indigo)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <img width="35" height="35" src="https://img.icons8.com/sf-regular-filled/48/report-card.png" alt="report-card"/>
                <Typography 
                  variant='h5'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`, '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {parseFloat(gpa).toFixed(2)} GPA 
                </Typography>
              </CardContent>
              </Tooltip>
               <Divider light/>
                {/* CAMPUS ID: OPTIONAL */}
                <Tooltip title="VISIT SITE" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', '&:hover': {
          cursor: 'pointer', color:'var(--gold)', textShadow: '1px 1px 1px var(--dark-green)'}}} onClick={visitSingleCampusPage}>
                <div styles={{marginRight:'10px'}}>
                  <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/35/university-campus.png" alt="university-campus"/>
                </div>
                {/* SHOW CAMPUS IF ENROLLED */}
                {enrolledCampus.name? (
                  <Typography variant='h5' 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px', '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}>
                    {enrolledCampus.name}
                  </Typography>) : ( <Typography variant='h5' 
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