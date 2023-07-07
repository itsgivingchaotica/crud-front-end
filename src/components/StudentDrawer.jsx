import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { sortStudentDescThunk, sortStudentAscThunk, fetchStudentSliceThunk, sortStudentGpaHighThunk } from '.././redux/students/student.actions'

  //filter options: by last name, by first name, by gpa, by schoolnames, 

const StudentDrawer = ({pagination}) => {
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

  const dispatch = useDispatch();

  const handleSortByGpaHigh = () => {
    dispatch(sortStudentGpaHighThunk(pagination.from,pagination.to));
  }

  const handleSortByLastNameDesc = () => {
    dispatch(sortStudentDescThunk(pagination.from,pagination.to));
  }

  const handleSortByLastNameAsc = () => {
    dispatch(sortStudentAscThunk(pagination.from,pagination.to));
  }

  const handleClearFilter = () => {
    dispatch(fetchStudentSliceThunk(pagination.from,pagination.to));
  }

  const list = (anchor) => (
     <Box
      role="presentation"
      sx={{width: isMobileScreen ? 200 : 500}}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <List>
      <ListItem sx={{borderBottom:'2px solid black'}}>
        <Typography variant="h5" sx={{fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight:'700'}}>
            FILTER OPTIONS
        </Typography>
      </ListItem>
        {/* BY LAST NAME ASC*/}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSortByLastNameAsc}>
            <ListItemIcon sx={{marginLeft:'15px', marginRight:'12px'}}>
             <img width="70" height="70" src="https://img.icons8.com/water-color/100/alphabetical-sorting.png" alt="alphabetical-sorting"/>
              </ListItemIcon>
              <ListItemText primary={'By Last Name Ascending'} sx={{color:'black'}}/>
            </ListItemButton>
          </ListItem>
          {/* BY LAST NAME DESC*/}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSortByLastNameDesc}>
            <ListItemIcon sx={{marginLeft:'15px', marginRight:'12px'}}>
             <img width="70" height="70" src="https://img.icons8.com/color/100/alphabetical-sorting-2.png" alt="alphabetical-sorting-2"/>
              </ListItemIcon>
              <ListItemText primary={'By Last Name Descending'} sx={{color:'black'}}/>
            </ListItemButton>
          </ListItem>
          {/* BY GPA HIGH */}
          <ListItem disablePadding>
          <ListItemButton onClick={handleSortByGpaHigh}>
            <ListItemIcon>
             <img width="100" height="100" src="https://img.icons8.com/bubbles/100/apple-calculator.png" alt="apple-calculator"/>
              </ListItemIcon>
              <ListItemText primary={'By GPA HIGH'} sx={{color:'black'}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          {/* CLEAR FILTERS */}
          <ListItemButton onClick={handleClearFilter}>
            <ListItemIcon>
            <img width="100" height="100" src="https://img.icons8.com/bubbles/100/cancel--v1.png" alt="cancel--v1"/>
              </ListItemIcon>
              <ListItemText primary={'Clear Filter'} sx={{color:'black'}}/>
            </ListItemButton>
          </ListItem>
        {/* ))} */}
      </List>
      
      <Divider />

      <List>
      <ListItem sx={{borderBottom:'2px solid black'}}>
        <Typography variant="h5" sx={{fontFamily: `'Ysabeau Infant', sans-serif`, fontWeight:'700'}}>
            QUICK LINKS
        </Typography>
      </ListItem>
        {/* SHOW ALL CAMPUSES */}
        <ListItem disablePadding>
        <NavLink to="/campuses" style={{ textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon>
             <img width="100" height="100" src="https://img.icons8.com/bubbles/100/library.png" alt="library"/>
              </ListItemIcon>
              <ListItemText primary={'Show All Campuses'} sx={{color:'black'}}/>
            </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ADD A CAMPUS */}
          <ListItem disablePadding>
           <NavLink to='/campuses/addCampus' style={{textDecoration: 'none'}}>
          <ListItemButton>
            <ListItemIcon>
             <img width="100" height="100" src="https://img.icons8.com/bubbles/100/add-file.png" alt="add-file"/>
              </ListItemIcon>
              <ListItemText primary={'Add a Campus'} sx={{color:'black'}}/>
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
          <NavLink to="/students/addStudent" style={{ textDecoration: 'none' }}>
          {/* ADD A STUDENT */}
          <ListItemButton>
            <ListItemIcon>
             <img width="100" height="100" src="https://img.icons8.com/bubbles/100/education.png" alt="education"/>
              </ListItemIcon>
              <ListItemText primary={'Add a Student'} sx={{color:'black'}}/>
            </ListItemButton>
            </NavLink>
          </ListItem>
        {/* ))} */}
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

export default StudentDrawer;