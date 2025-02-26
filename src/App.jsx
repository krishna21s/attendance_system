import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';
import Student_Reg from './Pages/Registerations/Student_Reg';

function App() {

  return (
    <>
        <div className="app">
          <Routes>
            <Route path="/presenties" element={<Presenties />} />
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Student_Reg/>} />
          </Routes>
        </div>
    </>
  )
}

export default App
