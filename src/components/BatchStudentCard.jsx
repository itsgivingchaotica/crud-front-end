import React, {useEffect, useState} from 'react'
import "../styles/studentCard.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const BatchStudentCard = ({entry,handleDeleteStudent}) => {
  const [enrolledCampus, setEnrolledCampus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery('(max-width: 900px)');

  const { id, campusId, firstName, lastName, gpa, imageUrl, email } = entry;

    const handleClickDelete = () => {
    handleDeleteStudent(entry.id);
    };

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
    <Card>
      {/* NAME: REQUIRED */}
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
              sx={{ display: 'flex', alignItems: 'center', height:'110%',width:'110%'}}>
                <img src={imageUrl} alt='${firstName} ${lastName} image' styles={{justifyContent:'center' }}/>
              </CardContent>)}
              <CardContent sx={{marginLeft:'30px'}}>
                <NavLink to={`/students/${id}`} style={{textDecoration:'none'}} >
                  {/* <Typography 
                  variant='h4' 
                  sx={{fontFamily: `'Roboto', sans-serif`, color:'black', textDecoration:'none'}}>
                    Go to Student Profile
                  </Typography> */}
                  <Button variant='contained' color="success" sx={{marginBottom:'10px'}}>
                  <img width="70" height="70" src="https://img.icons8.com/color/70/student-center.png" alt="student-center"/>
                  </Button>
                  </NavLink>
                <DeleteButtonSnackbar handleClickDelete={handleClickDelete}/>
              </CardContent>
            </Stack>
            <Stack direction='row' justifyContent='space-between' width='100%'>
            <Stack direction='column'>
            {/* EMAIL: REQUIRED */}
              <CardContent sx={{ display:'flex', alignItems: 'center', width:'100%',  '&:hover': {
          cursor: 'pointer', color:'var(--mint-2)'
        , textShadow: '1px 1px 1px var(--dark-green)'},}}>
                <EmailIcon sx={{width:'30px', height:'30px',color:'black'}}/>
                <Typography 
                  variant="h5" 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px'}}>
                    {email}
                </Typography>
              </CardContent>
                <Divider light/>
              {/* GPA: REQUIRED */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px', '&:hover': {
          cursor: 'pointer', color:'var(--indigo)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <img width="35" height="35" src="https://img.icons8.com/sf-regular-filled/48/report-card.png" alt="report-card"/>
                <Typography 
                  variant='h5'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`, '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {gpa} GPA 
                </Typography>
              </CardContent>
               <Divider light/>
                {/* CAMPUS ID: REQUIRED */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', '&:hover': {
          cursor: 'pointer', color:'var(--gold)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <div styles={{marginRight:'10px'}} onClick={visitSingleCampusPage}>
                  <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/35/university-campus.png" alt="university-campus"/>
                </div>
                {enrolledCampus.name? (
                  <Typography variant='h5' 
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px', '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}>
                    {enrolledCampus.name}
                  </Typography>) : ( <Typography variant='h5' 
                    sx={{marginLeft:'10px'}}>Not Enrolled</Typography>)
                  }
                </CardContent>
                </Stack>
          </Stack>
    </Card>
        )
}

export default BatchStudentCard