import React from 'react'
import "../styles/campusCard.css";
import { NavLink } from 'react-router-dom';

const CampusCard = (props) => {

    // const { id, name, imageUrl, address, description } = props

  return (
    <div>
        <h1>Campus</h1>
        <h3>{props.name}</h3>
        <h3>{props.address}</h3>
        <img className="campus-image" src={props.imageUrl}></img>
        <h3>{props.description}</h3>
        <NavLink to={`/campuses/${props.id}`}>Campus Profile</NavLink>
    </div>
  )
}

export default CampusCard