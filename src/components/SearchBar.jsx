import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCampusesThunk } from '../redux/campuses/campus.actions';
import { fetchAllStudentsThunk } from '../redux/students/student.actions';

//inspired by https://codesandbox.io/s/hgyj4j?file=/demo.tsx
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
          id: item.id,
          label: `${item.firstName} ${item.lastName}`,
          email: item.email,
          type: 'student',
        };
      } else if (type === 'campus') {
        return {
          id: item.id,
          label: item.name,
          address: item.address,
          type: 'campus',
        };
      }
    });
  };

  const unifiedStudentList = unifyOptions(studentList, 'student');
  const unifiedCampusList = unifyOptions(campusList, 'campus');
  const options = [...unifiedCampusList, ...unifiedStudentList];

  const handleSearch = (result) => {
    const isStudent = studentList.find((student) => (student.id === result.id) && ((student.firstName + ' ' + student.lastName ) === result.label));
    console.log("🚀 ~ file: SearchBar.jsx:51 ~ handleSearch ~ isStudent:", isStudent)
    const isCampus = campusList.find((campus) => (campus.id === result.id) && (campus.name = result.label));
    console.log("🚀 ~ file: SearchBar.jsx:53 ~ handleSearch ~ isCampus:", isCampus)

    if (isStudent) {
      // Handle student click
      console.log('Student clicked:', result);
      console.log("🚀 ~ file: SearchBar.jsx:55 ~ handleSearch ~ result:", result)
    } else if (isCampus) {
      // Handle campus click
      console.log('Campus clicked:', result);
      console.log("🚀 ~ file: SearchBar.jsx:59 ~ handleSearch ~ result:", result)
    }

    setAutocompleteOpen(false); // Close the Autocomplete dropdown
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
    marginLeft: '400px',
  };

  const handleSearchTerm = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    console.log("🚀 ~ file: SearchBar.jsx:97 ~ handleSearchTerm ~ query:", query)
    setAutocompleteOpen(query.length > 0);
  };

  const handleSearchIconClick = () => {
    if (searchTerm) {
      console.log("🚀 ~ file: SearchBar.jsx:102 ~ handleSearchIconClick ~ searchTerm:", searchTerm)
      const result = options.find((option) => {
          console.log("🚀 ~ file: SearchBar.jsx:104 ~ handleSearchIconClick ~ option:", option)
          return option.label.toLowerCase() === searchTerm.toLowerCase()
      })
      console.log("🚀 ~ file: SearchBar.jsx:104 ~ handleSearchIconClick ~ result:", result)
      if (result) {
        handleSearch(result);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
    dispatch(fetchAllStudentsThunk());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, transform: 'translateY(110px)', zIndex: 9999 }}>
      <AppBar position="relative">
        <Toolbar sx={{ backgroundColor: 'var(--bone)', paddingTop: '10px', paddingBottom: '10px', zIndex: 9999, position: 'relative' }}>
          <div style={searchStyle}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              getOptionLabel={(option) => option.label}
              sx={{
                width: '100%',
                outline: 'none',
                zIndex: 9999,
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
              onChange={(event, value) => {
                if (!value) {
                  // Handle case when value is cleared
                  setAutocompleteOpen(false);
                  setSearchTerm('');
                } else {
                  handleSearch(value);
                }
              }}
              onInputChange={(event, newInputValue) => {
                setAutocompleteOpen(newInputValue.length > 0);
              }}
              open={isAutocompleteOpen}
              isOptionEqualToValue={(option, value) => option.id === value?.id} // Update the equality test
            />
            <div style={searchIconWrapperStyle}>
              <div style={searchIconWrapperStyle}>
      <IconButton onClick={handleSearchIconClick} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
        <SearchIcon />
      </IconButton>
    </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
