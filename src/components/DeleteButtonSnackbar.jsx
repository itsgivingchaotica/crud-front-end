import React, {useState} from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import CloseIcon from '@mui/icons-material/Close';;

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
      props.handleDeleteStudent();
      if(props.navigateToAllStudents){
        props.navigateToAllStudents();
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
  </>
  )
}

export default DeleteButtonSnackbar