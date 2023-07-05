import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { Home, Students, Campuses } from "../pages"
import Home from "../pages/Home"
import { Navbar } from "../components"
import { all, entity, action } from '../pages'
import { Helmet, HelmetProvider } from "react-helmet-async";
import './App.css';
  
function App() {
  return (
    <HelmetProvider>
    <Router>
        <div className="App">
          <div className="Navbar" >
            <Navbar/>
          </div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Scholar·Central</title>
            <link rel="icon" href="https://img.icons8.com/external-justicon-flat-justicon/64/external-graduation-elearning-and-education-justicon-flat-justicon.png" />
            <meta name="description" content="ScholarCentral" />
          </Helmet>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/campuses" element={<all.Campuses />} />
        <Route path="/students" element={<all.Students />} /> 
        <Route path="/students/addStudent" element={<action.AddStudent />} />
        <Route path="/campuses/addCampus" element={<action.AddCampus />} />
        <Route path="/students/:id" element={<entity.SingleStudent />} />
        <Route path="/campuses/:id" element={<entity.SingleCampus />} />
      </Routes>
    </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;
