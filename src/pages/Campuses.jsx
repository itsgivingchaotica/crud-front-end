import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusesThunk } from '../redux/campuses/campus.actions'
import { CampusListItems } from '../components'

const Campuses = () => {
   const allCampuses = useSelector((state) => state.campuses.campusList) //state is an object, campuses in an object, campusList is the array in campuses object
  console.log('allCampuses in campuses component', allCampuses);
  const dispatch = useDispatch();

  const fetchAllCampuses = () => {
      return dispatch(fetchAllCampusesThunk());
  }

  useEffect(() =>{
      fetchAllCampuses();
  }, [])

  return (
    <div style={{marginTop: '100px'}}>
        <h1>Campuses</h1>
        <NavLink to="/campuses/addCampus">Add new campus</NavLink>
        <CampusListItems allCampuses={allCampuses}/>
    </div>
  )
}

export default Campuses