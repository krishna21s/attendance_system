import React from 'react'
import './Admin.css'
const Admin = () => {
  return (
    <div>
      <div className='bg-dark text-light p-3'>
        <center>ADMIN</center>
      </div>
      <div className='d-flex'>
        <div className='p-3 fs-6 bg-secondary text-center admin-opt'>
            <div className='my-2 '><a href="">Student Registration</a></div>
            <div className='my-2'><a href="">Faculty Registartion</a></div>
            <div className='my-2'><a href="">Total Students</a></div>
            <div className='my-2'><a href="">Total Faculty</a></div>
        
        </div>
        <div className='w-75'>

        </div>
      </div>
    </div>
  )
}

export default Admin
