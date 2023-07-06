import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography'

  //filter options: by name, by number of students enrolled

const CampusDrawer = () => {
  const [state, setState] = useState({
    right: false,
  });

  const isMobileScreen = useMediaQuery("(max-width: 414px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab') || (event.key === 'Shift'))
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      sx={{width: isMobileScreen ? 200 : 500}}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem><Typography variant="h5">Filter</Typography></ListItem>
        {['Name', 'Number of Students Enrolled', 'Clear'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      <ListItem><Typography variant="h5">Quick Links</Typography></ListItem>
        {['All students', 'Add a student', 'Add a campus'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['right']).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} >
  <Typography variant={isMobileScreen ? "subtitle1" : "h5"} sx={{ color: 'black', fontFamily:`'Ysabeau Infant', sans-serif`, fontWeight:'700', '&:hover': {
          cursor: 'pointer', textShadow: '1px 1px 1px var(--dark-green)'},  }}>Options</Typography>{isMobileScreen ? (<img width="50" height="50" src="https://img.icons8.com/bubbles/50/administrative-tools.png" alt="administrative-tools"/>) : (<img width="100" height="100" src="https://img.icons8.com/bubbles/100/administrative-tools.png" alt="administrative-tools"/>)}
</Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CampusDrawer;