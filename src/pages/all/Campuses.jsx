import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions'
import { CampusListItems } from '../../components'

const Campuses = () => {
   const allCampuses = useSelector((state) => state.campuses.campusList) //state is an object, campuses in an object, campusList is the array in campuses object
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchAllCampuses = () => {
      return dispatch(fetchAllCampusesThunk());
  }

  useEffect(() =>{
      fetchAllCampuses();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [location]);

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
        
    </div>
    </ErrorBoundary>
  )
}

export default Campuses