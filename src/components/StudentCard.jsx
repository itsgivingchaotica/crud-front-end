import React from 'react'
import "../styles/studentCard.css";
import { NavLink } from 'react-router-dom';
import { deleteStudentThunk } from '../redux/students/student.actions';
import { useDispatch, useSelector } from 'react-redux';

const StudentCard = (props) => {

  const dispatch = useDispatch();

  const handleClickDelete = () => {
    let result = window.confirm("Are you sure you want to delete the student?");
    if (result === true){
      dispatch(deleteStudentThunk(props.id));
    }

  }
  
  return (

    <div>
        <h1>Student</h1>
        <h3>{props.firstName + " " + props.lastName}</h3>
        <h3>{props.email}</h3>
        <img className="student-image" src={props.imageUrl}></img>
        <h3>{props.gpa}</h3>
        <h3>campusId: {props.campusId}</h3>
        <button onClick={handleClickDelete}>Delete Student</button>
        <NavLink to={`/students/${props.id}`}>Student Profile</NavLink>
    </div>
  )
}

export default StudentCard