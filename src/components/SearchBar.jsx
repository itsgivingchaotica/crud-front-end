import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 700px');
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutocompleteOpen, setAutocompleteOpen] = useState(false);
  const studentList = useSelector((state) => state.students.studentList);
  const campusList = useSelector((state) => state.campuses.campusList);

  const searchOptions = (list, type) => {
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
      return null;
    });
  };

  const searchStudentList = searchOptions(studentList, 'student');
  const searchCampusList = searchOptions(campusList, 'campus');
  const options = [...searchCampusList, ...searchStudentList];

  const handleSearch = (result) => {
    // const isStudent = studentList.filter((student) => (student.id === result.id) && ((student.firstName + ' ' + student.lastName ) === result.label));
    // console.log(isStudent);
    
    // const isCampus = campusList.filter((campus) => (campus.id === result.id) && (campus.name === result.label));
    // console.log(isCampus);

    if (result.type==='student') {
      // Handle student click
       navigate(`/students/${result.id}`);
     
    } else if (result.type==='campus') {
      // Handle campus click
      navigate(`/campuses/${result.id}`);
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
    width: isSmallScreen ? '100%' : '60%',
  };

  const handleSearchTerm = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    console.log("🚀 ~ file: SearchBar.jsx:97 ~ handleSearchTerm ~ query:", query)
    setAutocompleteOpen(query.length > 0);
  };

//   const handleSearchIconClick = () => {
//   if (searchTerm) {
//     const result = options.filter((option) => {
//       return option.label.toLowerCase() === searchTerm.toLowerCase();
//     });
//     console.log("🚀 ~ file: SearchBar.jsx:104 ~ handleSearchIconClick ~ result:", result);
//     if (result) {
//         console.log("SEARCHING!")
//       handleSearch(result);
//     }
//   }
// };

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
    dispatch(fetchAllStudentsThunk());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, transform: 'translateY(110px)'}}>
      <AppBar position="relative">
        <Toolbar sx={{ backgroundColor: 'var(--bone)', paddingTop: '8px', paddingBottom: '5px', position: 'relative', justifyContent:'center',display:'flex' }}>
          <div style={searchStyle} onKeyDown={(e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }}}>
          <IconButton variant="contained" aria-label="open drawer" sx={{ mr: 2 }} >
        <SearchIcon />
      </IconButton>
            <Autocomplete
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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
