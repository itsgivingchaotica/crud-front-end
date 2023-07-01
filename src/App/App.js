import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { Home, Students, Campuses } from "../pages"
import Home from "../pages/Home"
import Campuses from "../pages/Campuses"
import Students from "../pages/Students"
import { Navbar } from "../components"
import './App.css';

function App() {
  return (
    <Router>
    <div className="Navbar">
    <Navbar/>
    </div>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/students" element={<Students />} /> 
      </Routes>
    </div>
    </Router>
  );
}

export default App;
