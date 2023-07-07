import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import { fetchStudentSliceThunk } from '.././redux/students/student.actions'

const StudentPagination = ({pagination,setPagination,pageSize}) => {
  
  const allStudents = useSelector((state) => state.students.studentList)
  const studentSlice = useSelector((state) => state.students.studentSliceList)
  const dispatch = useDispatch()

  const fetchStudentSlice = () => {
      return dispatch(fetchStudentSliceThunk({from:pagination.from,to:pagination.to}));
  }
  
  //set the pagination on dispatch to show the updated data
  useEffect(() => {
    fetchStudentSlice();
    setPagination({ ...pagination, count: studentSlice.length });
  }, [dispatch, pagination.from, pagination.to]);

  //determine what campuses to slice next from student ist
  const handlePageChange = (e, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({...pagination, from:from, to:to});
  }

  return (
    <Box justifyContent={'center'} alignItems='center' display={'flex'} sx={{margin: "20px 0px" }}>
      
      <Pagination count={Math.ceil(allStudents.length / pageSize)} 
        onChange={handlePageChange}
      />

    </Box>
  )
}

export default StudentPagination