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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteButtonSnackbar from './DeleteButtonSnackbar';

const BatchCampusCard = ({entry,handleDeleteCampus}) => {

  //deconstruct props
  const { id, name, address, imageUrl, description } = entry;
  //separate the first line from second line of the address by first comma
  const [firstAddress, ...restAddress] = address.split(',');
  const address1 = firstAddress.trim();
  const address2 = restAddress.join(',').trim();

  const handleClickDelete = () => {
  handleDeleteCampus(entry.id);
  };

  return (
    <Card sx={{overflow:'scroll'}}>
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
                <img src={imageUrl} alt={`${name} profile image`} styles={{justifyContent:'center' }}/>
              </CardContent>)}
            </Stack>
            <Stack direction='row' justifyContent='space-between' width='100%'>
            {/* CAMPUS DETAILS AND OPTIONS */}
            <Stack direction='column'>
              {/* ADDRESS: REQUIRED */}
              <Tooltip title="SHOW MAP" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px', '&:hover': {
          cursor: 'pointer', color:'var(--indigo)', textShadow: '1px 1px 1px var(--dark-green)'}}}>
                <LocationOnIcon/>
                <div style={{flexDirection:'column'}}>
                <Typography 
                  variant='h5'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`,textAlign:'left', '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {address1} 
                </Typography>
                <Typography  variant='h5'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`,textAlign:'left', '&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}>
                  {address2}
                </Typography>
                </div>
              </CardContent>
              </Tooltip>
              <CardContent sx={{marginLeft:'30px'}}>
                <NavLink to={`/campuses/${id}`} style={{textDecoration:'none'}} >
                  <Tooltip title="GO TO PROFILE" placement='left' arrow TransitionComponent={Zoom}>
                    <Button variant='contained' color="success" sx={{marginRight:'10px', marginLeft:'-40px',flexDirection:'column', paddingLeft:'12px', paddingRight:'12px'}}>
                      <img
                        width="80"
                        height="80"
                        src="https://img.icons8.com/bubbles/80/library.png"
                        alt="library"
                      />
                    </Button>
                  </Tooltip>
                </NavLink>
                {/* DELETE CAMPUS AND UNDO SNACKBAR*/}
                <DeleteButtonSnackbar handleClickDelete={handleClickDelete}/>
              </CardContent>
               <Divider light/>
                {/* DESCRIPTION: REQUIRED */}
              <CardContent sx={{ display: 'flex'}}>
                <div style={{marginRight:'10px'}} >
                    <Typography 
                    variant="subtitle1" 
                    sx={{fontFamily: `'Manrope',sans-serif`, justifyContent:'flex-start', textAlign:'left'}}>
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