import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
<<<<<<< HEAD
import FacultyDashboard from './Pages/faculty_dashboard/FacultyDashboard';
import FacultyRegister from './Pages/facultyRegister/FacultyRegister';
=======
import Student_Reg from './Pages/Registerations/Student_Reg';
>>>>>>> e71deb55267571bc6afce3576987b64fedeab215

function App() {

  return (
    <>
        <div className="app">
          <Routes>
            <Route path="/presenties" element={<Presenties />} />
<<<<<<< HEAD
            <Route path="/login" element={<Login/>} />
            <Route path="/facultyDashboard" element={<FacultyDashboard/>} />
            <Route path="/facultyRegister" element={<FacultyRegister/>} />
=======
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Student_Reg/>} />
>>>>>>> e71deb55267571bc6afce3576987b64fedeab215
          </Routes>
        </div>
    </>
  )
}

export default App
