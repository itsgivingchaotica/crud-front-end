import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StudentCard } from '../components'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'
import { fetchAllStudentsThunk, fetchStudentSliceThunk } from '.././redux/students/student.actions'

const StudentListItems = (props) => {

  const { pagination, allStudents } = props;
  const isMediumScreen = useMediaQuery('(max-width: 900px)');
  const isSmallScreen = useMediaQuery('(max-width: 700px')

  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(fetchStudentSliceThunk(pagination.from,pagination.to))
  },[dispatch,pagination])

  useEffect(() => {
    dispatch(fetchAllStudentsThunk())
  })

  return (
     <Grid container spacing={2} sx={{padding:'5px'}}>
    {allStudents.map((student)=>{
        return (
          <Grid item xs={isSmallScreen ? 12 : isMediumScreen ? 6 : 4} key={student.id} sx={{marginBottom: '50px'}}>
            <StudentCard 
              key={student.id} 
              id={student.id} 
              firstName={student.firstName} 
              lastName={student.lastName}
              email={student.email} 
              imageUrl={student.imageUrl} 
              gpa={student.gpa} 
              campusId={student.campusId} pagination={pagination}/>
          </Grid>)
    })}
    </Grid>
  )
}

export default StudentListItems