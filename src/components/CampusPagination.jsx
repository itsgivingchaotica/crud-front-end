import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import { fetchCampusSliceThunk } from '.././redux/campuses/campus.actions'

const CampusPagination = ({pagination, setPagination, pageSize}) => {

  const allCampuses = useSelector((state) => state.campuses.campusList)
  const campusSlice = useSelector((state) => state.campuses.campusSliceList)
  const dispatch = useDispatch()

  const fetchCampusSlice = () => {
      return dispatch(fetchCampusSliceThunk({from:pagination.from,to:pagination.to}));
  }
  
  useEffect(() => {
    fetchCampusSlice();
    setPagination({ ...pagination, count: campusSlice.length });
  }, [dispatch, pagination.from, pagination.to]);

  const handlePageChange = (e, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({...pagination, from:from, to:to});
  }

  return (
    <Box justifyContent={'center'} alignItems='center' display={'flex'} sx={{margin: "20px 0px" }}>
      
      <Pagination count={Math.ceil(allCampuses.length / pageSize)} 
        onChange={handlePageChange}
      />

    </Box>
  )
}

export default CampusPagination