import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
import FacultyDashboard from './Pages/faculty_dashboard/FacultyDashboard';
import FacultyRegister from './Pages/facultyRegister/FacultyRegister';
<<<<<<< HEAD
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance';
=======
import Studentdashboard from './Pages/StudentProfile/Studentdashboard';
import Student_Reg from './Pages/Registerations/Student_Reg';
>>>>>>> 33946cf39c7c760d0dae472b0d331b1536734379

function App() {

  return (
    <>
<<<<<<< HEAD
      <div className="app">
        <Routes>
          <Route path="/presenties" element={<Presenties />} />
          <Route path="/" element={<Login />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/facultyRegister" element={<FacultyRegister />} />
          <Route path="/attendance/:subjectId/:sectionId" element={<StudentAttendance />} />
        </Routes>
      </div>
=======
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
>>>>>>> 33946cf39c7c760d0dae472b0d331b1536734379
    </>
  )
}

export default App
