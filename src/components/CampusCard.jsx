import React from 'react'
import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import { useDispatch } from 'react-redux'
import { deleteCampusThunk,fetchCampusSliceThunk } from '../redux/campuses/campus.actions';
import "../styles/campusCard.css";

const CampusCard = (props) => {

  const { id, name, imageUrl, address, description, pagination } = props

  const dispatch = useDispatch(); 
  const isSmallScreen = useMediaQuery('(max-width: 700px');
  const isMediumScreen = useMediaQuery('(max-width: 1000px)');
  const [firstAddress, ...restAddress] = address.split(',');
  const address1 = firstAddress.trim();
  const address2 = restAddress.join(',').trim();

  const handleClickDelete = async () => {
    await dispatch(deleteCampusThunk(id));
    dispatch(fetchCampusSliceThunk(pagination.from,pagination.to))
  }

  return (
    <Card sx={{paddingBottom: '30px', overflow:'scroll', paddingTop: '10px', height:'550px'}}>
      {/* NAME: REQUIRED*/}
      <CardContent sx={{borderBottom:'4px solid black'}}>
      <NavLink to={`/campuses/${id}`} style={{textDecoration:'none', color:'black'}} >
        <Typography 
          variant="h4" 
          sx={{fontFamily:`'Ysabeau Infant', sans-serif`, fontWeight:'700'}}
        > 
          {name}
        </Typography>
        </NavLink>
      </CardContent>
          <Stack direction='row'>
          {/* IMAGE URL: DEFAULT REQUIRED */}
            {(<CardContent
              sx={{ display: 'flex', alignItems: 'center', height:'100%',width:'100%'}}>
                <img src={imageUrl} alt={`${name} profile`}  styles={{justifyContent:'center' }}/>
              </CardContent>)}
            </Stack>
            <Stack direction='row' justifyContent='space-between' width='100%'>
            {/* CAMPUS DETAILS AND OPTIONS */}
            <Stack direction='column'>
            {/* ADDRESS: REQUIRED */}
            <Tooltip title="SHOW MAP" TransitionComponent={Zoom}  arrow>
              <CardContent sx={{ display:'flex', alignItems: 'center', width:'100%', '&:hover': {
          cursor: 'pointer', color:'var(--mint-2)'
        , textShadow: '1px 1px 1px var(--dark-green)'},}}>
                <LocationOnIcon/>
                <div style={{display:'flex',flexDirection:'column', alignItems: 'left', marginLeft:'10px'}}>
                <Typography 
                  variant={isMediumScreen ? "subtitle1" : isSmallScreen ? 'h6' : 'subtitle1'}
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px', textAlign: "left"}}>
                   {address1}
                </Typography>
                <Typography 
                  variant={isMediumScreen ? "subtitle1" : isSmallScreen ? 'h6' : 'subtitle1'}
                  sx={{fontFamily: `'Manrope',sans-serif`, marginLeft:'10px', textAlign: "left"}}>
                {address2}
                </Typography>
                </div>
              </CardContent>
              </Tooltip>
                <Divider light/>
              {/* DESCRIPTION: REQUIRED */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', marginRight:'10px'}}>
                <Typography 
                  variant='subtitle1'
                  sx={{marginLeft:'10px', fontFamily:`'Manrope',sans-serif`, marginTop:'20px',textAlign: "left",'&:hover':{textShadow: '1px 1px 1px var(--dark-green)'}}}> 
                  {description}
                </Typography>
              </CardContent>
            </Stack>
            
          </Stack>
          <CardContent sx={{marginLeft:'30px', justifyContent: 'center'}}>
                <NavLink to={`/campuses/${id}`} style={{textDecoration:'none'}} >
                  <Tooltip title="GO TO PROFILE" placement='left' arrow TransitionComponent={Zoom}>
                    <Button variant='contained' color="success" sx={{marginRight:'10px', marginLeft:'-40px',flexDirection:'column', paddingLeft:'22px', paddingRight:'22px'}}>
                      <img
                        width="55"
                        height="55"
                        src="https://img.icons8.com/bubbles/80/library.png"
                        alt="library"
                      />
                      Profile
                    </Button>
                  </Tooltip>
                </NavLink>
                {/* DELETE CAMPUS AND UNDO SNACKBAR*/}
                <DeleteButtonSnackbar handleClickDelete={handleClickDelete}/>
              </CardContent>
    </Card>
  )
  
}

export default CampusCard