import React from 'react'
import { useMediaQuery } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import '../styles/home.css'
import AddEntityButtonGroup from '../components/AddEntityButtonGroup'

const Home = () => {
   const isMobileScreen = useMediaQuery("(max-width: 414px)")

  return (
     <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    > 
    {isMobileScreen ? ( 
      <div className="home">
        <div style={{color: 'white',transform:'translateY(200px)'}}>
          <AddEntityButtonGroup/>
        </div>
      </div>
    ) :( 
      <div className="home">
        <div style={{color: 'white',transform:'translateY(250px)', justifyContent: 'flex-end'}}>
          <AddEntityButtonGroup/>
        </div>
    </div>)}
   
     </ErrorBoundary>
  )
}

export default Home