import React from 'react'

const StudentListItems = (props) => {
  return (
    <div>
    {props.allStudents.map((student)=>{
        return (<div key={student.id}>
                    <h1>{student.firstName }</h1>
                </div>)
    })}
    </div>
  )
}

export default StudentListItems