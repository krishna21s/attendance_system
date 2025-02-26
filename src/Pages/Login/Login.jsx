import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [userType, setUserType] = useState('student');
  
  return (
    <div className='login-main d-flex flex-column flex-md-row align-items-center justify-content-center vh-100' style={{ 
      backgroundImage: "url(https://gmrit.edu.in/images/blocks/Landing.png)", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundBlendMode: 'darken', 
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }}>
      <div className='d-none d-md-block w-50 text-center text-light' style={{ padding: '20px' }}>
      
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Welcome to GMRIT</h1>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 'lighter', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Face Recognition Attendance System</h3>
      </div>
      <div className='w-100 w-md-50 d-flex justify-content-center'>
        <div className='login-box bg-light p-4 rounded shadow' style={{ maxWidth: '400px', width: '100%' }}>
            <div>
                <img src="https://image3.mouthshut.com/images/imagesp/925718446s.png" alt="" style={{ width: '130px', marginBottom: '10px' }}/>
            </div>
          <div className='d-flex justify-content-between gap-3 w-100 py-3'>
            <div 
              className={`w-100 text-center rounded p-2 text-light ${userType === 'student' ? 'bg-dark' : 'bg-secondary'}`} 
              style={{ fontSize: '1rem', cursor: 'pointer' }}
              onClick={() => setUserType('student')}
            >
              STUDENT
            </div>
            <div 
              className={`w-100 text-center rounded p-2 text-light ${userType === 'faculty' ? 'bg-dark' : 'bg-secondary'}`} 
              style={{ fontSize: '1rem', cursor: 'pointer' }}
              onClick={() => setUserType('faculty')}
            >
              FACULTY
            </div>
          </div>
          <form className='d-flex flex-column'>
            <input 
              type='text' 
              name='identifier' 
              placeholder={userType === 'student' ? 'Enter JNTU number' : 'Enter Faculty ID'} 
              className='w-100 login-inputs mb-2 p-2 rounded border' 
              style={{ fontSize: '1rem' }}
            />
            <input type='password' name='password' placeholder='Enter password' className='w-100 login-inputs mb-2 p-2 rounded border' style={{ fontSize: '1rem' }} />
            <button type='submit' className='w-100 btn btn-primary' style={{ fontSize: '1rem' }}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
