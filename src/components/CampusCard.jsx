import React from 'react'
import "../styles/campusCard.css";
import { NavLink } from 'react-router-dom';
import { searchStudentsByCampusThunk } from '../redux/students/student.actions';
import { useDispatch, useSelector } from 'react-redux'
import {deleteCampusThunk} from '../redux/campuses/campus.actions';

const CampusCard = (props) => {

    // const { id, name, imageUrl, address, description } = props
    const dispatch = useDispatch(); 

  //   const handleClick = async (campusId) => {
  //   dispatch(searchStudentsByCampusThunk(campusId));
  //   console.log("clicked the card")
  // };

  const handleClickDelete = () => {
    let result = window.confirm("Are you sure you want to delete the campus?");
    if (result === true){
      dispatch(deleteCampusThunk(props.id));
    }

  }

  return (
    <div>
        <h1>Campus</h1>
        <h3>{props.name}</h3>
        <h3>{props.address}</h3>
        <img className="campus-image" src={props.imageUrl}></img>
        <h3>{props.description}</h3>
        <button onClick={handleClickDelete}>Delete Campus</button>
        <button key={props.id}>
            <NavLink to={`/campuses/${props.id}`}>Campus Profile</NavLink>
        </button>
    </div>
  )
}

export default CampusCard