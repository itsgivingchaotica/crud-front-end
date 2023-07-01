import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { Home, Students, Campuses } from "../pages"
import Home from "../pages/Home"
import Campuses from "../pages/Campuses"
import Students from "../pages/Students"
import { Navbar } from "../components"
import AddStudent from "../pages/AddStudent"
import { SingleStudent } from '../pages'
import { Helmet, HelmetProvider } from "react-helmet-async";
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* <div className="Navbar"> */}
            <Navbar/>
          {/* </div> */}
          <Helmet>
            <meta charSet="utf-8" />
            <title>Scholar·Central</title>
            <link rel="icon" href="https://img.icons8.com/external-justicon-flat-justicon/64/external-graduation-elearning-and-education-justicon-flat-justicon.png" />
            <meta name="description" content="ScholarCentral" />
          </Helmet>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/students" element={<Students />} /> 
        <Route path="/students/addStudent" element={<AddStudent />} />
        <Route path="/campuses/addCampus" element={<AddCampus />} />
        <Route path="/students/:id" element={<SingleStudent />} />
      </Routes>
    </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;
