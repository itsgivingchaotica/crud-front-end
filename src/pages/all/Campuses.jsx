import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions'
import { CampusListItems } from '../../components'

const Campuses = () => {
   const allCampuses = useSelector((state) => state.campuses.campusList) //state is an object, campuses in an object, campusList is the array in campuses object
  const dispatch = useDispatch();

  const fetchAllCampuses = () => {
      return dispatch(fetchAllCampusesThunk());
  }

  useEffect(() =>{
      fetchAllCampuses();
  }, [])

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    > 
    <div style={{marginTop: '100px'}}>
        <h1>Campuses</h1>
        <NavLink to="/campuses/addCampus">Add new campus</NavLink>
        {allCampuses.length>0? <CampusListItems allCampuses={allCampuses}/> : <h1>No campuses in our list! Add some!</h1> }

    </div>
    </ErrorBoundary>
  )
}

export default Campuses