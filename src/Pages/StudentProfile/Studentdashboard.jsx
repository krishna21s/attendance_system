import './Studentdashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";


const Studentdashboard = () => {
  return (
    <div>
      <div className="p-3 text-light bg-secondary d-flex justify-content-between">
        <div className='fs-5'>GMRIT</div>
        <div className='fs-5'><FontAwesomeIcon icon={faBell} /></div>
      </div>
      <div className='d-flex m-3'>
        <div className="  student-profile">
        <img src="https://th.bing.com/th/id/OIP.JtOrgieD2K1Ho_2LjZnaUAHaH4?rs=1&pid=ImgDetMain" alt="" />
        </div>
        <div className='d-flex  w-100 justify-content-between'>
            <div className='mx-3'>
            <div>Abdul Yunus</div>
            <div>23341A0502</div>
            </div>
            <div>
              <div>Overall Attendance</div>
              <div className='text-center'><h5>78%</h5></div>
            </div>
            <div>
                <div>Btech-CSE</div>
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
          <div>Operating System</div>
          <div>21CSX01</div>
        </div>
        <div className='badge bg-success p-2 '>78%</div>
      </div>
      <div className='p-3 m-2 d-flex justify-content-between align-items-center student-sub-att'>
        <div>
          <div>DBMS</div>
          <div>21CSX01</div>
        </div>
        <div className='badge bg-danger p-2'> 64%</div>
      </div>

    </div>
  )
}

export default Studentdashboard
