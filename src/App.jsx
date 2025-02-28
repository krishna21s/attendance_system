import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
import FacultyDashboard from './Pages/faculty_dashboard/FacultyDashboard';
import FacultyRegister from './Pages/facultyRegister/FacultyRegister';
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance';
import Student_Reg from './Pages/Registrations/Student_Reg';
import Admin from './Pages/Admin/Admin';
import SendMail from './Pages/Mails/Mail';

function App() {

  return (
    <>
      <div className="app">
        <Routes>
        <Route path="/presenties/:subjectId/:sectionId" element={<Presenties />} />
          <Route path="/" element={<Login />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/facultyRegister" element={<FacultyRegister />} />
          <Route path="/studentRegister" element={<Student_Reg />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/mail" element={<SendMail/>} />
          <Route path="/attendance/:subjectId/:sectionId" element={<StudentAttendance />} />

        </Routes>
      </div>
    </>
  )
}

export default App
