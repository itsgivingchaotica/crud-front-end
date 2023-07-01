import React from 'react' 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css';

function App() {
  return (
    <Router>
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
