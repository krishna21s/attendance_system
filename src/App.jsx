import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
import FacultyDashboard from './Pages/faculty_dashboard/FacultyDashboard';

function App() {

  return (
    <>
     
        <div className="app">
          <Routes>
            <Route path="/presenties" element={<Presenties />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/facultyDashboard" element={<FacultyDashboard/>} />
          </Routes>
        </div>
      
    </>
  )
}

export default App
