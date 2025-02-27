import './Student_Reg.css';

const Student_Reg = () => {
  return (
    <div className='register-main'>
      <div className='reg-nav'>
        <center className='animate-text'>REGISTERATIONS</center>
      </div>
      <div className='register-container'>
        <div className='register-img '>
          <img src='https://uploads-ssl.webflow.com/624ac40503a527cf47af4192/62fbc984af8f6670c9be15c0_facial-recognition.jpg' alt='Facial Recognition' />
        </div>
        <div className='register-form bg-secondary rounded-3  p-4'>
          <form className='form-column' >
            <div className='d-flex gap-2 my-2 '>
            <input type='text' className='form-control border rounded p-2 ' placeholder='Enter name' />
            <input type='text' className='form-control border rounded p-2' placeholder='Enter JNTU number' />
            </div>
           
            <input type='tel' className='form-control border rounded p-2 my-2' placeholder='Enter mobile number' />
            <div className='d-flex gap-2'>

            <select className='form-control border rounded p-2 my-2'>
              <option value=''>--Branch--</option>
              <option value='CSE'>CSE</option>
              <option value='AIML'>AIML</option>
              <option value='AIDS'>AIDS</option>
              <option value='ECE'>ECE</option>
              <option value='EEE'>EEE</option>
              <option value='MECH'>MECH</option>
              <option value='CIVIL'>CIVIL</option>
            </select>
            <select className='form-control border rounded p-2 my-2' name='Year'>
              <option value=''>--Year--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
        
            </select>
            </div>
            <div className='d-flex gap-2'>

            <select className='form-control border rounded p-2 my-2'>
              <option value=''name="Sem">--Semester--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </select>

            <select className='form-control border rounded p-2 my-2' name='Sec'>
              <option value=''>--Section--</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='C'>C</option>
              <option value='D'>D</option>
            </select>
            </div>
            <input type='password' className='form-control border rounded p-2 my-2' placeholder='Enter password' />
            <div className='file-upload text-light'>
              <p>Upload Image</p>
              <input type='file' className='form-control border rounded p-2 '/>
            </div>
            <button type='submit' className='btn btn-primary w-100 mt-3'>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student_Reg;