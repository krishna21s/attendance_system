import './Studentdashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Studentdashboard = () => {
  const [notifi, setnotifi] = useState(false);

  return (
    <div className='position-relative'>
      <div className="p-3 text-light bg-secondary d-flex justify-content-between">
        <div className='fs-5'>GMRIT</div>
        <div className='fs-5 position-relative notifi-box ' onClick={() => setnotifi(!notifi)}>
          <FontAwesomeIcon icon={faBell} />
          <div className='p-1 bg-light notification'></div>
        </div>
      </div>

      <div className='d-flex m-3'>
        <div className="student-profile">
          <img src="https://th.bing.com/th/id/OIP.JtOrgieD2K1Ho_2LjZnaUAHaH4?rs=1&pid=ImgDetMain" alt="Profile" />
        </div>
        <div className='d-flex w-100 justify-content-between'>
          <div className='mx-3'>
            <div>Abdul Yunus</div>
            <div>23341A0502</div>
          </div>
          <div>
            <div>Overall Attendance</div>
            <div className='text-center'><h5>78%</h5></div>
          </div>
          <div>
            <div>BTech-CSE</div>
            <div>Sem-3</div>
          </div>
        </div>
      </div>
      
      <hr />

      <div className='p-3 m-2 d-flex justify-content-between align-items-center student-sub-att'>
        <div>
          <div>Operating System</div>
          <div>21CSX01</div>
        </div>
        <div className='badge bg-warning p-2'>72%</div>
      </div>
      <div className='p-3 m-2 d-flex justify-content-between align-items-center student-sub-att'>
        <div>
          <div>Computer Networks</div> {/* Fixed duplicate subject name */}
          <div>21CSX02</div>
        </div>
        <div className='badge bg-success p-2'>78%</div>
      </div>
      <div className='p-3 m-2 d-flex justify-content-between align-items-center student-sub-att'>
        <div>
          <div>DBMS</div>
          <div>21CSX03</div>
        </div>
        <div className='badge bg-danger p-2'>64%</div>
      </div>

      {notifi && (
        <div className='position-absolute notification-container p-3'>
          <p className='text-light rounded-2 p-2 bg-danger'>
            Dear Abdul Yunus, You are having less than 65% in DBMS
          </p>
        </div>
      )}
    </div>
  );
}

export default Studentdashboard;
