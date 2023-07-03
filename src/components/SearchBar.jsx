import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCampusesThunk } from '../redux/campuses/campus.actions';
import { fetchAllStudentsThunk } from '../redux/students/student.actions';

const SearchBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width: 700px');
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutocompleteOpen, setAutocompleteOpen] = useState(false);
  const studentList = useSelector((state) => state.students.studentList);
  const campusList = useSelector((state) => state.campuses.campusList);

  const unifyOptions = (list, type) => {
    return list.map((item) => {
      if (type === 'student') {
        return {
          id: item.email,
          label: `${item.firstName} ${item.lastName}`,
          imageUrl: item.imageUrl,
          type: 'student',
        };
      } else if (type === 'campus') {
        return {
          id: item.name,
          label: item.name,
          imageUrl: item.imageUrl,
          type: 'campus',
        };
      }
    });
  };

  const unifiedStudentList = unifyOptions(studentList, 'student');
  const unifiedCampusList = unifyOptions(campusList, 'campus');
  const options = [...unifiedCampusList, ...unifiedStudentList];

  const handleSearch = (result) => {
    const isStudent = studentList.find((student) => student.id === result.id);
    const isCampus = campusList.find((campus) => campus.id === result.id);

    if (isStudent) {
      // Handle student click
      console.log('Student clicked:', result);
    } else if (isCampus) {
      // Handle campus click
      console.log('Campus clicked:', result);
    }
  };

  const searchStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '16px',
    color: 'black',
    backgroundColor: 'white',
    marginLeft: isSmallScreen ? '-10%' : '20%',
    width: isSmallScreen ? '100%' : '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  };

  const searchIconWrapperStyle = {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '400px'
  };

  const handleSearchTerm = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setAutocompleteOpen(query.length > 0); // Open the autocomplete when there is input
  };

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
    dispatch(fetchAllStudentsThunk());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, transform: 'translateY(110px)'}}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'var(--bone)', paddingTop: '10px', paddingBottom: '10px' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
          </IconButton>
          <div style={searchStyle}>
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={options}
              getOptionLabel={(option) => option.label}
              sx={{
                width: '100%',
                outline: 'none',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e)}
                  autoComplete="off"
                />
              )}
              onChange={(event, value) => handleSearch(value)}
              open={isAutocompleteOpen}
            />
            <div style={searchIconWrapperStyle}>
              <SearchIcon />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
