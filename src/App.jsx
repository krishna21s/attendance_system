import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Presenties from './Pages/presenties_page/Presenties'
import Login from './Pages/Login/Login';

function App() {

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="app">
          <Routes>
            <Route path="/presenties" element={<Presenties />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
