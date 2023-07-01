import React from 'react'
import "../styles/studentCard.css";

const StudentCard = (props) => {
  return (
    <div>
        <h1>Student</h1>
        <h3>{props.firstName + " " + props.lastName}</h3>
        <h3>{props.email}</h3>
        <img className="student-image" src={props.imageUrl}></img>
        <h3>{props.gpa}</h3>
        <h3>campusId: {props.campusId}</h3>
    </div>
  )
}

export default StudentCard