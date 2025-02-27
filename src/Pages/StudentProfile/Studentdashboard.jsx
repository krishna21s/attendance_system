import './Studentdashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";


const Studentdashboard = () => {
  return (
    <div>
      <div className="p-3 text-light bg-secondary d-flex justify-content-between">
        <div>GMRIT</div>
        <div><FontAwesomeIcon icon={faBell} /></div>
      </div>
      <div className='d-flex m-3'>
        <div className="  student-profile">
        <img src="https://th.bing.com/th/id/OIP.JtOrgieD2K1Ho_2LjZnaUAHaH4?rs=1&pid=ImgDetMain" alt="" />
        </div>
        <div className='d-flex  w-100 justify-content-between'>
            <div>
            <div>Abdul Yunus</div>
            <div>23341A0502</div>
            </div>
            <div>
                <div>Btech-CSE</div>
                <div>Sem-3</div>
            </div>
          
        </div>
      </div>

    </div>
  )
}

export default Studentdashboard
