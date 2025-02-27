import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
import FacultyDashboard from './Pages/faculty_dashboard/FacultyDashboard';
import FacultyRegister from './Pages/facultyRegister/FacultyRegister';
import Studentdashboard from './Pages/StudentProfile/Studentdashboard';
import Student_Reg from './Pages/Registerations/Student_Reg';

function App() {

  return (
    <>
        <div className="app">
          <Routes>
            <Route path="/presenties" element={<Presenties />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/facultyDashboard" element={<FacultyDashboard/>} />
            <Route path="/facultyRegister" element={<FacultyRegister/>} />
            <Route path="/StudentDashboard" element={<Studentdashboard/>} />
            <Route path="/StudentRegister" element={<Student_Reg/>} />
          </Routes>
        </div>
    </>
  )
}

export default App
