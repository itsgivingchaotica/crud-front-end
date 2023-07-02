import React from 'react'
import "../styles/campusCard.css";
import { NavLink } from 'react-router-dom';
import { searchStudentsByCampusThunk } from '../redux/students/student.actions';
import { useDispatch, useSelector } from 'react-redux'

const CampusCard = (props) => {

    // const { id, name, imageUrl, address, description } = props
    const dispatch = useDispatch(); 
    const handleClick = async (campusId) => {
    dispatch(searchStudentsByCampusThunk(campusId));
    console.log("clicked the card")
    // Redirect to Campus page using React Router or any other routing library
  };

  return (
    <div>
        <h1>Campus</h1>
        <h3>{props.name}</h3>
        <h3>{props.address}</h3>
        <img className="campus-image" src={props.imageUrl}></img>
        <h3>{props.description}</h3>
        <button key={props.id} onClick={() => handleClick(props.id)}>
            <NavLink to={`/campuses/${props.id}`}>Campus Profile</NavLink>
        </button>
    </div>
  )
}

export default CampusCard