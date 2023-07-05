import React, {useEffect, useState} from 'react'
import "../styles/studentCard.css";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom';
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const BatchCampusCard = ({entry,handleDeleteCampus}) => {

  const navigate = useNavigate();

  const { id, name, address, imageUrl, description } = entry;

    const handleClickDelete = () => {
    handleDeleteCampus(entry.id);
    };

  return (
    <Card>
      {/* NAME: REQUIRED */}
      <CardContent sx={{borderBottom:'4px solid black'}}>
        <Typography 
          variant="h4" 
          className="name" 
          sx={{fontFamily:`'Ysabeau Infant', sans-serif`, fontWeight:'700'}}
        > 
          {name}
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
                  <Tooltip title="GO TO PROFILE" placement='left' arrow TransitionComponent={Zoom}>
                    <Button variant='contained' color="success" sx={{marginBottom:'10px'}}>
                      <img width="70" height="70" src="https://img.icons8.com/color/70/student-center.png" alt="student-center"/>
                    </Button>
                  </Tooltip>
                </NavLink>
                {/* DELETE CAMPUS AND UNDO SNACKBAR*/}
                <DeleteButtonSnackbar handleClickDelete={handleClickDelete}/>
              </CardContent>
            </Stack>
            <Stack direction='row' justifyContent='space-between' width='100%'>
            {/* CAMPUS DETAILS AND OPTIONS */}
            <Stack direction='column'>
              {/* ADDRESS: REQUIRED */}
              <Tooltip title="SHOW MAP" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px', '&:hover': {
          cursor: 'pointer', color:'var(--indigo)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <img width="35" height="35" src="https://img.icons8.com/sf-regular-filled/48/report-card.png" alt="report-card"/>
                <Typography 
                  variant='h5'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`, '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {address} 
                </Typography>
              </CardContent>
              </Tooltip>
               <Divider light/>
                {/* DESCRIPTION: REQUIRED */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', '&:hover': {
                cursor: 'pointer', color:'var(--gold)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <div style={{marginRight:'10px'}} >
                    <Typography 
                    variant="h6" 
                    sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px'}}>
                        {description}
                    </Typography>
                </div>
                </CardContent>
            </Stack>
          </Stack>
    </Card>
  )
}

export default BatchCampusCard