import React from 'react'
import "../styles/campusCard.css";
import { NavLink } from 'react-router-dom';

const CampusCard = (props) => {

    const { id, name, imageUrl, address, description } = props

  return (
    <div>
        <h1>Campus</h1>
        <h3>{name}</h3>
        <h3>{address}</h3>
        <img className="campus-image" src={imageUrl}></img>
        <h3>{description}</h3>
        <NavLink to={`/campuses/${id}`}>Campus Profile</NavLink>
    </div>
  )
}

export default CampusCard