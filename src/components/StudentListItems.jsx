import React from 'react'
import { StudentCard } from '../components'

const StudentListItems = (props) => {
  return (
    <div>
    {props.allStudents.map((student)=>{
        return (<StudentCard key={student.id} id={student.id} firstName={student.firstName} lastName={student.lastName}
                email={student.email} imageUrl={student.imageUrl} gpa={student.gpa} campusId={student.campusId}>
                </StudentCard>)
    })}
    </div>
  )
}

export default StudentListItems