import React from 'react'
import { StudentCard } from '../components'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'

const StudentListItems = (props) => {

  const isMediumScreen = useMediaQuery('(max-width: 900px)');
  const isSmallScreen = useMediaQuery('(max-width: 700px')

  return (
     <Grid container spacing={2} sx={{padding:'5px'}}>
    {props.allStudents.map((student)=>{
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
              campusId={student.campusId} />
          </Grid>)
    })}
    </Grid>
  )
}

export default StudentListItems