import React, {useState} from 'react'
import { Button, IconButton, Snackbar } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

const DeleteButtonSnackbar = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      props.handleClickDelete();
      if(props.navigate){
        props.navigate();
      }
    };
  
    const handleUndo = (event) => {
      setOpen(false);
    }
  
    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleUndo} value="undo">
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  

  return (
    <>
        {props.iconVersion? 
        <Tooltip title="DELETE" placement='bottom' arrow TransitionComponent={Zoom}>
          <IconButton id="profile-btn" aria-label="delete" onClick={handleClickOpen}>
            <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>  
        :<Tooltip title="DELETE" placement='left' arrow TransitionComponent={Zoom}>
        <Button variant='outlined' color='error' onClick={handleClickOpen} sx={{height:'90px', width:'100px', '&:hover': {color: 'white', backgroundColor: 'red'}}}>
            <DeleteRoundedIcon style={{height:'60px',width:'60px'}}/>
        </Button>
        </Tooltip>}
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Profile will be deleted in few seconds"
        action={action}
        />
  </>
  )
}

export default DeleteButtonSnackbar

{/* <>
<IconButton id="profile-btn" aria-label="delete" onClick={handleClickOpen}>
    <DeleteRoundedIcon />
</IconButton>
<Snackbar
open={open}
autoHideDuration={6000}
onClose={handleClose}
message="Profile will be deleted in few seconds"
action={action}
/>
</> */}