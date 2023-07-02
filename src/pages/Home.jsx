import React from 'react'
import { useMediaQuery } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import '../styles/home.css'

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
          Home
        </div>
      </div>
    ) :( 
      <div className="home">
        <div style={{color: 'white',transform:'translateY(200px)'}}>
          Home
        </div>
    </div>)}
   
     </ErrorBoundary>
  )
}

export default Home